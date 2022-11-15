import { Record } from "../../domain/record";

export interface RecordsRepository {
  findByUserName(username: String): Promise<Record | null>;
  create(record: Record): Promise<void>; 
}
