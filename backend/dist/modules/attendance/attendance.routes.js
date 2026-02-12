"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../../core/prisma");
const auth_middleware_1 = require("../../core/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticate, async (req, res) => {
    const record = await prisma_1.prisma.attendanceRecord.create({ data: req.body });
    res.json(record);
});
router.get("/:employeeId", auth_middleware_1.authenticate, async (req, res) => {
    const employeeId = String(req.params.employeeId);
    const records = await prisma_1.prisma.attendanceRecord.findMany({
        where: { employeeId: employeeId }
    });
    res.json(records);
});
exports.default = router;
