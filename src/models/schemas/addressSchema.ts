import { Schema } from 'mongoose';
import IAddress from '../interfaces/IAddress';

export default new Schema<IAddress>({
    streetName: {type: String, required: true},
    houseNumber: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true}
  });