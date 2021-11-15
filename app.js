const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

class Nodinary {
  constructor(cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret) {
    this.cloudinaryCloudName = cloudinaryCloudName;
    this.cloudinaryApiKey = cloudinaryApiKey;
    this.cloudinaryApiSecret = cloudinaryApiSecret;
  }

  uploadBuffer = (bufferFile, folderName) => {
    return new Promise((resolve, reject) => {
      const cldUploadStream = cloudinary
        .config({
          cloud_name: this.cloudinaryCloudName,
          api_key: this.cloudinaryApiKey,
          api_secret: this.cloudinaryApiSecret,
        })
        .uploader.upload_stream(
          {
            folder: `${folderName}`,
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

      streamifier.createReadStream(bufferFile).pipe(cldUploadStream);
    });
  };

  deleteFile = async (fileId) => {
    await cloudinary
      .config({
        cloud_name: this.cloudinaryCloudName,
        api_key: this.cloudinaryApiKey,
        api_secret: this.cloudinaryApiSecret,
      })
      .uploader.destroy(fileId);
  };
}

module.exports = Nodinary;
