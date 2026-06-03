// src/controllers/auth.controller.ts — Brand Ship CI

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";
import { ApiResponse } from "../types";
import { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "brandship_secret_change_in_prod";
const JWT_EXPIRES = "7d";

export async function register(req: Request, res: Response<ApiResponse>): Promise<void> {
  const { name, phone, email, password, role = "INFLUENCER", referral_code } = req.body;

  try {
    // Vérifier unicité du téléphone
    const existingPhone = await prisma.user.findUnique({ where: { phone } });
    if (existingPhone) {
      res.status(400).json({ success: false, message: "Ce numéro de téléphone est déjà utilisé." });
      return;
    }

    // Résoudre le parrain via le code de parrainage
    let referrer_id: string | null = null;
    if (referral_code) {
      const referrer = await prisma.user.findUnique({ where: { referral_code } });
      if (referrer) {
        referrer_id = referrer.id;
      }
    }

    const password_hash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email,
        password_hash,
        role: role as Role,
        referrer_id,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        role: true,
        referral_code: true,
        wallet_balance: true,
        created_at: true,
      },
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    res.status(201).json({
      success: true,
      message: "Compte créé avec succès.",
      data: { user, token },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function login(req: Request, res: Response<ApiResponse>): Promise<void> {
  const { phone, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { phone } });

    if (!user || !user.is_active) {
      res.status(401).json({ success: false, message: "Numéro ou mot de passe incorrect." });
      return;
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      res.status(401).json({ success: false, message: "Numéro ou mot de passe incorrect." });
      return;
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          phone: user.phone,
          role: user.role,
          wallet_balance: user.wallet_balance,
          referral_code: user.referral_code,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function getProfile(req: Request, res: Response<ApiResponse>): Promise<void> {
  const user_id = (req as any).user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        role: true,
        avatar_url: true,
        wallet_balance: true,
        referral_code: true,
        referrer: { select: { name: true, phone: true } },
        _count: { select: { referrals: true, stores: true } },
        created_at: true,
      },
    });

    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
