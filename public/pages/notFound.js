export default () => {
    document.title = "Não encontrado | ZabaFood";

    const page = document.createElement("div");

    const p = document.createElement("p");
    p.innerText = "Página 404";
    page.appendChild(p);

    return page;
}