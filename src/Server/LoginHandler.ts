import { IncomingMessage, ServerResponse } from 'http';

export class LoginHandler {
  private req: IncomingMessage;
  private res: ServerResponse;

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req;
    this.res = res;
  }

  public async handleRequest(): Promise<void> {
    console.log('before getting the body');
    const body = await this.getRequestBody();
    console.log('request username: ', body.username);
    console.log('request password: ', body.password);
  }

  private async getRequestBody(): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = '';
      this.req.on('data', (data: string) => {
        body += data;
      });
      this.req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
      this.req.on('error', (error: any) => {
        reject(error);
      });
    });
  }
}
