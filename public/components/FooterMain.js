import NavFooterMain from "./NavFooterMain.js";

export default () => {
    const footerMain = document.createElement("footer");
    footerMain.appendChild(NavFooterMain());

    return footerMain;
}