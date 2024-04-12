import HeaderLoginRegister from "../components/HeaderLoginRegister.js";
import MainLoginRegister from "../components/MainLogin.js";
import buttonGray from "../components/buttonGray.js";
import divInput from "../components/inputEntry.js";

export default () => {
    const page = document.createElement("div");
    
    page.appendChild(HeaderLoginRegister());
    page.appendChild(MainLoginRegister());

    return page;
}