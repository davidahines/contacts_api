import mongoose = require('mongoose');
import IContact from './interfaces/IContact';
import contactSchema from './schemas/contactSchema';

export default mongoose.model<IContact>('Contact', contactSchema, "contacts");
