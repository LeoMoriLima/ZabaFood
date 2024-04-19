import NavMain from "./NavMain.js";

export default async () => {
    const headerMain = document.createElement("header");
    headerMain.classList.add("header-main");

    headerMain.appendChild(await NavMain());

    return headerMain;
}