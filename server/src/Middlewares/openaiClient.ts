import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
async function categorizeEmail(subject: string, body: string): Promise<string> {
  const prompt = `
      Categorize the following email content into one of the following categories:
      
      1. 'Interested': Use this category if the email is related to job opportunities, professional communication (like meetings, project discussions), or relevant personal topics.
      2. 'Not Interested': Use this category if the email is about sales, offers, marketing promotions, advertisements, or anything generally considered spam.
      3. 'More Information': Use this category if the email seems important but lacks sufficient details, requires action or clarification, or asks for more information (e.g., billing issues, password resets).
  
      Subject: ${subject}
      Body: ${body}
  
      Focus on keywords like "offer", "sale", "free", and similar to classify emails as 'Not Interested'. Use words like "meeting", "schedule", "job", "opportunity", and "project" to identify emails as 'Interested'. Emails about renewal, security, or missing information should be categorized as 'More Information'.
    `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 50,
      temperature: 0.5,
    });

    if (response.choices && response.choices.length > 0) {
      const completion =
        response.choices[0]?.message?.content?.trim() || "No response";
      return completion;
    } else {
      return "No response";
    }
  } catch (error) {
    console.error("Error interacting with OpenAI API:", error);
    return "Error";
  }
}

export { openai, categorizeEmail };
