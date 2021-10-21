import { Schema, model, connect } from 'mongoose';
import IContact from './interfaces/IContact';
import IAddress from './interfaces/IAddress';

const addressSchema = new Schema<IAddress>({
  streetName: {type: String, required: true},
  houseNumber: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true}
});

const contactSchema = new Schema<IContact>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: addressSchema
});
export default model<IContact>('Contact', contactSchema);
