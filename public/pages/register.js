import HeaderLoginRegister from "../components/HeaderLoginRegister.js";
import MainRegister from "../components/MainRegister.js";
import MessageContainer from "../components/MessageContainer.js";

export default () => {
    document.title = "Registro | ZabaFood";

    const page = document.createElement("div");
    page.appendChild(MessageContainer());
    page.appendChild(HeaderLoginRegister());
    page.appendChild(MainRegister());

    return page;
}