// import { compareSync } from 'bcryptjs';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import Users from '../database/models/UserModel';
import IUser from '../interfaces/IUser';

export default class LoginService {
  static async getByEmail(email: string, password:string) {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      console.log('invalid user');
      return { type: 401, message: 'Incorrect email or password', user: null };
    }
    const hash = user.dataValues.password;
    if (!bcrypt.compareSync(password, hash)) {
      console.log('invalid password');
      return { type: 401, message: 'Incorrect email or password', user: null };
    }
    const { token, payload } = await this.generateToken(user.dataValues);
    return { type: null, message: token, user: payload };
  }

  private static async generateToken(user: IUser) {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };
    const token = jwt.sign(payload, 'jwt_secret');
    console.log(token);
    return { token, payload };
  }
}
