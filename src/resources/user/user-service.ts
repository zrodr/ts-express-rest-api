import RESTEndpointError from '../../util/error/RESTEndpointError';
import Service from 'util/interfaces/Service';
import User from './User';
import UserModel from './user-model';
import ResourceNotFoundError from '../../util/error/ResourceNotFoundError';

export default class UserService implements Service {
  private userModel;

  constructor() {
    this.userModel = UserModel;
  }

  /* TODO: add fallback error handling if calls to MongoDB happen to error */
  /* TODO: Create classes for resourcenotfound(404) and unprocessable entity(422) errors */

  async create(resource: User): Promise<User> {
    try {
      const newUser = await this.userModel.create(resource);
      return newUser;
    } catch (e: any) {
      throw new RESTEndpointError(
        `Error occurred while creating user in database: ${e.message}`,
        500
      );
    }
  }

  async getAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find().limit(10);
      return users;
    } catch (e: any) {
      throw new RESTEndpointError(
        `Error occurred while getting all users: ${e.message}`,
        500
      );
    }
  }

  async get(id: string): Promise<User> {
    try {
      const result = await this.userModel.findOne({ _id: id });

      if (!result) throw new ResourceNotFoundError('user', id);

      return result;
    } catch (e: any) {
      if (e instanceof RESTEndpointError) throw e;

      throw new RESTEndpointError(
        `Error occurred while getting user from database: ${e.message}.`,
        500
      );
    }
  }

  async update(id: string, resource: User): Promise<User> {
    try {
      const result = await this.userModel.findOneAndUpdate(
        { _id: id },
        resource,
        { returnOriginal: false }
      );

      if (!result) throw new ResourceNotFoundError('user', id);

      return result;
    } catch (e: any) {
      if (e instanceof RESTEndpointError) throw e;

      throw new RESTEndpointError(
        `Error occurred while updating user with id ${id}: ${e.message}`,
        500
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.userModel.findOneAndDelete({ _id: id });

      if (!result) throw new ResourceNotFoundError('user', id);
    } catch (e: any) {
      if (e instanceof RESTEndpointError) throw e;

      throw new RESTEndpointError(
        `Error occurred while deleting user with id ${id}: ${e.message}`,
        500
      );
    }
  }
}
