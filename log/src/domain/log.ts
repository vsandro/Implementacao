import crypto from 'node:crypto';

interface LogProps {
  username: string;
  message: string;
}

export class Log {
  private _id: string;
  private props: LogProps;

  get id(): string {
    return this._id;
  }

  get username(): string {
    return this.props.username;
  }

  get message(): string {
    return this.props.message;
  }

  constructor(props: LogProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}