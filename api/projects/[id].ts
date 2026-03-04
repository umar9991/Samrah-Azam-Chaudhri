import { storage } from "../_storage";

export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { id } = req.query ?? {};
  if (!id || typeof id !== "string") {
    res.status(400).json({ message: "Missing project id" });
    return;
  }

  try {
    const project = await storage.getProject(id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }
    res.status(200).json(project);
  } catch (err) {
    console.error("Error fetching project", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

