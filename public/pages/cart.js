import CartPage from "../components/CartPage.js";
import FooterMain from "../components/FooterMain.js";
import HeaderMain from "../components/HeaderMain.js";
import MessageContainer from "../components/MessageContainer.js";

export default async () => {
    document.title = "Carrinho | ZabaFood";

    const page = document.createElement("div");
    page.appendChild(MessageContainer());
    page.appendChild(await HeaderMain());
    page.appendChild(await CartPage());
    page.appendChild(FooterMain());
    return page;
}