import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Utils } from './Utils';
import { LoginHandler } from './LoginHandler';
import { Authorizer } from '../Authorization/Authorizer';
import { UserHandler } from './UsersHandler';
import { Monitor } from '../Shared/ObjectCounter';
import { User } from '../Shared/Model';

export class Server {
  private authorizer: Authorizer = new Authorizer();
  private loginHandler: LoginHandler = new LoginHandler(this.authorizer);
  private usersHandler: UserHandler = new UserHandler(this.authorizer);

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
          this.loginHandler.setRequest(req);
          this.loginHandler.setResponse(res);
          await this.loginHandler.handleRequest();
          break;

        case 'users':
          this.usersHandler.setRequest(req);
          this.usersHandler.setResponse(res);
          await this.usersHandler.handleRequest();
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
