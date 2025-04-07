import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  PDFViewer,
} from "@react-pdf/renderer";
import { Receipt } from "@/lib/types";
import NonVatInvoicePDF from "./invoice-pdf/non-vat";



export default function PreviewInvoice({invoice}: { invoice: Receipt }) {
    return (
        <Sheet>
        <SheetTrigger asChild>
            <Button className="rounded-full cursor-pointer hover:scale-105">Preview Invoice</Button>
        </SheetTrigger>
        <SheetContent side="left" className="overflow-auto sm:max-w-3xl">
            <SheetHeader className="text-center sr-only">
            <SheetTitle>Preview Invoice</SheetTitle>
            <SheetDescription>
                This is a preview of the invoice. You can download it as a PDF or print it.
            </SheetDescription>
            </SheetHeader>
            <PDFViewer className="h-screen w-full">
                <NonVatInvoicePDF data={invoice}  />
            </PDFViewer>
        </SheetContent>
        </Sheet>
    );
}