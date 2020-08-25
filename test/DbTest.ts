import { UserCredentialsDBAccess } from '../src/Authorization/UserCredentialsDBAccess';

class DbTest {
  public dbAcess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
}

new DbTest().dbAcess.putUserCredential({
  username: 'user1',
  password: '1234',
  accessRights: [1, 2, 3],
});
