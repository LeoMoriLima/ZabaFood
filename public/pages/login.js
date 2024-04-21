import HeaderLoginRegister from "../components/HeaderLoginRegister.js";
import MainLogin from "../components/MainLogin.js";

export default () => {
    document.title = "Login | ZabaFood";

    const page = document.createElement("div");
    page.appendChild(HeaderLoginRegister());
    page.appendChild(MainLogin());

    return page;
}