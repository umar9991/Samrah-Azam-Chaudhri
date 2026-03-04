import { insertContactSchema } from "../shared/schema";
import { storage } from "./_storage";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    const rawBody = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const input = insertContactSchema.parse(rawBody);
    const submission = await storage.submitContact(input);
    res.status(201).json(submission);
  } catch (err: any) {
    if (err?.name === "ZodError") {
      const first = err.errors?.[0];
      res.status(400).json({
        message: first?.message ?? "Invalid input",
        field: first?.path?.join("."),
      });
      return;
    }
    console.error("Error submitting contact", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

