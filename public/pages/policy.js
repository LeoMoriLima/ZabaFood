import FooterMain from "../components/FooterMain.js";
import HeaderMain from "../components/HeaderMain.js";
import PolicyPage from "../components/PolicyPage.js";

export default () =>{
    const page = document.createElement("div");

    page.appendChild(HeaderMain());
    page.appendChild(PolicyPage());
    page.appendChild(FooterMain())

    return page;
}