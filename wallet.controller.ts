// src/controllers/wallet.controller.ts — Brand Ship CI

import { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { ApiResponse } from "../types";
import { TransactionType, WithdrawalStatus } from "@prisma/client";

const MIN_WITHDRAWAL = 1000; // FCFA minimum

// Demande de retrait
export async function requestWithdrawal(req: Request, res: Response<ApiResponse>): Promise<void> {
  const user_id = (req as any).user.id;
  const { amount, mobile_money, operator } = req.body;

  try {
    if (amount < MIN_WITHDRAWAL) {
      res.status(400).json({
        success: false,
        message: `Le montant minimum de retrait est ${MIN_WITHDRAWAL.toLocaleString()} FCFA.`,
      });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: user_id } });

    if (!user || user.wallet_balance < amount) {
      res.status(400).json({
        success: false,
        message: "Solde insuffisant.",
        data: { balance: user?.wallet_balance ?? 0 },
      });
      return;
    }

    // Déduire du portefeuille + créer la demande (transaction atomique)
    const [withdrawal] = await prisma.$transaction([
      prisma.withdrawal.create({
        data: { user_id, amount, mobile_money, operator, status: WithdrawalStatus.PENDING },
      }),
      prisma.user.update({
        where: { id: user_id },
        data: { wallet_balance: { decrement: amount } },
      }),
      prisma.transaction.create({
        data: {
          user_id,
          amount: -amount,
          type: TransactionType.WITHDRAWAL,
          description: `Retrait ${operator} — ${mobile_money}`,
          metadata: { operator, mobile_money },
        },
      }),
    ]);

    res.status(201).json({
      success: true,
      message: "Demande de retrait soumise. Traitement sous 24-48h.",
      data: withdrawal,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Historique des transactions
export async function getTransactionHistory(req: Request, res: Response<ApiResponse>): Promise<void> {
  const user_id = (req as any).user.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  try {
    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where: { user_id },
        orderBy: { created_at: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          order: {
            include: {
              store_product: { include: { product: { select: { title: true } } } },
            },
          },
        },
      }),
      prisma.transaction.count({ where: { user_id } }),
    ]);

    res.json({
      success: true,
      data: transactions,
      meta: { page, limit, total, total_pages: Math.ceil(total / limit) },
    } as any);
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}

// Solde du portefeuille
export async function getWalletBalance(req: Request, res: Response<ApiResponse>): Promise<void> {
  const user_id = (req as any).user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      select: { wallet_balance: true },
    });

    const pending_withdrawal = await prisma.withdrawal.aggregate({
      where: { user_id, status: WithdrawalStatus.PENDING },
      _sum: { amount: true },
    });

    const total_earned = await prisma.transaction.aggregate({
      where: {
        user_id,
        type: { in: [TransactionType.SALE_EARNING, TransactionType.REFERRAL_BONUS, TransactionType.SUPPLIER_EARNING] },
        amount: { gt: 0 },
      },
      _sum: { amount: true },
    });

    res.json({
      success: true,
      data: {
        balance: user?.wallet_balance ?? 0,
        pending_withdrawal: pending_withdrawal._sum.amount ?? 0,
        total_earned: total_earned._sum.amount ?? 0,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
}
