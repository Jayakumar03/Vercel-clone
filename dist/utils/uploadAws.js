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
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const getAllFiles = require("./getAllFiles");
const uploadFileToAws = (folderPath) => __awaiter(void 0, void 0, void 0, function* () {
    // accessKeyId: process.env.ACCESSKEY,
    // secretAccessKey: process.env.SECRETACCESSKEY,
    const files = getAllFiles(folderPath);
    // Create a new instance of the S3 class
    const s3 = new AWS.S3({
        region: "ap-south-1",
        accessKeyId: "AKIATKWQW6C5X7AMMA7T",
        secretAccessKey: "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",
    });
    const bucketDir = folderPath.slice(__dirname.length - 5);
    for (const localFilepath of files) {
        // const file = fs.createReadStream(localFilepath);
        // const param = {
        //   Bucket: "files-from-vercel-clone",
        //   Key: bucketDir,
        //   Body: file,
        // };
        // try {
        //   const data = await s3.upload(param).promise();
        //   console.log(
        //     `File uploaded successfully. ${file.path} is now available at ${data.Location}`
        //   );
        // } catch (err) {
        //   console.error(`Error uploading file ${file}:`, err);
        // }
        const fileContent = fs.readFileSync(localFilepath);
        const response = yield s3
            .upload({
            Body: fileContent,
            Bucket: "files-from-vercel-clone",
            Key: bucketDir,
        })
            .promise();
        console.log(response);
    }
});
module.exports = uploadFileToAws;
