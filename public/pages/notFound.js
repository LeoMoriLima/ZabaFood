import MessageContainer from "../components/MessageContainer.js";

export default () => {
    document.title = "Não encontrado | ZabaFood";

    const page = document.createElement("div");
    page.appendChild(MessageContainer());
    const p = document.createElement("p");
    p.innerText = "Página 404";
    page.appendChild(p);

    return page;
}