import crypto from 'node:crypto';

interface RecordProps {
  username: string;
  message: string;
}

export class Record {
  private _id: string;
  private props: RecordProps;

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this.props.username;
  }

  get message(): string {
    return this.props.message;
  }

  constructor(props: RecordProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}