import { Record } from "../../domain/record";
import { RecordsRepository } from "../repositories/records-repository";

interface RecordRequest {
  user: {
    username: string;
    message: string;
  }
}

export class RegisteUserTorecord {
  constructor(
    private recordsRepository: RecordsRepository,
  ) {}

  async execute(request: RecordRequest): Promise<void> {
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