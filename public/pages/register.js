export default () => {
    const page = document.createElement("div");

    const p = document.createElement("p");
    p.innerText = "Página Registro";
    page.appendChild(p);

    return page;
}