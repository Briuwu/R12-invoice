import { Client, Account, Databases, ID } from "appwrite";
import { AddReceipt } from "./lib/types";

export const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
const db = new Databases(client);

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID!;
const receiptsCollectionId = import.meta.env.VITE_APPWRITE_RECEIPTS_ID!;
// const itemsCollectionId = import.meta.env.VITE_APPWRITE_ITEMS_ID!;

export const createReceipt = async (data: AddReceipt) => {
  await db.createDocument(databaseId, receiptsCollectionId, ID.unique(), data);
};

export const getReceipts = async () => {
  const receipts = await db.listDocuments(databaseId, receiptsCollectionId);
  return receipts.documents;
};

export const updateReceipt = async (id: string, data: Partial<AddReceipt>) => {
  await db.updateDocument(databaseId, receiptsCollectionId, id, data);
};
