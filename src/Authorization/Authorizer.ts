import { TokenGenerator, Account, SessionToken } from '../Server/Model';
import { UserCredentialsDBAccess } from './UserCredentialsDBAccess';
import { SessionTokenDBAccess } from './SessionTokenDbAccess';

export class Authorizer implements TokenGenerator {
  private userCredDBAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();

  private sessionTokenDBAccess: SessionTokenDBAccess = new SessionTokenDBAccess();

  async generateToken(account: Account): Promise<SessionToken | undefined> {
    const resultAccount = await this.userCredDBAccess.getUserCredential(
      account.username,
      account.password
    );

    if (resultAccount) {
      const token: SessionToken = {
        accessRights: resultAccount.accessRights,
        expirationTime: this.generateExpirationTime(),
        username: resultAccount.username,
        valid: true,
        tokenId: this.genrateRandomTokenId(),
      };
      await this.sessionTokenDBAccess.storeSessionToken(token);
      return token;
    } else {
      return undefined;
    }
  }

  private generateExpirationTime() {
    return new Date(Date.now() + 60 * 60 * 1000);
  }

  private genrateRandomTokenId() {
    return Math.random().toString(36).slice(2);
  }
}
