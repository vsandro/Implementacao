import { RecordsRepository } from "../../../../application/repositories/records-repository";
import { Record } from "../../../../domain/record";
import { prisma } from "../prisma";

export class PrismaLogsRepository implements RecordsRepository {
  create(record: Record): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async findByUserName(username: string): Promise<Record | null> {
    const Log = await prisma.records.findFirst({
      where: {
        username,
      }
    })

    if (!Log) {
      return null;
    }

    return new Record({
      username: Log.username,
      message: Log.message,
    }, Log.id);
  }

}