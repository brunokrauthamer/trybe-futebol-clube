// import { compareSync } from 'bcryptjs';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import Users from '../database/models/UserModel';
import IUser from '../interfaces/IUser';

export default class LoginService {
  static async getByEmail(email: string, password:string) {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return { type: 401, message: 'Incorrect email or password', user: null };
    }
    const hash = user.dataValues.password;
    if (!bcrypt.compareSync(password, hash)) {
      return { type: 401, message: 'Incorrect email or password', user: null };
    }
    const { token, payload } = await this.generateToken(user.dataValues);
    return { type: null, message: token, user: payload };
  }

  static async generateToken(user: IUser) {
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };
    const token = jwt.sign(payload, 'jwt_secret');
    return { token, payload };
  }

  static validateToken(token: string) {
    try {
      const data = jwt.verify(token, 'jwt_secret') as IUser;
      return { valid: true, data };
    } catch {
      return { valid: false };
    }
  }
}
