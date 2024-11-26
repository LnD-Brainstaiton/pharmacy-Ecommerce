const vision = require("@google-cloud/vision");
const path = require("path");
require("dotenv").config();

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

const googleOCR = async (fileBuffer) => {
  try {
    const base64Image = fileBuffer.toString("base64"); // Convert buffer to base64
    const [result] = await client.documentTextDetection({
      image: { content: base64Image },
    });

    const fullText = result.fullTextAnnotation?.text || "No text found.";
    return fullText;
  } catch (error) {
    console.error("Google OCR Processing Failed:", error);
    throw new Error("Google OCR processing failed.");
  }
};

module.exports = { googleOCR };
