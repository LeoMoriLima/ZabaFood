import HeaderLoginRegister from "../components/HeaderLoginRegister.js";
import MainLoginRegister from "../components/MainLoginRegister.js";
import buttonGray from "../components/buttonGray.js";
import divInput from "../components/inputEntry.js";

export default () => {
    const page = document.createElement("div");
    
    page.appendChild(HeaderLoginRegister());
    page.appendChild(MainLoginRegister());

    const divEntry = document.getElementById("entry-card")
    
    divEntry.appendChild(divInput("Usuário", "text", "user-input", "user-icon"))
    divEntry.appendChild(divInput("Senha", "password", "password-input", "password-icon"));
    divEntry.appendChild(buttonGray("Entrar", "button-login"));
    

    return page;
}