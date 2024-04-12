import DivRegister from "./DivRegister.js";

export default () => {
    const mainRegister = document.createElement("main");
    mainRegister.classList.add("main-entry");
    mainRegister.appendChild(DivRegister());

    return mainRegister;
}