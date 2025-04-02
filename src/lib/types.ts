export type Payment = {
  id: string;
  amount: number;
  status: string;
  email: string;
};

export type Item = {
  name: string;
  price: string;
  quantity: string;
  totalAmount: string;
};

export type Receipt = {
  id: string;
  date: string;
  registeredName: string;
  tinNumber: string;
  businessAddress: string;
  cashSales: boolean;
  chargeSales: boolean;
  items: Item[];
  isVAT: boolean;
  invoiceNum: string;
  receiptTotal: string;
};

export type AddReceipt = Omit<Receipt, "id">;

export type AddItem = Omit<Item, "id">;
