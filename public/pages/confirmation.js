import HeaderMain from "../components/HeaderMain.js";
import ConfirmationPage from "../components/ConfirmationPage.js";
import FooterMain from "../components/FooterMain.js";

export default async () => {
    const page = document.createElement("div");
    page.appendChild(await HeaderMain())
    page.appendChild(ConfirmationPage())
    page.appendChild(FooterMain());

    return page;
}