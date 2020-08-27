import { ServerResponse, IncomingMessage } from 'http';
import { HTTP_CODES } from '../Shared/Model';

export abstract class BaseRequestHandler {
  protected req: IncomingMessage;
  protected res: ServerResponse;

  constructor(req: IncomingMessage, res: ServerResponse) {
    this.req = req;
    this.res = res;
  }

  abstract async handleRequest(): Promise<void>;

  protected async handleNotFound() {
    this.res.statusCode = HTTP_CODES.NOT_FOUND;
    this.res.write('Not found');
  }

  protected async getRequestBody(): Promise<any> {
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

  protected respondJsonObject(code: HTTP_CODES, object: any) {
    this.res.writeHead(HTTP_CODES.OK, {
      'Content-Type': 'application/json',
    });
    this.res.write(JSON.stringify(object));
  }

  protected respondBadRequest(message: string) {
    this.res.statusCode = HTTP_CODES.BAD_REQUEST;
    this.res.write(message);
  }
}