const vision = require("@google-cloud/vision");
const extractBillData = require("./aiService");

const client = new vision.ImageAnnotatorClient({
  keyFilename: "vision-key.json"
});

async function scanBill(imagePath) {
  // Step 1: OCR
  const [result] = await client.textDetection(imagePath);
  const text = result.fullTextAnnotation.text;

  // Step 2: AI extraction
  const structuredData = await extractBillData(text);

  return {
    rawText: text,
    extracted: structuredData
  };
}

module.exports = scanBill;