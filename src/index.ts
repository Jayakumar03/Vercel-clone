const simpleGit = require("simple-git");
const express = require("express");
import { Request, Response, NextFunction } from "express";
const app = express();
const generateUtil = require("./utils/generate");
const getAllFiles = require("./utils/getAllFiles");
const cors = require("cors");
import path from "path";

app.use(cors());
app.use(express.json());

const PORT: number = 3000;

app.post("/deploy", async (req: Request, res: Response, next: NextFunction) => {
  const repoUrl = req.body.repoUrl;
  const id = generateUtil();
  await simpleGit().clone(repoUrl, path.join(__dirname, `output/${id}`));
  const files = getAllFiles(path.join(__dirname, `output/${id}`));
  console.log(files);

  res.json({
    success: true,
    id: id,
  });
});

app.listen(PORT, () => console.log("Server running at PORT :", PORT));
