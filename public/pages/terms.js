import FooterMain from "../components/FooterMain.js";
import HeaderMain from "../components/HeaderMain.js";
import TermsPage from "../components/TermsPage.js";
import MessageContainer from "../components/MessageContainer.js";

export default async () => {
    document.title = "Termos | ZabaFood";
    
    const page = document.createElement("div");
    page.appendChild(MessageContainer());
    page.appendChild(await HeaderMain());
    page.appendChild(TermsPage());
    page.appendChild(FooterMain());

    return page;
}