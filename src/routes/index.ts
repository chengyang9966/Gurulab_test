
import { Router } from "express";
import { v1Route } from "./v1.0/allRoutes";

const allRoutes = Router();

allRoutes.use('/api/v1.0',v1Route);

export { allRoutes };
