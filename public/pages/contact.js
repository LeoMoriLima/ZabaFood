import FooterMain from "../components/FooterMain.js";
import HeaderMain from "../components/HeaderMain.js";
import contactPage from "../components/ContactPage.js";
import MessageContainer from "../components/MessageContainer.js";

export default async () => {
    document.title = "Contatos | ZabaFood";

    const page = document.createElement("div");
    page.appendChild(MessageContainer());
    page.appendChild(await HeaderMain())
    page.appendChild(contactPage())
    page.appendChild(FooterMain());

    return page;
}