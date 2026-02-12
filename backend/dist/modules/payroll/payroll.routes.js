"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../core/auth.middleware");
const payroll_service_1 = require("./payroll.service");
const router = (0, express_1.Router)();
const service = new payroll_service_1.PayrollService();
router.post("/run", auth_middleware_1.authenticate, async (req, res) => {
    const { employeeId, periodId } = req.body;
    const payroll = await service.runPayroll(employeeId, periodId);
    res.json(payroll);
});
exports.default = router;
