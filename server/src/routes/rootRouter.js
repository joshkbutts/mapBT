import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import mapRouter from './api/v1/mapRouter.js'
import markersRouter from './api/v1/markersRouter.js'
import commentsRouter from './api/v1/commentsRouter.js'
const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/my-map", mapRouter);
rootRouter.use("/api/v1/markers", markersRouter);
rootRouter.use("/api/v1/comments", commentsRouter);

export default rootRouter;
