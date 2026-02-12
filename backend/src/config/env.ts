import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters"),
  CORS_ORIGIN: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development")
});

const parsed = envSchema.parse(process.env);

export const env = {
  ...parsed,
  CORS_ORIGIN_LIST: parsed.CORS_ORIGIN.split(",").map((value) => value.trim()).filter(Boolean)
};
