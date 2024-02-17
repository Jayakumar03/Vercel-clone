"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpleGit = require("simple-git");
const express = require("express");
const app = express();
const generateUtil = require("./utils/generate");
const getAllFiles = require("./utils/getAllFiles");
const cors = require("cors");
const path_1 = __importDefault(require("path"));
app.use(cors());
app.use(express.json());
const PORT = 3000;
app.post("/deploy", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const repoUrl = req.body.repoUrl;
    const id = generateUtil();
    yield simpleGit().clone(repoUrl, path_1.default.join(__dirname, `output/${id}`));
    const files = getAllFiles(path_1.default.join(__dirname, `output/${id}`));
    console.log(files);
    res.json({
        success: true,
        id: id,
    });
}));
app.listen(PORT, () => console.log("Server running at PORT :", PORT));
