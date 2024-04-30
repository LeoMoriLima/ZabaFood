import FooterMain from "../components/FooterMain.js";
import HeaderMain from "../components/HeaderMain.js";
import PolicyPage from "../components/PolicyPage.js";
import MessageContainer from "../components/MessageContainer.js";

export default async () => {
    document.title = "Política de privacidade | ZabaFood";

    const page = document.createElement("div");
    page.appendChild(MessageContainer());
    page.appendChild(await HeaderMain());
    page.appendChild(PolicyPage());
    page.appendChild(FooterMain());

    return page;
}