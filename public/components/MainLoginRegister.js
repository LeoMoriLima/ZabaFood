import DivLoginRegister from "./DivLoginRegister.js";

export default () =>{
    const mainLogin = document.createElement("main");
    mainLogin.classList.add("main-login");
    mainLogin.appendChild(DivLoginRegister());

    return mainLogin;
}