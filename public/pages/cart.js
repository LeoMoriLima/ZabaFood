import CartPage from "../components/CartPage.js";
import FooterMain from "../components/FooterMain.js";
import HeaderMain from "../components/HeaderMain.js";

export default async () => {
    const page = document.createElement("div");
    page.appendChild(await HeaderMain());
    page.appendChild(await CartPage());
    page.appendChild(FooterMain());
    return page;
}