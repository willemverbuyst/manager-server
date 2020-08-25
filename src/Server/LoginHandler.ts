import { IncomingMessage, ServerResponse } from 'http';

export class LoginHandler {
  private req: IncomingMessage;
  private res: ServerResponse;

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req;
    this.res = res;
  }

  public handleRequest(): void {
    console.log('break');
  }
}
