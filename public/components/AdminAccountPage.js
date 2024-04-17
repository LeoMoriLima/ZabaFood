import AdminAddProductPage from "./AdminAddProductPage.js";
import ButtonComponent from "./ButtonComponent.js";

export default async () => {
    const adminPageDiv = document.createElement("div");
    adminPageDiv.classList.add("admin-page-div");

    const leftMenuAdminPage = document.createElement("div");
    leftMenuAdminPage.classList.add("left-menu-admin-page");
    adminPageDiv.appendChild(leftMenuAdminPage);

    const navMenuAdminPage = document.createElement("nav");
    navMenuAdminPage.classList.add("nav-menu-admin-page");
    leftMenuAdminPage.appendChild(navMenuAdminPage);

    const aAddProduct = document.createElement("a");
    aAddProduct.innerText = "Adicionar Produto";
    aAddProduct.classList.add("a-add-product");
    navMenuAdminPage.appendChild(aAddProduct);

    const aAllProduct = document.createElement("a");
    aAllProduct.innerText = "Modificar Produto";
    aAllProduct.classList.add("a-all-product");
    navMenuAdminPage.appendChild(aAllProduct);

    adminPageDiv.appendChild(await AdminAddProductPage());

    leftMenuAdminPage.appendChild(ButtonComponent("SAIR", 'exit-button', async () => {
        try{
            const response = await fetch('/logout', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch(error){
            console.error("Erro ao fazer a requisição");
            throw new Error ("Erro ao fazer a requisição!");
        } finally {
            window.route({ preventDefault: () => {}, target: { href: "/" } });
        }
    }));

    return adminPageDiv;
}