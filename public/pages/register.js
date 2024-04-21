import HeaderLoginRegister from "../components/HeaderLoginRegister.js";
import MainRegister from "../components/MainRegister.js";

export default () => {
    document.title = "Registro | ZabaFood";

    const page = document.createElement("div");
    page.appendChild(HeaderLoginRegister());
    page.appendChild(MainRegister());

    return page;
}