import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../../core/prisma";
import { env } from "../../config/env";
import { asyncHandler } from "../../core/async-handler";
import { HttpError } from "../../core/http";

const router = Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "HR", "ACCOUNTING"])
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const payload = registerSchema.parse(req.body);

    const existing = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existing) {
      throw new HttpError(409, "Email already exists");
    }

    const hashed = await bcrypt.hash(payload.password, 10);

    const user = await prisma.user.create({
      data: { email: payload.email, passwordHash: hashed, role: payload.role },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.status(201).json(user);
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const payload = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) throw new HttpError(400, "Invalid credentials");

    const valid = await bcrypt.compare(payload.password, user.passwordHash);
    if (!valid) throw new HttpError(400, "Invalid credentials");

    const token = jwt.sign({ userId: user.id, role: user.role }, env.JWT_SECRET, {
      expiresIn: "8h"
    });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  })
);

export default router;
