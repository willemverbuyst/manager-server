import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Utils } from './Utils';

export class Server {
  public createServer() {
    createServer((req: IncomingMessage, res: ServerResponse) => {
      console.log('got request from: ' + req.method);
      console.log('got request from: ' + req.url);
      const basePath = Utils.getUrlBasePath(req.url);
      res.end();
    }).listen(8080);
  }
}
