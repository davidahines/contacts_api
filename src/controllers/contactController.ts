import contactModel from '../models/contactModel';
import IContact from '../models/interfaces/IContact';
import express, { Request, Response } from "express";

export default class ContactController {
  readAContact(req: Request, res: Response) {
    contactModel.findById(req.params.contactId)
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
}