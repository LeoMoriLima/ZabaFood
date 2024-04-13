import AboutPage from "../components/AboutPage.js";
import FooterMain from "../components/FooterMain.js";
import HeaderMain from "../components/HeaderMain.js";

export default () => {
    const page = document.createElement("div");
    
    page.appendChild(HeaderMain());
    page.appendChild(AboutPage());
    page.appendChild(FooterMain());

    return page;
}