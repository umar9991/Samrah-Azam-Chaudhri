import type {
  Project,
  Article,
  ContactSubmission,
  InsertProject,
  InsertArticle,
  InsertContact,
} from "../shared/schema";
import { getCollection } from "./_db";
import { ObjectId } from "mongodb";

interface ProjectDoc extends InsertProject {
  _id: unknown;
  createdAt?: Date;
}

interface ArticleDoc extends InsertArticle {
  _id: unknown;
  publishedAt?: Date;
}

interface ContactDoc extends InsertContact {
  _id: unknown;
  createdAt?: Date;
}

function toProject(doc: ProjectDoc): Project {
  const { _id, ...rest } = doc;
  return { id: String(_id), ...(rest as Omit<ProjectDoc, "_id">) } as Project;
}

function toArticle(doc: ArticleDoc): Article {
  const { _id, ...rest } = doc;
  return { id: String(_id), ...(rest as Omit<ArticleDoc, "_id">) } as Article;
}

function toContact(doc: ContactDoc): ContactSubmission {
  const { _id, ...rest } = doc;
  return { id: String(_id), ...(rest as Omit<ContactDoc, "_id">) } as ContactSubmission;
}

export const storage = {
  async getProjects(): Promise<Project[]> {
    const col = await getCollection<ProjectDoc>("projects");
    const docs = await col.find({}).toArray();
    return docs.map(toProject);
  },

  async getProject(id: string): Promise<Project | undefined> {
    const col = await getCollection<ProjectDoc>("projects");
    let query: any;
    try {
      query = { _id: new ObjectId(id) };
    } catch {
      query = { _id: id };
    }
    const doc = await col.findOne(query);
    return doc ? toProject(doc) : undefined;
  },

  async getArticles(): Promise<Article[]> {
    const col = await getCollection<ArticleDoc>("articles");
    const docs = await col.find({}).toArray();
    return docs.map(toArticle);
  },

  async submitContact(contact: InsertContact): Promise<ContactSubmission> {
    const col = await getCollection<ContactDoc>("contactSubmissions");
    const doc = { ...contact, createdAt: new Date() } as ContactDoc;
    const result = await col.insertOne(doc as any);
    const inserted = await col.findOne({ _id: result.insertedId } as any);
    return toContact(inserted as ContactDoc);
  },
};

