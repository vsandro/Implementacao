import { LogsRepository } from "../../../../application/repositories/logs-repository";
import { Record } from "../../../../domain/log";
import { prisma } from "../prisma";

export class PrismaLogsRepository implements LogsRepository {
  async findByEmail(username: string): Promise<Record | null> {
    const Log = await prisma.Log.findUnique({
      where: {
        username,
      }
    })

    if (!Log) {
      return null;
    }

    return new Log({
      username: Log.username,
      message: Log.message,
    }, Log.id);
  }

}