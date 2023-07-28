const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Set up multer middleware to handle the file upload
const upload = multer({ dest: "uploads/" });
cloudinary.config({
  cloud_name: "dksurn366",
  api_key: "486961852597858",
  api_secret: "QS5I6ZRxmGCc2PFwW3wpZZ1Pylc",
});

// ... Cloudinary configuration ...

// Define an async function to upload the image to Cloudinary
async function uploadImageToCloudinary(file) {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "dateWebsite", // Specify the folder where you want to store the image on Cloudinary
    });
    return result.secure_url; // Return the URL of the uploaded image
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error.message);
    throw error; // Rethrow the error to be caught by the calling function
  }
}

// Your API route handler
export default async function handler(req, res) {
  try {
    // Use the multer middleware to parse the formData and handle the file upload
    upload.single("image")(req, res, async (err) => {
      if (err) {
        console.error("Error handling file upload:", err.message);
        res.status(500).json({ message: "Error handling file upload" });
        return;
      }

      // Now you can acquire the image data from the `req.file` object
      const file = req.file;
      if (!file) {
        console.error("No file provided in the request.");
        res.status(400).json({ message: "No file provided in the request." });
        return;
      }

      // Call the function to upload the image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(file);

      // Do whatever you need to do with the imageUrl (e.g., save it to the database, etc.)
      res.json({ imageUrl });
    });
  } catch (error) {
    console.error("Error handling form submission:", error.message);
    res.status(500).json({ message: "Error handling form submission" });
  }
}
