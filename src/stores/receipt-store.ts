import { Receipt } from "@/lib/types";
import { create } from "zustand";

interface ReceiptState {
  receipt: Receipt[];
  addReceipt: (receipt: Receipt) => void;
  setReceipts: (receipts: Receipt[]) => void;
  getReceiptById: (id: string) => Receipt | undefined;
}

export const useReceiptStore = create<ReceiptState>()((set) => ({
  receipt: [],
  addReceipt: (receipt) =>
    set((state) => ({ receipt: [...state.receipt, receipt] })),
  setReceipts: (receipts) => set(() => ({ receipt: receipts })),
  getReceiptById: (id) =>
    ((state) => {
      const receipt = state.receipt.find((item) => item.$id === id);
      if (!receipt) {
        return undefined;
      }
      return receipt;
    })(useReceiptStore.getState()),
}));
