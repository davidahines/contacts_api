import { Document} from 'mongoose'
import IAddress from './IAddress';

export default interface IContact extends Document {
  name: string,
  address: IAddress
  phoneNumber: string
  email: string
}