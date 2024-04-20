import AdminAddProductPage from "./AdminAddProductPage.js";
import ButtonComponent from "./ButtonComponent.js";
import router from "../js/routes.js";

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
    aAddProduct.classList.add("a-add-product");
    aAddProduct.classList.add("nav-menu-admin-page-selected")
    const aAddProductIcon = document.createElement("img")
    aAddProductIcon.src = "../assets/images/plus-icon.svg"
    aAddProduct.appendChild(aAddProductIcon)
    const addProductText = document.createElement("span")
    addProductText.innerText = "Adicionar produto"
    aAddProduct.appendChild(addProductText)
    navMenuAdminPage.appendChild(aAddProduct);

    const aAllProduct = document.createElement("a");
    const aAllProductIcon = document.createElement("img")
    aAllProductIcon.src = "../assets/images/book-open-icon.svg"
    aAllProduct.appendChild(aAllProductIcon)
    const allProductText = document.createElement("span")
    allProductText.innerText = "Produtos cadastrados"
    aAllProduct.appendChild(allProductText)
    aAllProduct.classList.add("a-all-product");
    navMenuAdminPage.appendChild(aAllProduct);

    aAddProduct.addEventListener("click", () => {
        aAddProduct.classList.add("nav-menu-admin-page-selected")
        aAllProduct.classList.remove("nav-menu-admin-page-selected")
    })

    aAllProduct.addEventListener("click", () => {
        aAllProduct.classList.add("nav-menu-admin-page-selected")
        aAddProduct.classList.remove("nav-menu-admin-page-selected")
    })

    adminPageDiv.appendChild(await AdminAddProductPage());

    leftMenuAdminPage.appendChild(ButtonComponent("SAIR", 'exit-button', async () => {
        try {
            const response = await fetch('/logout', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.error("Erro ao fazer a requisição");
            throw new Error("Erro ao fazer a requisição!");
        } finally {
            router.navigate("/")
        }
    }));

    return adminPageDiv;
}