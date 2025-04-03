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
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";

const formSchema = z.object({
  cashSales: z.boolean(),
  chargeSales: z.boolean(),
  date: z.string().min(1, "Date is required"),
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
      }),
    )
    .min(1, "At least one item is required"),
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

const VAT = 0.12; // 12% VAT rate
type Props = {
  handleClose: () => void;
};

export default function InvoiceForm({ handleClose }: Props) {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [isVAT, setIsVAT] = useState(true);
  const form = useForm({
    defaultValues: {
      cashSales: false,
      chargeSales: false,
      date: new Date().toISOString().split("T")[0],
      registeredName: "",
      tinNumber: "",
      businessAddress: "",
      status: "pending",
      items: [
        {
          name: "",
          price: 0,
          quantity: 0,
        },
      ] as { name: string; price: number; quantity: number }[],
    },
    onSubmit: ({ value }) => {
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
      };
      startTransition(async () => {
        try {
          await createReceipt(receipt);
          navigate("/dashboard/invoices", { replace: true });
          window.location.reload();
          handleClose();
        } catch (error) {
          console.log(error);
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
          <form.Field name="date">
            {(field) => (
              <div>
                <Label className="flex items-center">
                  <span className="block text-xs uppercase">Date:</span>
                  <Input
                    type="date"
                    id="date"
                    name="date"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Label>
                <FieldInfo field={field} />
              </div>
            )}
          </form.Field>
        </div>
        <hr className="my-3 border-black" />
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
                        className="relative flex items-center gap-5 py-6"
                      >
                        <p className="text-sm font-bold text-blue-500 uppercase">
                          Item {index + 1}:
                        </p>
                        <form.Field key={index} name={`items[${index}].name`}>
                          {(subField) => (
                            <div className="flex-1">
                              <Label>
                                <span className="text-xs font-bold uppercase">
                                  Name:
                                </span>
                                <Input
                                  type="text"
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
                        <form.Field name={`items[${index}].price`}>
                          {(subField) => (
                            <div>
                              <Label>
                                <span className="text-xs font-bold uppercase">
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
                                  className="w-40"
                                />
                              </Label>
                              <FieldInfo field={subField} />
                            </div>
                          )}
                        </form.Field>

                        <form.Field name={`items[${index}].quantity`}>
                          {(subField) => (
                            <div>
                              <Label>
                                <span className="text-xs font-bold uppercase">
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
                                  className="w-20"
                                />
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
                            const formatted = new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "PHP",
                            }).format(total);
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
                          className="self-start"
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
        <div className="flex items-center justify-between">
          <div>
            <form.Field name="status">
              {(field) => (
                <Label className="flex items-center gap-2">
                  <span className="block text-xs uppercase">Status:</span>
                  <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </Label>
              )}
            </form.Field>
          </div>
          <div className="text-right">
            <form.Subscribe selector={(state) => state.values.items}>
              {(field) => {
                const total = field.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0,
                );
                const VATAmount = isVAT ? total * VAT : 0;
                const totalWithVAT = isVAT ? total + VATAmount : total;
                const formatted = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "PHP",
                }).format(total);
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
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "PHP",
                          }).format(VATAmount)}
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
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "PHP",
                      }).format(totalWithVAT)}
                    </p>
                  </div>
                );
              }}
            </form.Subscribe>
          </div>
        </div>
        <hr className="my-5 border-black" />
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
