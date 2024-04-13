import FooterMain from "../components/FooterMain.js";
import HeaderMain from "../components/HeaderMain.js";
import contactPage from "../components/contactPage.js";

export default () => {
    const page = document.createElement("div");
    page.appendChild(HeaderMain())
    page.appendChild(contactPage())
    page.appendChild(FooterMain());

    return page;
}