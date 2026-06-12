const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const BOT_TOKEN = "YOUR_BOT_TOKEN";
const CHAT_ID = "YOUR_CHAT_ID";

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

    return res.status(200).json({
      success: true,
      message: "Order received"
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});