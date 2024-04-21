import HeaderMain from "../components/HeaderMain.js";
import PaymentConfirmationPage from "../components/PaymentConfirmationPage.js";
import FooterMain from "../components/FooterMain.js";

export default async () => {
    document.title = "Pagamento Confirmado | ZabaFood";

    const page = document.createElement("div");
    page.appendChild(await HeaderMain())
    page.appendChild(PaymentConfirmationPage())
    page.appendChild(FooterMain());

    return page;
}