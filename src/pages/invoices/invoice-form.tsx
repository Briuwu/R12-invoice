import { createReceipt } from "@/appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { VAT, formatCurrency, measurementUnits } from "@/lib/utils";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  cashSales: z.boolean(),
  chargeSales: z.boolean(),
  date: z.string().min(1, "Date is required"),
  due: z.string().min(1, "Due date is required"),
  registeredName: z.string().min(1, "Registered name is required"),
  tinNumber: z.string().min(1, "TIN number is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  status: z.string().min(1, "Status is required"),
  items: z
    .array(
      z.object({
        name: z.string().min(1, "Item name is required"),
        price: z.number().positive("Price must be positive"),
        quantity: z.number().positive("Quantity must be positive"),
        uom: z.string().min(1, "Unit of measure is required"),
      }),
    )
    .min(1, "At least one item is required"),
  shipRegisteredName: z.string(),
  shipBusinessAddress: z.string(),
  contactPerson: z.string().min(1, "Contact person is required"),
  salesPerson: z.string().min(1, "Sales person is required"),
  paymentTerms: z.string().min(1, "Payment terms is required"),
  specialInstruction: z.string(),
});

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="absolute text-xs text-red-500">
          {field.state.meta.errors[0].message}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

function generateInvoiceNumber(date: Date) {
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (01-12)
  const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number (0-999999)
  return `${year}${month}-${randomNum}`; // Format as YYMM-XXXXXX
}

function generatePurcharseOrder() {
  const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number (0-999999)
  return `PO-${randomNum}`; // Format as PO-XXXXXX
}

function generateSalesOrder() {
  const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number (0-999999)
  return `SO-${randomNum}`; // Format as SO-XXXXXX
}

type Props = {
  handleClose: () => void;
};

