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
  uom: string;
  totalAmount: string;
};

export type Receipt = {
  $id: string;
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
  status: string;
  $createdAt: string;
  shipRegisteredName: string;
  shipBusinessAddress: string;
  due: string;
  contactPerson: string;
  salesPerson: string;
  paymentTerms: string;
  specialInstruction?: string;
  salesOrder: string;
  purchaseOrder: string;
};

export type AddReceipt = Omit<Receipt, "$id" | "$createdAt">;

export type AddItem = Omit<Item, "id">;
