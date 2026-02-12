"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../../core/prisma");
const auth_middleware_1 = require("../../core/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticate, async (req, res) => {
    const employee = await prisma_1.prisma.employee.create({ data: req.body });
    res.json(employee);
});
router.get("/", auth_middleware_1.authenticate, async (req, res) => {
    const employees = await prisma_1.prisma.employee.findMany();
    res.json(employees);
});
exports.default = router;
