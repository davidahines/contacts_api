import contactModel from '../models/contactModel';
import IContact from '../models/interfaces/IContact';
import express, { Request, Response } from "express";

import mongoose = require('mongoose');
export default class ContactController {


  readAContact(req: Request, res: Response) {
    let idObj = new mongoose.Types.ObjectId(req.params.contactId);
    contactModel.findOne({ _id: idObj })
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
    contactModel.create(req.body).then((createdContact: IContact) =>{
      console.log("Created Contact:" +createdContact);
    });
  }
}