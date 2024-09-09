import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const router = express.Router();
export { router as googleRouter };

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Route to initiate Google OAuth2 sign-in
router.get("/auth/google", (req: Request, res: Response) => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  res.redirect(url);
});

router.get("/auth/google/callback", async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) {
    return res.status(400).send("Error: Missing authorization code");
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2("v2");
    const userInfoResponse = await oauth2.userinfo.get({
      auth: oauth2Client,
    });

    const userInfo = userInfoResponse.data;

    res.json({ user: userInfo });
    console.log(userInfo);
  } catch (error) {
    console.error("Error during Google OAuth2 callback:", error);
    res.status(500).send("Authentication failed");
  }
});
