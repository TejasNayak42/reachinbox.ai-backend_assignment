// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import { google } from "googleapis";
// import { openai } from "../Middlewares/openaiClient";

// dotenv.config();

// const router = express.Router();
// export { router as googleRouter };

// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

// const oauth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );

// // Route to initiate Google OAuth2 sign-in
// router.get("/auth/google", (req: Request, res: Response) => {
//   const scopes = [
//     "https://www.googleapis.com/auth/userinfo.profile",
//     "https://www.googleapis.com/auth/userinfo.email",
//   ];

//   const url = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: scopes,
//   });

//   res.redirect(url);
// });

// // router.get("/auth/google/callback", async (req: Request, res: Response) => {
// //   const code = req.query.code as string;

// //   if (!code) {
// //     return res.status(400).send("Error: Missing authorization code");
// //   }

// //   try {
// //     const { tokens } = await oauth2Client.getToken(code);
// //     oauth2Client.setCredentials(tokens);

// //     const oauth2 = google.oauth2("v2");
// //     const userInfoResponse = await oauth2.userinfo.get({
// //       auth: oauth2Client,
// //     });

// //     const userInfo = userInfoResponse.data;

// //     res.json({ user: userInfo });
// //     console.log(userInfo);
// //   } catch (error) {
// //     console.error("Error during Google OAuth2 callback:", error);
// //     res.status(500).send("Authentication failed");
// //   }
// // });

// async function categorizeEmail(subject: string, body: string): Promise<string> {
//   const prompt = `Categorize the following email content as 'Interested', 'Not Interested', or 'More Information':\n\nSubject: ${subject}\n\nBody: ${body}`;

//   try {
//     const response = await openai.completions.create({
//       model: 'text-davinci-003',
//       prompt,
//       max_tokens: 50,
//     });

//     // Access the choices directly
//     const completion = response.choices[0]?.text?.trim() || 'No response';
//     return completion;
//   } catch (error) {
//     console.error('Error interacting with OpenAI API:', error);
//     return 'Error'; // Handle the error appropriately
//   }
// }

// // Example usage
// categorizeEmail("Meeting Request", "I would like to schedule a meeting next week to discuss our project.")
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

// router.get('/auth/google/callback', async (req: Request, res: Response) => {
//   const code = req.query.code as string;

//   if (!code) {
//     return res.status(400).send('Error: Missing authorization code');
//   }

//   try {
//     // Exchange code for tokens
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     // Fetch emails from Gmail
//     const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
//     const emailResponse = await gmail.users.messages.list({
//       userId: 'me',
//       maxResults: 10,
//     });

//     // Process and categorize emails
//     const emails = emailResponse.data.messages || [];
//     const categorizedEmails = await Promise.all(emails.map(async (email) => {
//       const emailData = await gmail.users.messages.get({
//         userId: 'me',
//         id: email.id,
//       });
//       const category = await categorizeEmail(emailData.data.snippet || '', emailData.data.payload?.headers?.find(h => h.name === 'Subject')?.value || '');
//       return { ...emailData.data, category };
//     }));

//     res.json({ categorizedEmails });

//   } catch (error) {
//     console.error('Error during Google OAuth2 callback:', error);
//     res.status(500).send('Authentication failed');
//   }
// });

// //////////////////////////////////////////////////////////////
// // Import necessary modules and configure environment variables
// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import { google } from "googleapis";
// import { openai } from "../Middlewares/openaiClient";

// dotenv.config();

// const router = express.Router();
// export { router as googleRouter };

// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

// const oauth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );

// router.get("/auth/google", (req: Request, res: Response) => {
//   const scopes = [
//     "https://www.googleapis.com/auth/userinfo.profile",
//     "https://www.googleapis.com/auth/userinfo.email",
//     "https://www.googleapis.com/auth/gmail.readonly",
//   ];

//   const url = oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: scopes,
//   });

//   res.redirect(url);
// });

// async function categorizeEmail(subject: string, body: string): Promise<string> {
//   const prompt = `Categorize the following email content as 'Interested', 'Not Interested', or 'More Information':\n\nSubject: ${subject}\n\nBody: ${body}`;

//   try {
//     const response = await openai.completions.create({
//       model: "text-davinci-003",
//       prompt,
//       max_tokens: 50,
//     });

//     // Access the choices directly
//     const completion = response.choices[0]?.text?.trim() || "No response";
//     return completion;
//   } catch (error) {
//     console.error("Error interacting with OpenAI API:", error);
//     return "Error"; // Handle the error appropriately
//   }
// }

// router.get("/auth/google/callback", async (req: Request, res: Response) => {
//   const code = req.query.code as string;

//   if (!code) {
//     return res.status(400).send("Error: Missing authorization code");
//   }

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     const gmail = google.gmail({ version: "v1", auth: oauth2Client });
//     const emailResponse = await gmail.users.messages.list({
//       userId: "me",
//       maxResults: 10,
//     });

//     const emails = emailResponse.data.messages || [];
//     const categorizedEmails = await Promise.all(
//       emails.map(async (email) => {
//         const emailData = await gmail.users.messages.get({
//           userId: "me",
//           id: email.id,
//         });

//         const subject =
//           emailData.data.payload?.headers?.find((h) => h.name === "Subject")
//             ?.value || "";
//         const body = emailData.data.snippet || "";
//         const category = await categorizeEmail(subject, body);

//         console.log(`Email ID: ${email.id}, Category: ${category}`); // Log the email ID and its category

//         return { ...emailData.data, category };
//       })
//     );

//     res.json({ categorizedEmails });
//   } catch (error) {
//     console.error("Error during Google OAuth2 callback:", error);
//     res.status(500).send("Authentication failed");
//   }
// });

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { google } from "googleapis";
import { categorizeEmail, openai } from "../Middlewares/openaiClient";

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

router.get("/auth/google", (req: Request, res: Response) => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/gmail.readonly",
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

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const emailResponse = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
    });

    const emails = emailResponse.data.messages || [];
    const categorizedEmails = await Promise.all(
      emails.map(async (email) => {
        const emailData = await gmail.users.messages.get({
          userId: "me",
          id: email.id,
        });

        const subject =
          emailData.data.payload?.headers?.find((h) => h.name === "Subject")
            ?.value || "";
        const body = emailData.data.snippet || "";
        const category = await categorizeEmail(subject, body);

        return {
          id: email.id,
          subject: subject,
          snippet: body,
          category: category,
        };
      })
    );

    const formattedResponse = categorizedEmails
      .map(
        (email) =>
          `Email ID: ${email.id}\nSubject: ${email.subject}\nSnippet: ${email.snippet}\nCategory: ${email.category}\n\n`
      )
      .join("");

    res.send(`<pre>${formattedResponse}</pre>`);
  } catch (error) {
    console.error("Error during Google OAuth2 callback:", error);
    res.status(500).send("Authentication failed");
  }
});
