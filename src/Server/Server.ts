import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Utils } from './Utils';
import { LoginHandler } from './LoginHandler';

export class Server {
  public createServer() {
    createServer((req: IncomingMessage, res: ServerResponse) => {
      console.log('got request from: ' + req.method);
      console.log('got request from: ' + req.url);
      const basePath = Utils.getUrlBasePath(req.url);

      switch (basePath) {
        case 'login':
          new LoginHandler(req, res).handleRequest();
          break;

        default:
          break;
      }
      res.end();
    }).listen(8080);
  }
}
