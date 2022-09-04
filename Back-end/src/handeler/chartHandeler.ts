import { Application, NextFunction, Request, Response } from "express";
import { NodeModel } from "../models/chartModel";
import { v4 as uuidv4 } from "uuid";
import { Error } from "../utlities/error_response";
import { isRoot } from "../middleware/isRoot";

const erorrMsg = new Error();

// Get chart data for build ui
const getChartData = async (req: Request, res: Response) => {
  try {
    let resRoot = await NodeModel.find({ Parent_id: { $exists: false } });
    let resChild = await NodeModel.find({ Parent_id: { $exists: true } });

    // For build Our Array of Nodes
    function embededArr(parent: any, child: any) {
      for (let i = 0; i < child.length; i++) {
        if (parent._id == child[i].Parent_id) {
          parent.child.push(child[i]);
          let checkLen = child.filter((doc: any) => {
            return child[i]._id == doc.Parent_id;
          });
          if (checkLen.length > 0) {
            embededArr(child[i], child);
          }
        }
      }
    }
    embededArr(resRoot[0], resChild);

    res.status(200).json(resRoot.length === 0 ? [null] : resRoot);
  } catch (err) {
    res.status(500).json(erorrMsg.error_500);
  }
};

// To insert Node
const insertNode = async (req: Request, res: Response) => {
  const { title, shape, txColor, bgColor, child, Parent_id } = req.body;
  try {
    const result = new NodeModel({
      _id: uuidv4(),
      title,
      shape,
      txColor,
      bgColor,
      child,
      Parent_id,
    });

    result.save().then((re) => {
      res.status(200).json(re);
    });
  } catch (err) {
    res.status(500).json(erorrMsg.error_500);
  }
};

// To Update Node
const nodeUpdate = async (req: Request, res: Response) => {
  try {
    const { _id, title, shape, txColor, bgColor, Parent_id } = req.body;

    const result = await NodeModel.updateOne(
      { _id: _id },
      { $set: { title, shape, txColor, bgColor, Parent_id } }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(erorrMsg.error_500);
  }
};

// Delete Node Function
const deleteNode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id, title, isRoot } = req.body;

    if (isRoot == "root") {
      await NodeModel.deleteMany({});
      res.status(200).json([null]);
    } else {
      const result = await NodeModel.deleteOne({ _id });
      if (title) {
        next();
      } else {
        res.status(200).json(result);
      }
    }
  } catch (err) {
    res.status(500).json(erorrMsg.error_500);
  }
};

// Move Nodes From Parent to anther one
const moveNodes = async (req: Request, res: Response) => {
  const { _id, Parent_id } = req.body;
  try {
    await NodeModel.updateOne({ _id }, { $set: { Parent_id } }).then(
      (response) => {
        res.status(200).json(response);
      }
    );
  } catch (err) {
    res.status(500).json(erorrMsg.error_500);
  }
};

// All Routes
const chartEndPoint = (app: Application) => {
  app.get("/allData", getChartData);
  app.post("/insertNode", insertNode);
  app.put("/nodeupdate", nodeUpdate);
  app.post("/deletenode", isRoot, deleteNode);
  app.put("/movenodes", moveNodes);
};

export default chartEndPoint;
