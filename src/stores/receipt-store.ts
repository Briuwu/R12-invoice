import { Receipt } from "@/lib/types";
import { create } from "zustand";

interface ReceiptState {
  receipt: Receipt[];
  addReceipt: (receipt: Receipt) => void;
  setReceipts: (receipts: Receipt[]) => void;
}

export const useReceiptStore = create<ReceiptState>()((set) => ({
  receipt: [],
  addReceipt: (receipt) =>
    set((state) => ({ receipt: [...state.receipt, receipt] })),
  setReceipts: (receipts) => set(() => ({ receipt: receipts })),
}));
