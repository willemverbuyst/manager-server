import { UserCredentialsDBAccess } from '../src/Authorization/UserCredentialsDBAccess';
import { UsersDBAccess } from '../src/User/UsersDBAccess';

class DbTest {
  public dbAcess: UserCredentialsDBAccess = new UserCredentialsDBAccess();

  public userDBAccess: UsersDBAccess = new UsersDBAccess();
}

// new DbTest().dbAcess.putUserCredential({
//   username: 'user1',
//   password: '1234',
//   accessRights: [1, 2, 3],
// });

new DbTest().userDBAccess.putUser({
  id: 'adfaferwrq24576',
  name: 'John Doe',
  age: 30,
  email: 'some@email.com',
  workingPosition: 3,
});
