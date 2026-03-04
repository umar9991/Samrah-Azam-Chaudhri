import { storage } from "../_storage";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    const articles = await storage.getArticles();
    res.status(200).json(articles);
  } catch (err) {
    console.error("Error fetching articles", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

