const axios = require("axios");

async function extractBillData(text) {
  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY",
      {
        contents: [
          {
            parts: [
              {
                text: `
Extract the following details from this bill text:

- product name
- brand
- purchase date
- warranty duration

Return ONLY JSON format like:
{
  "product": "",
  "brand": "",
  "date": "",
  "warranty": ""
}

Bill text:
${text}
                `
              }
            ]
          }
        ]
      }
    );

    const result = response.data.candidates[0].content.parts[0].text;

    return JSON.parse(result);
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = extractBillData;