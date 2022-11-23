import express from "express";
import fs from "fs";
import { CustomRoutes } from "./backend/routes/route";
const http = express();
CustomRoutes(http, express);
