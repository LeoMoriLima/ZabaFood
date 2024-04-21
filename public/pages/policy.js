import FooterMain from "../components/FooterMain.js";
import HeaderMain from "../components/HeaderMain.js";
import PolicyPage from "../components/PolicyPage.js";

export default async () =>{
    document.title = "Política de privacidade | ZabaFood";

    const page = document.createElement("div");
    page.appendChild(await HeaderMain());
    page.appendChild(PolicyPage());
    page.appendChild(FooterMain())

    return page;
}