export default function InvoiceForm({ handleClose }: Props) {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [isVAT, setIsVAT] = useState(true);
  const [isSameInfo, setIsSameInfo] = useState(false);
  const form = useForm({
    defaultValues: {
      cashSales: false,
      chargeSales: false,
      date: new Date().toISOString().split("T")[0],
      due: "",
      registeredName: "",
      tinNumber: "",
      businessAddress: "",
      status: "pending",
      items: [
        {
          name: "",
          price: 0,
          quantity: 0,
          uom: "",
        },
      ] as { name: string; price: number; quantity: number; uom: string }[],
      shipRegisteredName: "",
      shipBusinessAddress: "",
      contactPerson: "",
      salesPerson: "",
      paymentTerms: "",
      specialInstruction: "",
    },
    onSubmit: ({ value }) => {
      if (!isSameInfo) {
        if (!value.shipRegisteredName || !value.shipBusinessAddress) {
          toast.error("Please fill in the shipping information.");
          return;
        }
      }
      const receipt = {
        ...value,
        isVAT,
        invoiceNum: generateInvoiceNumber(new Date(value.date)),
        items: value.items.map((item) => ({
          ...item,
          totalAmount: String(item.price * item.quantity),
          price: String(item.price.toFixed(2)),
          quantity: String(item.quantity),
        })),
        receiptTotal: String(
          value.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          ) +
            (isVAT
              ? value.items.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0,
                ) * VAT
              : 0),
        ),
        shipRegisteredName: isSameInfo
          ? value.registeredName
          : value.shipRegisteredName,
        shipBusinessAddress: isSameInfo
          ? value.businessAddress
          : value.shipBusinessAddress,
        purchaseOrder: generatePurcharseOrder(),
        salesOrder: generateSalesOrder(),
      };
      startTransition(async () => {
        try {
          await createReceipt(receipt);
          navigate("/dashboard/invoices", { replace: true });
          toast.success("Invoice created successfully!");
          window.location.reload();
          handleClose();
        } catch (error) {
          console.log(error);
          toast.error(`Failed to create invoice: ${error}`);
        }
      });
    },
    validators: {
      onSubmit: formSchema,
    },
  });

  return (
    <div className="px-4">
      <p className="mb-5 text-center text-3xl font-bold uppercase">
        {isVAT ? "VAT" : "Non-VAT"} Invoice Form
      </p>
      <div className="mb-5 flex items-center justify-between">
        <Label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isVAT}
            onChange={(e) => setIsVAT(e.target.checked)}
          />
          <span className="block text-xs uppercase">VAT</span>
        </Label>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <form.Field name="cashSales">
              {(field) => (
                <Label className="flex items-center">
                  <input
                    type="checkbox"
                    id="cashSales"
                    name="cashSales"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
                  <span className="block text-xs uppercase">Cash Sales</span>
                </Label>
              )}
            </form.Field>
            <form.Field name="chargeSales">
              {(field) => (
                <Label className="flex items-center">
                  <input
                    type="checkbox"
                    id="chargeSales"
                    name="chargeSales"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                  />
                  <span className="block text-xs uppercase">Charge Sales</span>
                </Label>
              )}
            </form.Field>
          </div>
          <div className="flex items-center gap-5">
            <form.Field name="date">
              {(field) => (
                <div>
                  <Label className="flex items-center">
                    <span className="block text-xs font-bold uppercase">
                      Date:
                    </span>
                    <Input
                      type="date"
                      id="date"
                      name="date"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-fit"
                    />
                  </Label>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field name="due">
              {(field) => (
                <div>
                  <Label className="flex items-center">
                    <span className="block text-xs font-bold uppercase">
                      Due Date:
                    </span>
                    <Input
                      type="date"
                      id="due"
                      name="due"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-fit"
                    />
                  </Label>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field name="status">
              {(field) => (
                <div>
                  <Label className="flex items-center gap-2">
                    <span className="block text-xs font-bold uppercase">
                      Status:
                    </span>
                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                    >
                      <SelectTrigger className="w-fit">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="success">Success</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </Label>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>
        </div>

        <hr className="my-5 border-black" />
        <div className="space-y-3">
          <p className="text-lg font-bold uppercase">Sold to:</p>
          <div className="space-y-7.5">
            <form.Field name="registeredName">
              {(field) => (
                <div>
                  <Label className="grid grid-cols-[0.15fr_1fr] items-center gap-2">
                    <span className="block text-xs uppercase">
                      Registered Name:
                    </span>
                    <Input
                      type="text"
                      id="registeredName"
                      name="registeredName"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Label>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field name="tinNumber">
              {(field) => (
                <div>
                  <Label className="grid grid-cols-[0.15fr_1fr] items-center gap-2">
                    <span className="block text-xs uppercase">TIN Number:</span>
                    <Input
                      type="text"
                      id="tinNumber"
                      name="tinNumber"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Label>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field name="businessAddress">
              {(field) => (
                <div>
                  <Label className="grid grid-cols-[0.15fr_1fr] items-center gap-2">
                    <span className="block text-xs uppercase">
                      Business Address:
                    </span>
                    <Input
                      type="text"
                      id="businessAddress"
                      name="businessAddress"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Label>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>
        </div>
        <hr className="my-5 border-black" />
        <div className="mb-5 flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isSameInfo}
              onChange={(e) => setIsSameInfo(e.target.checked)}
            />
            <span className="block text-xs uppercase">Same as Sold to</span>
          </Label>
        </div>
        <div className="space-y-3">
          <p className="text-lg font-bold uppercase">Ship to:</p>
          <div className="space-y-7.5">
            <form.Field name="shipRegisteredName">
              {(field) => (
                <div>
                  <Label className="grid grid-cols-[0.15fr_1fr] items-center gap-2">
                    <span className="block text-xs uppercase">Name:</span>
                    <Input
                      type="text"
                      id="shipRegisteredName"
                      name="shipRegisteredName"
                      value={
                        isSameInfo
                          ? form.getFieldValue("registeredName")
                          : field.state.value
                      }
                      disabled={isSameInfo || isPending}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </Label>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>

            <form.Field name="shipBusinessAddress">
              {(field) => (
                <div>
                  <Label className="grid grid-cols-[0.15fr_1fr] items-center gap-2">
                    <span className="block text-xs uppercase">Address:</span>
                    <Input
                      type="text"
                      id="shipBusinessAddress"
                      name="shipBusinessAddress"
                      value={
                        isSameInfo
                          ? form.getFieldValue("businessAddress")
                          : field.state.value
                      }
                      onChange={(e) => field.handleChange(e.target.value)}
                      disabled={isSameInfo || isPending}
                    />
                  </Label>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>
        </div>
        <hr className="my-5 border-black" />
        <div>
          <p className="text-lg font-bold uppercase">Items:</p>
          <form.Field name="items" mode="array">
            {(field) => {
              return (
                <div className="flex flex-col space-y-3">
                  <FieldInfo field={field} />
                  <div className="divide-y-2">
                    {field.state.value.map((_, index) => (
                      <div
                        key={index}
                        className="relative flex items-center gap-5 py-8"
                      >
                        <p className="text-sm font-bold text-blue-500 uppercase">
                          Item {index + 1}:
                        </p>
                        <form.Field key={index} name={`items[${index}].name`}>
                          {(subField) => (
                            <div className="relative flex-1">
                              <Label>
                                <span className="absolute -top-5 text-xs font-bold uppercase">
                                  Name:
                                </span>
                                <Textarea
                                  value={subField.state.value}
                                  onChange={(e) =>
                                    subField.handleChange(e.target.value)
                                  }
                                />
                              </Label>
                              <FieldInfo field={subField} />
                            </div>
                          )}
                        </form.Field>

                        <form.Field name={`items[${index}].quantity`}>
                          {(subField) => (
                            <div className="relative">
                              <Label>
                                <span className="absolute -top-5 text-xs font-bold uppercase">
                                  Quantity:
                                </span>
                                <Input
                                  type="number"
                                  value={subField.state.value}
                                  onChange={(e) =>
                                    subField.handleChange(
                                      e.target.valueAsNumber,
                                    )
                                  }
                                  className="w-24"
                                />
                              </Label>
                              <FieldInfo field={subField} />
                            </div>
                          )}
                        </form.Field>

                        <form.Field name={`items[${index}].price`}>
                          {(subField) => (
                            <div className="relative">
                              <Label>
                                <span className="absolute -top-5 text-xs font-bold uppercase">
                                  Price:
                                </span>
                                <Input
                                  type="number"
                                  value={subField.state.value}
                                  onChange={(e) =>
                                    subField.handleChange(
                                      e.target.valueAsNumber,
                                    )
                                  }
                                  className="w-24"
                                />
                              </Label>
                              <FieldInfo field={subField} />
                            </div>
                          )}
                        </form.Field>

                        <form.Field name={`items[${index}].uom`}>
                          {(subField) => (
                            <div className="relative">
                              <Label className="flex items-center gap-2">
                                <span className="absolute -top-5 text-xs font-bold uppercase">
                                  UOM:
                                </span>
                                <Select
                                  value={subField.state.value}
                                  onValueChange={(value) =>
                                    subField.handleChange(value)
                                  }
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Select unit of measure" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {measurementUnits.map((unit) => (
                                      <SelectItem
                                        key={unit.value}
                                        value={unit.value}
                                      >
                                        {unit.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </Label>
                              <FieldInfo field={subField} />
                            </div>
                          )}
                        </form.Field>

                        <form.Subscribe
                          selector={(state) => state.values.items}
                        >
                          {(field) => {
                            const total =
                              field[index].price * field[index].quantity;
                            const formatted = formatCurrency(total);
                            return (
                              <p className="text-sm font-bold text-emerald-500">
                                {total ? formatted : "₱0.00"}
                              </p>
                            );
                          }}
                        </form.Subscribe>
                        <Button
                          variant="destructive"
                          onClick={() => field.removeValue(index)}
                        >
                          <Trash />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() =>
                      field.pushValue({
                        name: "",
                        price: 0,
                        quantity: 0,
                        uom: "",
                      })
                    }
                    className="self-end"
                  >
                    + Add New Item
                  </Button>
                </div>
              );
            }}
          </form.Field>
        </div>

        <hr className="my-5 border-black" />

        <div className="flex items-center justify-end">
          <div className="text-right">
            <form.Subscribe selector={(state) => state.values.items}>
              {(field) => {
                const total = field.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0,
                );
                const VATAmount = isVAT ? total * VAT : 0;
                const totalWithVAT = isVAT ? total + VATAmount : total;
                const formatted = formatCurrency(total);
                return (
                  <div className="grid grid-cols-2 items-center justify-center gap-3">
                    <p className="text-xs font-bold uppercase">Total Sales:</p>
                    <p className="text-sm font-bold text-emerald-500">
                      {total ? formatted : "₱0.00"}
                    </p>
                    {isVAT && (
                      <>
                        <p className="text-xs font-bold uppercase">
                          Less: VAT ({VAT * 100}%):
                        </p>
                        <p className="text-xs font-bold text-red-500">
                          {formatCurrency(VATAmount)}
                        </p>
                      </>
                    )}
                    <p className="text-xs font-bold uppercase">
                      Less: Discount:
                    </p>
                    <p className="text-xs font-bold text-red-500">₱0.00</p>

                    <p className="text-xs font-bold uppercase">
                      Less: Witholding Tax:
                    </p>
                    <p className="text-xs font-bold text-red-500">₱0.00</p>
                    <hr className="col-span-full border-black" />
                    <p className="text-xs font-bold uppercase">
                      Total Amount Due:
                    </p>
                    <p className="text-lg font-bold text-emerald-500">
                      {formatCurrency(isVAT ? totalWithVAT : total)}
                    </p>
                  </div>
                );
              }}
            </form.Subscribe>
          </div>
        </div>

        <hr className="my-5 border-black" />
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-1">
              <p className="font-bold uppercase">Contact Person:</p>
              <form.Field name="contactPerson">
                {(field) => (
                  <div>
                    <Label className="grid grid-cols-[0.15fr_1fr] items-center gap-2">
                      <span className="block text-xs uppercase">Name:</span>
                      <Input
                        type="text"
                        id="contactPerson"
                        name="contactPerson"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter contact person name here..."
                        disabled={isPending}
                      />
                    </Label>
                    <FieldInfo field={field} />
                  </div>
                )}
              </form.Field>
            </div>
            <div className="space-y-1">
              <p className="font-bold uppercase">Sales Person:</p>
              <form.Field name="salesPerson">
                {(field) => (
                  <div>
                    <Label className="grid grid-cols-[0.15fr_1fr] items-center gap-2">
                      <span className="block text-xs uppercase">Name:</span>
                      <Input
                        type="text"
                        id="salesPerson"
                        name="salesPerson"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter sales person name here..."
                        disabled={isPending}
                      />
                    </Label>
                    <FieldInfo field={field} />
                  </div>
                )}
              </form.Field>
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-bold uppercase">Payment Terms:</p>
            <form.Field name="paymentTerms">
              {(field) => (
                <div>
                  <Label>
                    <Textarea
                      id="paymentTerms"
                      name="paymentTerms"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="resize-none"
                      rows={3}
                      placeholder="Enter payment terms here..."
                      disabled={isPending}
                    />
                  </Label>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>
          <div className="space-y-1">
            <p className="font-bold uppercase">Special Instructions:</p>
            <form.Field name="specialInstruction">
              {(field) => (
                <div>
                  <Label>
                    <Textarea
                      id="specialInstruction"
                      name="specialInstruction"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="resize-none"
                      rows={3}
                      placeholder="Enter Special Instructions here..."
                      disabled={isPending}
                    />
                  </Label>
                  <FieldInfo field={field} />
                </div>
              )}
            </form.Field>
          </div>
        </div>

        <hr className="my-5 border-black" />
        <form.Subscribe selector={(state) => state.errors}>
          {(errors) => {
            if (Object.keys(errors).length > 0) {
              return (
                <p className="mb-5 text-center text-sm font-bold text-red-500">
                  Please fix the errors above before submitting the form.
                </p>
              );
            }
          }}
        </form.Subscribe>
        <Button
          onClick={() => form.handleSubmit()}
          className="mb-5 h-14 w-full bg-green-500 uppercase"
          disabled={isPending}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
