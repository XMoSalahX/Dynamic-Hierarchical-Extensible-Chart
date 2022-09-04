import { Application, Request, Response } from "express";
import swagger from "../utlities/swagger doc";
import chartEndPoint from "../handeler/chartHandeler";

// Route function to hold all endpoint
const route = (app: Application) => {
  swagger(app);
  chartEndPoint(app);

  // if route does't exist
  app.use((req: Request, res: Response) => {
    res.status(404).json({ Error: "Page Not Found." });
  });
};

export default route;
