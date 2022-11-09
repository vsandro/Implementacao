import { Record } from "../../domain/log";

export interface RecordsRepository {
  findByUserName(username: String): Promise<Record | null>;
  create(record: Record): Promise<void>;
}