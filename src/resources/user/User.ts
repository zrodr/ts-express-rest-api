import { Document } from 'mongoose';
import Resource from '../../util/interfaces/Resource';

export default interface User extends Document, Resource {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
}