import { format } from "date-fns";
import { type RouterOutputs } from "~/utils/api";
import {
  Document,
  Image,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

const config = {
  primaryColor: "#002C71",
  primaryRGB: [0, 44, 113],
  accentColor: "#F3B229",
  blackColor: "#000000",
  grayColor: "#444444",
  lightGrayColor: "#777777",
  sectionTitleFontSize: 13,
  fieldTitleFontSize: 11,
  normalFontSize: 10,
  fontFamily: "Lato",
  dateFormat: "MMMM DD, YYYY",
};
const styles = StyleSheet.create({
  page: { backgroundColor: "white" },
  section: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 16,
    marginTop: 16,
  },
  h1: {
    fontSize: 26,
    lineHeight: 1,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontStyle: "italic",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: config.primaryColor,
    color: "#fff",
    padding: 3,
  },
  body: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 3px",
    fontSize: "12px",
  },
  cellNo: {
    fontWeight: "heavy",
    white: "#fff",
    textTransform: "capitalize",
    width: "6%",
    fontSize: config.normalFontSize,
  },
  cellName: {
    fontWeight: "heavy",
    white: "#fff",
    textTransform: "capitalize",
    width: "15%",
    fontSize: config.normalFontSize,
  },
  cellCategory: {
    fontWeight: "heavy",
    white: "#fff",
    textTransform: "capitalize",
    width: "15%",
    fontSize: config.normalFontSize,
  },
  cellDesc: {
    fontWeight: "heavy",
    white: "#fff",
    textTransform: "capitalize",
    width: "35%",
    fontSize: config.normalFontSize,
  },
  cellPrice: {
    fontWeight: "heavy",
    white: "#fff",
    textTransform: "capitalize",
    width: "15%",
    fontSize: config.normalFontSize,
  },
});

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

type Props = {
  data: RouterOutputs["sale"]["getById"];
};

export default function PdfPreview({ data }: Props): JSX.Element {
  // TODO: TypeScript is yelling when i tried nested-destructured the data

  const { orderNumber, dateOrdered, company, orderItems } = data ?? {};

  const companyName = company?.name;
  const address = company?.address;
  const { street, village, district, regency, province, postalCode } =
    address ?? {};

  return (
    <PDFViewer width="100%" height="650px">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <View
              style={{ position: "relative", height: "100px", width: "100px" }}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image src="/img/logo.jpeg" />
            </View>

            <View style={{ lineHeight: "1.25px" }}>
              <Text style={styles.h1}>rekayasa kendali industri</Text>
              <Text
                style={{
                  fontSize: "16px",
                  marginTop: "4px",
                  fontStyle: "italic",
                }}
              >
                Automation Control and Project Support Solutions
              </Text>
              <Text style={{ fontSize: "12px" }}>Capital Eight</Text>
              <View style={{ fontSize: "10px" }}>
                <Text>
                  Jalan Duren Tiga Selatan No. 8, RT/RW. 004/002, Jakarta
                  Selatan 12760
                </Text>
                <Text>Phone/Fax: +62 21 7991183, HP: +62 811 978 8315</Text>
                <Text>Email: info@rekayasakendali.com</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: "16px", paddingHorizontal: "40px" }}>
            <Text
              style={{
                textTransform: "uppercase",
                borderWidth: "2px",
                borderColor: "grey",
                paddingVertical: "4px",
                textAlign: "center",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              q u o t a t i o n
            </Text>
          </View>

          <View
            style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: "40px",
            }}
          >
            <View style={{ width: "33.333333%" }}>
              <Text
                style={{
                  fontSize: "12px",
                }}
              >
                To
              </Text>
              <Text
                style={{
                  marginTop: "4px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {companyName}
              </Text>
              <Text
                style={{
                  marginTop: "4px",
                  fontSize: "10px",
                  textTransform: "capitalize",
                }}
              >
                {street} {village} {district}
              </Text>
              <Text
                style={{
                  marginTop: "4px",
                  fontSize: "10px",
                  textTransform: "capitalize",
                }}
              >
                {regency} {province}
              </Text>
              <Text
                style={{
                  marginTop: "4px",
                  fontSize: "10px",
                  textTransform: "capitalize",
                }}
              >
                {postalCode}
              </Text>
            </View>

            <View style={{ width: "33.333333%" }}>
              <View
                style={{
                  fontSize: "10px",
                  fontWeight: "bold",
                  border: "2px",
                  borderColor: "grey",
                  padding: "2px",
                }}
              >
                <Text>NUM : {orderNumber}</Text>
                <Text>DATE : {format(dateOrdered as Date, "dd/MM/yyyy")}</Text>
              </View>
              {/* <View style={{ marginTop: "16px" }}> */}
              {/*   <Text */}
              {/*     style={{ */}
              {/*       marginTop: "4px", */}
              {/*       fontSize: "10px", */}
              {/*     }} */}
              {/*   > */}
              {/*     REFFERENCE */}
              {/*   </Text> */}
              {/*   <View */}
              {/*     style={{ */}
              {/*       fontSize: "10px", */}
              {/*       display: "flex", */}
              {/*       flexDirection: "row", */}
              {/*       columnGap: 8, */}
              {/*     }} */}
              {/*   > */}
              {/*     <Text>INQ NUM :</Text> */}
              {/*     <Text>By Email</Text> */}
              {/*   </View> */}
              {/*   <View */}
              {/*     style={{ */}
              {/*       fontSize: "10px", */}
              {/*       display: "flex", */}
              {/*       flexDirection: "row", */}
              {/*       columnGap: 8, */}
              {/*     }} */}
              {/*   > */}
              {/*     <Text>INQ DATE :</Text> */}
              {/*     <Text>-</Text> */}
              {/*   </View> */}
              {/* </View> */}
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: "10px",
              marginTop: "16px",
            }}
          >
            <View style={{ width: "100%" }}>
              <View style={styles.header}>
                <Text style={styles.cellNo}>no</Text>
                <Text style={styles.cellName}>Name</Text>
                <Text style={styles.cellCategory}>Category</Text>
                <Text style={styles.cellDesc}>description</Text>
                <Text style={styles.cellNo}>qty</Text>
                <Text style={styles.cellNo}>unit</Text>
                <Text style={styles.cellPrice}>price</Text>
                <Text style={styles.cellPrice}>amount</Text>
              </View>
              <View style={styles.body}>
                {orderItems?.map((item, index) => {
                  const {
                    id,
                    quantity,
                    description,
                    product: { name, category, uom, salePrice },
                  } = item;
                  const amount = quantity * salePrice;
                  const formattedPrice = formatter.format(salePrice);
                  const formattedAmount = formatter.format(amount);
                  return (
                    <View style={styles.row} key={id}>
                      <Text style={styles.cellNo}>{index + 1}</Text>
                      <Text style={styles.cellName}>{name}</Text>
                      <Text style={styles.cellCategory}>{category}</Text>
                      <Text style={styles.cellDesc}>{description}</Text>
                      <Text style={styles.cellNo}>{quantity}</Text>
                      <Text style={styles.cellNo}>{uom}</Text>
                      <Text style={styles.cellPrice}>{formattedPrice}</Text>
                      <Text style={styles.cellPrice}>{formattedAmount}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
