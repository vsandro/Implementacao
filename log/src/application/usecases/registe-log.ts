import { Record } from "../../domain/log";
import { RecordsRepository } from "../repositories/records-repository";

interface RegisteRecordRequest {
  user: {
    username: string;
    message: string;
  }
  purchasesEnrolledByPurchaseId?: string;
}

export class RegisteUserToLog {
  constructor(
    private logsRepository: RecordsRepository,
  ) {}

  async execute(request: RegisteRecordRequest): Promise<void> {
    let log = await this.logsRepository.findByUserName(request.user.username);

    if (!log) {
      log = new Record({
        username: request.user.username,
        message: request.user.message,
      })

      await this.logsRepository.create(log)
    }

  }
}