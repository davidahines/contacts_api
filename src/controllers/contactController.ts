import contactModel from '../models/contactModel';
import IContact from '../models/interfaces/IContact';
import { Request, Response } from "express";
import Logger from '../lib/logger';
import mongoose = require('mongoose');

// eslint-disable no-floating-promises

export default class ContactController {
  readAContact(req: Request, res: Response) {
    const idObj = new mongoose.Types.ObjectId(req.params.contactId);
    // eslint-disable-next-line no-use-before-define
    void contactModel.findOne({ _id: idObj })
      .then(
        (data: any) => {
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
    void contactModel.create(req.body) // I might not want void here.
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