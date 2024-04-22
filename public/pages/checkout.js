import HeaderMain from "../components/HeaderMain.js";
import CheckoutPage from "../components/CheckoutPage.js";
import FooterMain from "../components/FooterMain.js";
import MessageContainer from "../components/MessageContainer.js";

export default async () => {
    document.title = "Checkout | ZabaFood";

    const page = document.createElement("div");
    page.classList.add("page-checkout-div");
    page.appendChild(MessageContainer());
    page.appendChild(await HeaderMain());
    page.appendChild(await CheckoutPage());
    page.appendChild(FooterMain());

    return page;
}