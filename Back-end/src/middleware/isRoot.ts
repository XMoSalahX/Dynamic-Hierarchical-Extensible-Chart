import { NextFunction, Request, Response } from "express";
import { NodeModel } from "../models/chartModel";
import { Error } from "../utlities/error_response";

const errorMsg = new Error();

// to check if element is root or not
export const isRoot = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.body;
    const result = await NodeModel.find({ _id });

    if (result[0].Parent_id === undefined) {
      req.body.isRoot = "root";
    }

    next();
  } catch (err) {
    res.status(500).json(errorMsg.error_500);
  }
};
