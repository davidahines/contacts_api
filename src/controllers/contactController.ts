import contactModel from '../models/contactModel';
import IContact from '../models/interfaces/IContact';
import { Request, Response } from "express";
import Logger from '../lib/logger';
import mongoose = require('mongoose');
import mongodb from 'mongodb';

// eslint-disable no-floating-promises

export default class ContactController {
  readAContact(req: Request, res: Response) {
    const idObj : mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.contactId);
    // eslint-disable-next-line no-use-before-define
    void contactModel.findOne({ _id: idObj })
      .then(
        (data: IContact) => {
          if (data) {
            res.status(200).json(data)
          } else {
            res.status(404).send()
          }
        }
      )
  }

  addAContact(req: Request, res: Response) {
    // eslint-disable-next-line no-use-before-define
    // @ts-ignore
    void contactModel.create(req.body)
      .then(
        // @ts-ignore
        (createdContact: IContact) => {
          Logger.debug(`contactController: created contact: ${JSON.stringify(createdContact)}`);
          if (createdContact) {
            res.status(200).json(createdContact)
          } else {
            res.status(404).send()
          }
      });
  }

  updateAContact(req: Request, res: Response) {

    const idObj :mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.contactId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    void contactModel.findOneAndUpdate({ _id: idObj}, req.body, {new: true} )
      .then(
        (data: IContact) => {
          if (data) {
            res.status(200).json(data);
          } else {
            res.status(404).send();
          }
        }
      )
  }

  deleteAContact(req: Request, res: Response) {
    const idObj :mongoose.Types.ObjectId = new mongoose.Types.ObjectId(req.params.contactId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    void contactModel.deleteOne({ _id: idObj})
      .then(
        (deleteResult: mongodb.DeleteResult) => {
          if (deleteResult) {
            res.status(200).json(deleteResult);
          } else {
            res.status(404).send();
          }
        }
      )
  }

  listAllContacts(req: Request, res: Response) {
    // eslint-disable-next-line no-use-before-define
    void contactModel.find({})
      .then(
        (data: any) => {
          if (data) {
            res.status(200).json(data)
          } else {
            res.status(404).send()
          }
        }
      );
  }
}