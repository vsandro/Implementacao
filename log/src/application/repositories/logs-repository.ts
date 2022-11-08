import { Log } from "../../domain/log";

export interface LogsRepository {
  findByUserName(username: String): Promise<Log | null>;
  create(log: Log): Promise<void>;
}