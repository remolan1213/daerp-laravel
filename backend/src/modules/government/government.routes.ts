import { Router } from "express";
import { z } from "zod";
import { authenticate, requireRoles } from "../../core/auth.middleware";
import { asyncHandler } from "../../core/async-handler";
import { prisma } from "../../core/prisma";

const router = Router();

const bracketSchema = z.object({
  minMonthlyCompensation: z.coerce.number().min(0),
  maxMonthlyCompensation: z.coerce.number().nullable().optional(),
  baseTax: z.coerce.number().min(0),
  marginalRate: z.coerce.number().min(0),
  orderNo: z.coerce.number().int().positive()
});

const governmentTableSchema = z.object({
  name: z.string().min(2),
  effectiveFrom: z.coerce.date(),
  effectiveTo: z.coerce.date().optional().nullable(),
  sssEmployeeRate: z.coerce.number().min(0),
  sssEmployerRate: z.coerce.number().min(0),
  sssMaxContributionBase: z.coerce.number().positive(),
  philhealthRate: z.coerce.number().min(0),
  philhealthMinBase: z.coerce.number().min(0),
  philhealthMaxBase: z.coerce.number().positive(),
  pagibigEmployeeRate: z.coerce.number().min(0),
  pagibigEmployerRate: z.coerce.number().min(0),
  pagibigMaxContribution: z.coerce.number().positive(),
  taxBrackets: z.array(bracketSchema).min(1)
});

router.get(
  "/tables",
  authenticate,
  asyncHandler(async (_req, res) => {
    const tables = await prisma.governmentRateTable.findMany({
      include: {
        taxBrackets: {
          orderBy: { orderNo: "asc" }
        }
      },
      orderBy: { effectiveFrom: "desc" }
    });
    res.json(tables);
  })
);

router.post(
  "/tables",
  authenticate,
  requireRoles("ADMIN", "ACCOUNTING"),
  asyncHandler(async (req, res) => {
    const payload = governmentTableSchema.parse(req.body);
    const created = await prisma.governmentRateTable.create({
      data: {
        name: payload.name,
        effectiveFrom: payload.effectiveFrom,
        effectiveTo: payload.effectiveTo,
        sssEmployeeRate: payload.sssEmployeeRate,
        sssEmployerRate: payload.sssEmployerRate,
        sssMaxContributionBase: payload.sssMaxContributionBase,
        philhealthRate: payload.philhealthRate,
        philhealthMinBase: payload.philhealthMinBase,
        philhealthMaxBase: payload.philhealthMaxBase,
        pagibigEmployeeRate: payload.pagibigEmployeeRate,
        pagibigEmployerRate: payload.pagibigEmployerRate,
        pagibigMaxContribution: payload.pagibigMaxContribution,
        taxBrackets: {
          create: payload.taxBrackets
        }
      },
      include: {
        taxBrackets: {
          orderBy: { orderNo: "asc" }
        }
      }
    });

    res.status(201).json(created);
  })
);

router.put(
  "/tables/:id",
  authenticate,
  requireRoles("ADMIN", "ACCOUNTING"),
  asyncHandler(async (req, res) => {
    const id = z.string().uuid().parse(req.params.id);
    const payload = governmentTableSchema.parse(req.body);
    const updated = await prisma.$transaction(async (tx) => {
      await tx.withholdingTaxBracket.deleteMany({
        where: { governmentRateTableId: id }
      });

      return tx.governmentRateTable.update({
        where: { id },
        data: {
          name: payload.name,
          effectiveFrom: payload.effectiveFrom,
          effectiveTo: payload.effectiveTo,
          sssEmployeeRate: payload.sssEmployeeRate,
          sssEmployerRate: payload.sssEmployerRate,
          sssMaxContributionBase: payload.sssMaxContributionBase,
          philhealthRate: payload.philhealthRate,
          philhealthMinBase: payload.philhealthMinBase,
          philhealthMaxBase: payload.philhealthMaxBase,
          pagibigEmployeeRate: payload.pagibigEmployeeRate,
          pagibigEmployerRate: payload.pagibigEmployerRate,
          pagibigMaxContribution: payload.pagibigMaxContribution,
          taxBrackets: {
            create: payload.taxBrackets
          }
        },
        include: {
          taxBrackets: { orderBy: { orderNo: "asc" } }
        }
      });
    });

    res.json(updated);
  })
);

export default router;
