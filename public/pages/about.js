import AboutPage from "../components/AboutPage.js";
import FooterMain from "../components/FooterMain.js";
import HeaderMain from "../components/HeaderMain.js";
import MessageContainer from "../components/MessageContainer.js";

export default async () => {
    document.title = "Sobre | ZabaFood";

    const page = document.createElement("div");
    page.appendChild(MessageContainer());
    page.appendChild(await HeaderMain());
    page.appendChild(AboutPage());
    page.appendChild(FooterMain());

    return page;
}