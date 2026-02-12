"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().default("4000"),
    DATABASE_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    CORS_ORIGIN: zod_1.z.string(),
    NODE_ENV: zod_1.z.string()
});
exports.env = envSchema.parse(process.env);
