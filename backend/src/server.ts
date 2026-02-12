import "dotenv/config";
import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./core/prisma";

const server = app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

async function shutdown(signal: string) {
  console.log(`${signal} received, closing server...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});
