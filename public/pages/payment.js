import HeaderMain from "../components/HeaderMain.js";
import PaymentPage from "../components/PaymentPage.js";
import FooterMain from "../components/FooterMain.js";

export default async () => {
    document.title = "Pagamento | ZabaFood";
    
    const page = document.createElement("div");
    page.appendChild(await HeaderMain());
    page.appendChild(await PaymentPage());
    page.appendChild(FooterMain());
    return page;
}