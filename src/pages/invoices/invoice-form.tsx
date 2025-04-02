import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { Trash } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

const formSchema = z.object({
  cashSales: z.boolean(),
  chargeSales: z.boolean(),
  date: z.string().min(1, "Date is required"),
  registeredName: z.string().min(1, "Registered name is required"),
  tinNumber: z.string().min(1, "TIN number is required"),
  businessAddress: z.string().min(1, "Business address is required"),
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
        <em className="text-xs text-red-500">
          {field.state.meta.errors[0].message}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export default function InvoiceForm() {
  const [isVat, setIsVat] = useState(true);
  const form = useForm({
    defaultValues: {
      cashSales: false,
      chargeSales: false,
      date: new Date().toISOString().split("T")[0],
      registeredName: "",
      tinNumber: "",
      businessAddress: "",
      items: [
        {
          name: "",
          price: 0,
          quantity: 0,
        },
      ] as { name: string; price: number; quantity: number }[],
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
    validators: {
      onSubmit: formSchema,
    },
  });

  // useEffect(() => {
  //   form.store.subscribe(() => {
  //     console.log(form.store.state.values.items);
  //   });
  // }, [form.store]);

  return (
    <div className="px-4">
      <p className="mb-5 text-center text-3xl font-bold uppercase">
        {isVat ? "VAT" : "Non-VAT"} Invoice Form
      </p>
      <div className="mb-5 flex items-center justify-between">
        <Label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isVat}
            onChange={(e) => setIsVat(e.target.checked)}
          />
          <span className="block text-xs uppercase">VAT</span>
        </Label>
        <p className="text-xs text-gray-500">Invoice No: 123456</p>
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
          <div className="space-y-5">
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
        <div className="space-y-3">
          <p className="text-lg font-bold uppercase">Items:</p>
          <form.Field name="items" mode="array">
            {(field) => {
              return (
                <div className="flex flex-col space-y-3">
                  <FieldInfo field={field} />
                  {field.state.value.map((_, index) => (
                    <div key={index} className="flex items-center gap-5 py-2">
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
                                  subField.handleChange(e.target.valueAsNumber)
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
                                  subField.handleChange(e.target.valueAsNumber)
                                }
                                className="w-20"
                              />
                            </Label>
                            <FieldInfo field={subField} />
                          </div>
                        )}
                      </form.Field>
                      <form.Subscribe selector={(state) => state.values.items}>
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
                  <Button
                    onClick={() =>
                      field.pushValue({
                        name: "",
                        price: 0,
                        quantity: 0,
                      })
                    }
                    className="self-start"
                  >
                    + Add New Item
                  </Button>
                </div>
              );
            }}
          </form.Field>
        </div>
        <hr className="my-5 border-black" />
        <Button
          onClick={() => form.handleSubmit()}
          className="mb-5 h-14 w-full bg-green-500 uppercase"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
