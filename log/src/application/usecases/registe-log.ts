import { Log } from "../../domain/log";
import { LogsRepository } from "../repositories/logs-repository";

interface RegisteLogRequest {
  user: {
    username: string;
    message: string;
  }
  purchasesEnrolledByPurchaseId?: string;
}

export class RegisteUserToLog {
  constructor(
    private logsRepository: LogsRepository,
  ) {}

  async execute(request: RegisteLogRequest): Promise<void> {
    let log = await this.logsRepository.findByUserName(request.user.username);

    if (!log) {
      log = new Log({
        username: request.user.username,
        message: request.user.message,
      })

      await this.logsRepository.create(log)
    }

    // const registe = new Record({
    //   logId: log.id,
    //   createdAt: new Date(),
    //   purchasesEnrolledByPurchaseId: request.purchasesEnrolledByPurchaseId,
    // })

    // await this.logsRepository.create(registe);
  }
}