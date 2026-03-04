import { storage } from "../_storage";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    const projects = await storage.getProjects();
    res.status(200).json(projects);
  } catch (err) {
    console.error("Error fetching projects", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

