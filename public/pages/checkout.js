import HeaderMain from "../components/HeaderMain.js";
import CheckoutPage from "../components/CheckoutPage.js";
import FooterMain from "../components/FooterMain.js";

export default async () => {
    const page = document.createElement("div");
    
    page.appendChild(await HeaderMain());
    page.appendChild(await CheckoutPage());
    page.appendChild(FooterMain());

    return page;
}