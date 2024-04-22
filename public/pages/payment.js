import HeaderMain from "../components/HeaderMain.js";
import PaymentPage from "../components/PaymentPage.js";
import FooterMain from "../components/FooterMain.js";
import MessageContainer from "../components/MessageContainer.js";

export default async () => {
    document.title = "Pagamento | ZabaFood";
    
    const page = document.createElement("div");
    page.classList.add("payment-page");
    page.appendChild(MessageContainer());
    page.appendChild(await HeaderMain());
    page.appendChild(await PaymentPage());
    page.appendChild(FooterMain());
    return page;
}