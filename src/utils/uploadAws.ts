const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const getAllFiles = require("./getAllFiles");

const uploadFileToAws = async (folderPath: string) => {
  // accessKeyId: process.env.ACCESSKEY,
  // secretAccessKey: process.env.SECRETACCESSKEY,

  const files = getAllFiles(folderPath);

  // Create a new instance of the S3 class
  const s3 = new AWS.S3({
    region: "ap-south-1",
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETACCESSKEY,
  });

  const bucketDir = folderPath.slice(__dirname.length - 5);

  for (const localFilepath of files) {
    const file = fs.createReadStream(localFilepath);

    const param = {
      Bucket: "files-from-vercel-clone",
      Key: bucketDir,
      Body: file,
    };

    try {
      const data = await s3.upload(param).promise();
      console.log(
        `File uploaded successfully. ${file.path} is now available at ${data.Location}`
      );
    } catch (err) {
      console.error(`Error uploading file ${file}:`, err);
    }

    //! Harkirat method
    // const fileContent = fs.readFileSync(localFilepath);
    // const response = await s3
    //   .upload({
    //     Body: fileContent,
    //     Bucket: "files-from-vercel-clone",
    //     Key: bucketDir,
    //   })
    //   .promise();
    // console.log(response);
  }
};

module.exports = uploadFileToAws;
