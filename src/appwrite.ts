import { Client, Account, Databases, ID, Query, Models } from "appwrite";
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
  let documents: Models.Document[] = [];
  let offset = 0;
  const LIMIT = 100;

  while (true) {
    const { documents: newDocuments } = await db.listDocuments(
      databaseId,
      receiptsCollectionId,
      [Query.limit(LIMIT), Query.offset(offset)],
    );

    if (newDocuments.length === 0) break;

    documents = [...newDocuments, ...documents];

    offset += LIMIT;
  }

  return documents;
};

export const updateReceipt = async (id: string, data: Partial<AddReceipt>) => {
  await db.updateDocument(databaseId, receiptsCollectionId, id, data);
};

export const deleteReceipt = async (id: string) => {
  await db.deleteDocument(databaseId, receiptsCollectionId, id);
};

export const getReceiptById = async (id: string) => {
  const document = await db.getDocument(databaseId, receiptsCollectionId, id);

  return document;
};
