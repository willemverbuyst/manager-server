import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Utils } from './Utils';
import { LoginHandler } from './LoginHandler';
import { Authorizer } from '../Authorization/Authorizer';
import { UserHandler } from './UsersHandler';
import { Monitor } from '../Shared/ObjectCounter';

export class Server {
  private authorizer: Authorizer = new Authorizer();

  public createServer() {
    createServer(async (req: IncomingMessage, res: ServerResponse) => {
      console.log('got request from: ' + req.method);
      console.log('got request from: ' + req.url);
      this.addCorsHeader(res);
      const basePath = Utils.getUrlBasePath(req.url);

      switch (basePath) {
        case 'systemInfo':
          res.write(Monitor.printInstances());
          break;
        case 'login':
          await new LoginHandler(req, res, this.authorizer).handleRequest();
          break;

        case 'users':
          await new UserHandler(req, res, this.authorizer).handleRequest();
          break;

        default:
          break;
      }
      res.end();
    }).listen(8080);
    console.log('Server started');
  }

  private addCorsHeader(res: ServerResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
  }
}
