import DivLogin from "./DivLogin.js";

export default () => {
    const mainLogin = document.createElement("main");
    mainLogin.classList.add("main-entry");
    mainLogin.appendChild(DivLogin());

    return mainLogin;
}