import { Record } from "../../domain/log";
import { RecordsRepository } from "../repositories/records-repository";

interface RegisteRecordRequest {
  user: {
    username: string;
    message: string;
  }
  purchasesEnrolledByPurchaseId?: string;
}

export class RegisteUserTorecord {
  constructor(
    private recordsRepository: RecordsRepository,
  ) {}

  async execute(request: RegisteRecordRequest): Promise<void> {
    let record = await this.recordsRepository.findByUserName(request.user.username);

    if (!record) {
      record = new Record({
        username: request.user.username,
        message: request.user.message,
      })

      await this.recordsRepository.create(record)
    }

  }
}