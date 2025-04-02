import { lazy, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LoaderCircle } from "lucide-react";

const InvoiceForm = lazy(() => import("./invoice-form"));

export default function AddInvoice() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button>+ New Invoice</Button>
      </SheetTrigger>
      <SheetContent side="right" className="overflow-auto sm:max-w-5xl">
        <SheetHeader className="text-center">
          <SheetTitle>Create New Invoice</SheetTitle>
          <SheetDescription>
            Fill out the form below to create a new invoice.
          </SheetDescription>
        </SheetHeader>
        <Suspense fallback={<LoaderCircle className="animate-spin" />}>
          <InvoiceForm handleClose={handleClose} />
        </Suspense>
      </SheetContent>
    </Sheet>
  );
}
