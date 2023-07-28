const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: 'lyrical-line-393207',
  keyFilename: './config/serviceAccountKey.json',
});


async function uploadFile(bucketName, file, destinationFileName) {
  const bucket = storage.bucket(bucketName);
  const options = {
    destination: destinationFileName,
  };

  try {
    await bucket.upload(file, options);
    console.log('File uploaded successfully.');
    // Return the public URL of the uploaded file
    const [url] = await bucket.file(destinationFileName).getSignedUrl({ action: 'read', expires: Date.now() + 1000 * 60 * 60 * 24 * 7 }); // URL is valid for 7 days
    return url;
  } catch (error) {
    console.error('Error uploading file:', error.message);
    throw error; // Rethrow the error to be caught by the calling function
  }
}

module.exports = {
  uploadFile,
};
