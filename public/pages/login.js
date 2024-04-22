import HeaderLoginRegister from "../components/HeaderLoginRegister.js";
import MainLogin from "../components/MainLogin.js";
import MessageContainer from "../components/MessageContainer.js";

export default () => {
    document.title = "Login | ZabaFood";

    const page = document.createElement("div");
    page.appendChild(MessageContainer());
    page.appendChild(HeaderLoginRegister());
    page.appendChild(MainLogin());

    return page;
}