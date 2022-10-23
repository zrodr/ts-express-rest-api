import User from './User';
import UserModel from './user-model';

export default class UserService {
  private userModel;

  constructor() {
    this.userModel = UserModel;
  }

  /* TODO: add proper error handling if calls to MongoDB happen to error */

  async create(
    username: string,
    email: string,
    password: string,
    phoneNumber: string): Promise<User> {
    
    try {
      const newUser = await this.userModel.create({
        username,
        email,
        password,
        phoneNumber
      });

      return newUser;
    }
    catch (e) {
      throw new Error(`Couldn't create user`);
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().limit(10);
      return users;
    }
    catch (e) {
      throw new Error(`Couldn't get all users`);
    }
  }

  /* TODO: getOne, update, delete */

  /* async getOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.find({ _id: id });
      return user;
    }
    catch (e) {
      throw new Error(`Couldn't get all users`);
    }
  }

  async update(
    id: string,
    username: string,
    email: string,
    password: string,
    phoneNumber: string): Promise<> {
    
  }

  async delete(id: string): Promise<> {

  } */
}