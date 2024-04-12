import NavMain from "./NavMain.js";

export default () => {
    const headerMain = document.createElement("header");
    headerMain.classList.add("header-main");

    headerMain.appendChild(NavMain())

    return headerMain;
}