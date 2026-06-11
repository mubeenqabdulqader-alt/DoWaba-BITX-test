const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const BOT_TOKEN = "8980627295:AAE-bk9y2x6fh_RXFm2qjnc3CTRkecidEgk";
const CHAT_ID = "886931442";

app.all("/webhook/dowaba", async (req, res) => {
  try {
    console.log("METHOD:", req.method);
    console.log("BODY:", req.body);

    const data = req.body || {};

    const message = `
🛒 New Order

👤 Name: ${data.name || data.customerName || "N/A"}
📞 Phone: ${data.phone || "N/A"}
📍 Location: ${data.location || "N/A"}

🍔 Order:
${data.order || data.message || "N/A"}
`;

    await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        params: {
          chat_id: CHAT_ID,
          text: message
        }
      }
    );

    res.send("OK");
  } catch (err) {
    console.log("ERROR:", err.message);
    res.send("OK");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});