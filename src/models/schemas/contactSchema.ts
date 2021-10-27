import { Schema} from 'mongoose';
import IContact from '../interfaces/IContact';
import addressSchema from './addressSchema';

export default new Schema<IContact>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: addressSchema
  });