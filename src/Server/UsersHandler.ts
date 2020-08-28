import { IncomingMessage, ServerResponse } from 'http';

import { UsersDBAccess } from '../User/UsersDBAccess';
import { HTTP_METHODS, HTTP_CODES, AccessRight, User } from '../Shared/Model';
import { Utils } from './Utils';
import { BaseRequestHandler } from './BaseRequestHandler';
import { Tokenvalidator } from './Model';

export class UserHandler extends BaseRequestHandler {
  private usersDBAccess: UsersDBAccess = new UsersDBAccess();
  private tokenValidator: Tokenvalidator;

  constructor(
    req: IncomingMessage,
    res: ServerResponse,
    tokenValidator: Tokenvalidator
  ) {
    super(req, res);
    this.tokenValidator = tokenValidator;
  }

  async handleRequest(): Promise<void> {
    switch (this.req.method) {
      case HTTP_METHODS.GET:
        await this.handleGet();
        break;
      case HTTP_METHODS.PUT:
        await this.handlePut();
        break;

      default:
        this.handleNotFound();
        break;
    }
  }

  private async handlePut() {
    const operationAuthorized = await this.operationAuthorized(
      AccessRight.CREATE
    );
    if (operationAuthorized) {
      try {
        const user: User = await this.getRequestBody();
        await this.usersDBAccess.putUser(user);

        this.respondText(HTTP_CODES.CREATED, `User ${user.name} created.`);
      } catch (error) {
        this.respondBadRequest(error.message);
      }
    } else {
      this.respondUnauthorized('missing or invalid authentication');
    }
  }

  private async handleGet() {
    const operationAuthorized = await this.operationAuthorized(
      AccessRight.READ
    );

    if (operationAuthorized) {
      const parsedUrl = Utils.getUrlParameters(this.req.url);
      if (parsedUrl) {
        const userId = parsedUrl.query.id;

        if (userId) {
          const user = await this.usersDBAccess.getUserById(userId as string);
          if (user) {
            this.respondJsonObject(HTTP_CODES.OK, user);
          } else {
            this.handleNotFound();
          }
        } else {
          this.respondBadRequest('UserId not present in request');
        }
      }
    } else {
      this.respondUnauthorized('missing or invalid authentication');
    }
  }

  private async operationAuthorized(operation: AccessRight): Promise<boolean> {
    const tokenId = this.req.headers.authorization;
    if (tokenId) {
      const tokenRights = await this.tokenValidator.validateToken(tokenId);
      if (tokenRights.accessRights.includes(operation)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
