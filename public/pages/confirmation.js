import HeaderMain from "../components/HeaderMain.js";
import ConfirmationPage from "../components/ConfirmationPage.js";
import FooterMain from "../components/FooterMain.js";
import MessageContainer from "../components/MessageContainer.js";

export default async () => {
    document.title = "Confirmação | ZabaFood";

    const page = document.createElement("div");
    page.appendChild(MessageContainer());
    page.appendChild(await HeaderMain());
    page.appendChild(ConfirmationPage());
    page.appendChild(FooterMain());

    return page;
}