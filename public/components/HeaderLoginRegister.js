import NavLoginRegister from "./NavLoginRegister.js";

export default () => {
    const headerLogin = document.createElement("header");
    headerLogin.appendChild(NavLoginRegister());
    headerLogin.classList.add('header-login');

    return headerLogin;
}