import { StyleSheet } from "@react-pdf/renderer";

export const nonVatStyles = StyleSheet.create({
  page: {
    padding: 15,
    fontSize: 9,
    fontFamily: "Helvetica",
  },
  invoiceContainer: {
    border: "1px solid #ccc",
    padding: 15,
  },
  invoiceHeader: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
  },
  topHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottom: "1px solid #ccc",
    paddingBottom: 5,
  },
  companyInfo: {
    display: "flex",
    flexDirection: "row",
    flex: 2,
  },
  logo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  companyDetails: {
    fontSize: 9,
    lineHeight: 1.3,
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  invoiceDetails: {
    width: "35%", // Increased from 28% to give more space
    textAlign: "right",
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 4,
  },
  invoiceTitle: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 3,
    textAlign: "center",
    padding: 3,
    backgroundColor: "#ddd",
  },
  invoiceNumber: {
    marginBottom: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  invoiceInfoRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2px 0",
    borderBottom: "1px dotted #ccc",
  },
  invoiceInfoLabel: {
    fontWeight: "bold",
    fontSize: 8,
    width: "40%", // Added fixed width for labels
    textAlign: "left", // Changed from default to left
  },
  invoiceInfoValue: {
    width: "60%", // Added fixed width for values
    textAlign: "left",
    fontSize: 8,
    paddingLeft: 5, // Added some padding
    wordBreak: "break-word", // Ensures long text wraps
  },
  customerInfo: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
  soldTo: {
    flex: 1,
    border: "1px solid #ccc",
    padding: 8,
    marginRight: 10,
    height: 110,
  },
  shipTo: {
    flex: 1,
    border: "1px solid #ccc",
    padding: 8,
    height: 110,
  },
  infoTitle: {
    fontWeight: "bold",
    marginBottom: 3,
    fontSize: 9,
  },
  addressSpace: {
    height: 60,
    borderBottom: "1px dotted #ccc",
    marginBottom: 5,
  },
  contactsRow: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  contactBox: {
    flex: 1,
    border: "1px solid #ccc",
    padding: 5,
    marginRight: 5,
    fontSize: 8,
    height: 40,
  },
  invoiceTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 0,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    border: "1px solid #ccc",
    padding: 4,
    textAlign: "left",
    fontSize: 8,
  },
  tableCell: {
    border: "1px solid #ccc",
    padding: 4,
    textAlign: "left",
    fontSize: 8,
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  specialInstructionsTitle: {
    fontWeight: "bold",
    marginBottom: 2,
    fontSize: 8,
  },
  specialInstructionsContent: {
    height: 30,
  },
  termsConditions: {
    fontSize: 7,
    lineHeight: 1.2,
    margin: "5px 0",
    border: "1px solid #ccc",
    padding: 8,
  },
  termsConditionsTitle: {
    fontWeight: "bold",
    textDecoration: "underline",
    marginBottom: 0,
    textAlign: "center",
  },
  paymentInfo: {
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "10px 0",
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: "5px 0",
    border: "1px solid #ccc",
    fontSize: 8,
  },
  signatures: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTop: "1px solid #ccc",
    paddingTop: 10,
  },
  signatureCol: {
    flex: 1,
    padding: "0 5px",
    fontSize: 8,
    display: "flex",
    flexDirection: "column",
  },
  signatureText: {
    marginBottom: 3,
    textAlign: "left",
    fontSize: 8,
    lineHeight: 1.2,
  },
  signatureLine: {
    borderTop: "1px solid #000",
    marginTop: 15,
    marginBottom: 3,
    width: "100%",
  },
  signatureLabel: {
    fontSize: 8,
    textAlign: "center",
  },
  nonVatNotice: {
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 8,
    padding: 3,
    textDecoration: "underline",
  },
});
