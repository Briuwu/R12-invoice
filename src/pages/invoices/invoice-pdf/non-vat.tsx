import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import { nonVatStyles } from "./non-vat-styling";
import { Receipt } from "@/lib/types";

import logo from "@/assets/logo.png";

const NonVatInvoicePDF = ({ data }: { data: Receipt }) => {
  const invoiceDate = new Date(data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const invoiceDue = new Date(data.due).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <Document>
      <Page size="A4" style={nonVatStyles.page}>
        <View style={nonVatStyles.invoiceContainer}>
          {/* Invoice Header - Now split into two sections */}
          <View style={nonVatStyles.invoiceHeader}>
            {/* Top part with company info and invoice details */}
            <View style={nonVatStyles.topHeader}>
              <View style={nonVatStyles.companyInfo}>
                <View style={nonVatStyles.logo}>
                  <Image src={logo} style={nonVatStyles.logo} />
                </View>
                <View style={nonVatStyles.companyDetails}>
                  <Text style={nonVatStyles.companyName}>
                    R12 EMS PHILS., INC.
                  </Text>
                  <Text>New Block 1 Lot 4 & 5, Calamba Premiere</Text>
                  <Text>International Park, Brgy. Batino, Calamba City</Text>
                  <Text>Laguna 4027</Text>
                  <Text>Telephone No. (045) 499-1257</Text>
                </View>
              </View>
              <View style={nonVatStyles.invoiceDetails}>
                <Text style={nonVatStyles.invoiceTitle}>SALES INVOICE</Text>
                <Text style={nonVatStyles.invoiceNumber}>
                  {data.invoiceNum}
                </Text>
                <View style={nonVatStyles.invoiceInfoRow}>
                  <Text style={nonVatStyles.invoiceInfoLabel}>DATE:</Text>
                  <Text style={nonVatStyles.invoiceInfoValue}>
                    {invoiceDate}
                  </Text>
                </View>
                <View style={nonVatStyles.invoiceInfoRow}>
                  <Text style={nonVatStyles.invoiceInfoLabel}>
                    PURCHASE ORDER:
                  </Text>
                  <Text style={nonVatStyles.invoiceInfoValue}>
                    {data.purchaseOrder}
                  </Text>
                </View>
                <View style={nonVatStyles.invoiceInfoRow}>
                  <Text style={nonVatStyles.invoiceInfoLabel}>
                    REFERENCE NO:
                  </Text>
                  <Text style={nonVatStyles.invoiceInfoValue}>
                    {data.invoiceNum}
                  </Text>
                </View>
                <View style={nonVatStyles.invoiceInfoRow}>
                  <Text style={nonVatStyles.invoiceInfoLabel}>
                    SALES ORDER NO.:
                  </Text>
                  <Text style={nonVatStyles.invoiceInfoValue}>
                    {data.salesOrder}
                  </Text>
                </View>
                <View style={nonVatStyles.invoiceInfoRow}>
                  <Text style={nonVatStyles.invoiceInfoLabel}>PAGE NO.:</Text>
                  <Text style={nonVatStyles.invoiceInfoValue}></Text>
                </View>
              </View>
            </View>

            {/* Customer Information - Below the company info */}
            <View style={nonVatStyles.customerInfo}>
              <View style={nonVatStyles.soldTo}>
                <Text style={nonVatStyles.infoTitle}>SOLD TO:</Text>
                <Text>{data.registeredName}</Text>
                <Text>TIN: {data.tinNumber}</Text>
                <Text>{data.businessAddress}</Text>
              </View>
              <View style={nonVatStyles.shipTo}>
                <Text style={nonVatStyles.infoTitle}>SHIP TO:</Text>
                <Text>{data.shipRegisteredName}</Text>
                <Text>{data.shipBusinessAddress}</Text>
              </View>
            </View>
          </View>

          {/* Contact Information */}
          <View style={nonVatStyles.contactsRow}>
            <View style={{ ...nonVatStyles.contactBox, marginRight: 5 }}>
              <Text style={nonVatStyles.infoTitle}>CONTACT PERSON</Text>
              <Text>{data.contactPerson}</Text>
            </View>
            <View style={{ ...nonVatStyles.contactBox, marginRight: 5 }}>
              <Text style={nonVatStyles.infoTitle}>SALESPERSON</Text>
              <Text>{data.salesPerson}</Text>
            </View>
            <View style={{ ...nonVatStyles.contactBox, marginRight: 5 }}>
              <Text style={nonVatStyles.infoTitle}>DUE DATE</Text>
              <Text>{invoiceDue}</Text>
            </View>
            <View style={{ ...nonVatStyles.contactBox, marginRight: 0 }}>
              <Text style={nonVatStyles.infoTitle}>PAYMENT TERMS</Text>
              <Text>{data.paymentTerms}</Text>
            </View>
          </View>

          {/* Invoice Items Table */}
          <View style={nonVatStyles.invoiceTable}>
            {/* Table Header */}
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={[nonVatStyles.tableHeader, { width: "10%" }]}>
                ITEM NO.
              </Text>
              <Text style={[nonVatStyles.tableHeader, { width: "50%" }]}>
                DESCRIPTION
              </Text>
              <Text style={[nonVatStyles.tableHeader, { width: "8%" }]}>
                QTY
              </Text>
              <Text style={[nonVatStyles.tableHeader, { width: "8%" }]}>
                UOM
              </Text>
              <Text style={[nonVatStyles.tableHeader, { width: "12%" }]}>
                UNIT PRICE
              </Text>
              <Text style={[nonVatStyles.tableHeader, { width: "12%" }]}>
                EXTENDED AMOUNT
              </Text>
            </View>

            {/* Table Rows */}
            {data.items.map((row, index) => (
              <View
                key={index}
                style={[
                  { display: "flex", flexDirection: "row" },
                  // index % 2 === 0 ? null : nonVatStyles.evenRow ,
                ]}
              >
                <Text style={[nonVatStyles.tableCell, { width: "10%" }]}>
                  {index + 1}
                </Text>
                <Text style={[nonVatStyles.tableCell, { width: "50%" }]}>
                  {row.name}
                </Text>
                <Text style={[nonVatStyles.tableCell, { width: "8%" }]}>
                  {row.quantity}
                </Text>
                <Text style={[nonVatStyles.tableCell, { width: "8%" }]}>
                  {row.uom}
                </Text>
                <Text style={[nonVatStyles.tableCell, { width: "12%" }]}>
                  {`${Number(row.price).toFixed(2)}`}
                </Text>
                <Text style={[nonVatStyles.tableCell, { width: "12%" }]}>
                  {`${Number(row.totalAmount).toFixed(2)}`}
                </Text>
              </View>
            ))}

            {/* Special Instructions and Totals */}
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View
                style={[nonVatStyles.tableCell, { width: "76%", height: 40 }]}
              >
                <Text style={nonVatStyles.specialInstructionsTitle}>
                  SPECIAL INSTRUCTIONS
                </Text>
                <Text style={nonVatStyles.specialInstructionsContent}>
                  {data.specialInstruction}
                </Text>
              </View>
              <Text
                style={[
                  nonVatStyles.tableCell,
                  { width: "12%", textAlign: "right", fontWeight: "bold" },
                ]}
              >
                TOTAL
              </Text>
              <Text
                style={[
                  nonVatStyles.tableCell,
                  { width: "12%", textAlign: "right" },
                ]}
              >
                {`${Number(data.receiptTotal).toFixed(2)}`}
              </Text>
            </View>
          </View>

          {/* Terms and Conditions - Condensed */}
          <View style={nonVatStyles.termsConditions}>
            <Text style={nonVatStyles.termsConditionsTitle}>
              TERMS AND CONDITIONS
            </Text>
            <View style={{ paddingLeft: 10 }}>
              <Text>THE TERMS AND CONDITIONS OF THIS SALE ARE AS FOLLOWS:</Text>
              <Text>1. THE PRICES HEREIN ARE BASED ON CASH PAYMENT.</Text>
              <Text>
                2. THIS INVOICE IS NOT VALID FOR CLAIMING INPUT TAX. P.D.
                OFFICE, CLARK FIELD, PAMPANGA.
              </Text>
              <Text>
                3. ALL ITEMS DELIVERED ARE CONDITIONAL SUBJECT TO AUTHORIZATION
                OF THE BUYER REPRESENTATIVE. INSPECTION PLATE BE MADE TO THE
                SELLER NOT LATER THAN 24 HOURS FROM RECEIPT/DELIVERY OF GOODS.
              </Text>
              <Text>
                4. TITLE TO THE GOODS WILL ONLY BE TRANSFERRED TO THE BUYER UPON
                RECEIPT OF FULL PAYMENT. SELLER RESERVES THE RIGHT TO REPOSSESS
                THE GOODS IF PAYMENT IS NOT RECEIVED WITHIN THE CREDIT TERM.
              </Text>
              <Text>
                5. WARRANTY PERIOD STARTS FROM THE DATE OF DELIVERY. THE COST OF
                REPAIR/REPLACEMENT UNDER WARRANTY MUST BE SHOULDERED BY THE
                BUYER.
              </Text>
              <Text>
                6. ATTORNEYS FEE OF NOT LESS THAN ONE-FIFTH OF THE TOTAL AMOUNT
                DUE SHALL BE PAID BY THE LOSING PARTY IN THE EVENT A COURT
                ACTION IS FILED BETWEEN THE PARTIES HERETO.
              </Text>
              <Text>
                7. NO DELIVERY, INSTALLATION, REFUND FOR CANCELLATION OF ORDERS
                MAY BE DONE WITHOUT THE PRIOR WRITTEN CONSENT OF THE SELLER.
              </Text>
              <Text>
                8. RECEIPT OF THE GOOD(S) COVERED BY THIS ORDER CONSTITUTES
                ACCEPTANCE OF THE GOODS EVEN THOUGH DESCRIPTION OR OTHER
                PARTICULARS OF THE GOODS DELIVERED MAY BE DIFFERENT FROM THOSE
                ORDERED.
              </Text>
              <Text>
                9. ALL CLAIMS FOR DEFECTIVE UNITS MUST BE MADE WITHIN 7 DAYS
                FROM RECEIPT OF GOODS.
              </Text>
              <Text>
                10. ALL CASH DISCOUNT OR SPECIAL ARRANGEMENT WILL BE MADE INTO
                THE CONSIDERATION OF THE SELLER - R12 EMS PHILS., INC.
              </Text>
            </View>
          </View>

          {/* Payment Information */}
          <View style={nonVatStyles.paymentInfo}>
            <Text>PLEASE MAKE CHECK PAYABLE TO R12 EMS PHILS., INC.</Text>
          </View>

          {/* Signatures - Modified to 3-column layout */}
          {/* Signatures - Modified to right-aligned */}
          <View style={nonVatStyles.signatures}>
            {/* Empty left column for spacing */}
            <View style={nonVatStyles.signatureColLeft}></View>

            {/* Right Column */}
            <View style={nonVatStyles.signatureColRight}>
              <Text style={nonVatStyles.signatureText}>
                Received the above goods and services in good order & condition.
              </Text>
              <Text style={nonVatStyles.signatureLine}></Text>
              <Text style={nonVatStyles.signatureLabel}>
                Customer's Signature Over Printed Name
              </Text>
            </View>
          </View>

          {/* Non-VAT Notice */}
          <Text style={nonVatStyles.nonVatNotice}>
            *THIS DOCUMENT IS NOT VALID FOR CLAIMING INPUT TAXES* THIS SALES
            INVOICE SHALL BE VALID FOR FIVE (5) YEARS FROM THE DATE OF ATP
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default NonVatInvoicePDF;
