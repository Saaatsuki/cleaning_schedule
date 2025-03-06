require("dotenv").config(); // 環境変数の読み込み
const express = require("express");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");

const app = express();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(express.json());
app.use(cors()); // フロントエンドとの通信を許可

// Googleログインの認証エンドポイント
app.post("/auth/google-login", async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        console.log("User Info:", payload);

        // ここでユーザー情報をデータベースに保存したり、セッションを開始したりする
        res.json({ success: true, user: payload });
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(401).json({ success: false, message: "Invalid token" });
    }
});

// サーバー起動
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
