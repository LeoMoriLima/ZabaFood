import AdminAddProductPage from "./AdminAddProductPage.js";
import ButtonComponent from "./ButtonComponent.js";
import router from "../js/routes.js";
import AdminModifyProductPage from "./AdminModifyProductPage.js";
import AdminProductTypePage from "./AdminProductTypePage.js";
import AdminOrderPage from "./AdminOrderPage.js";

export default async () => {
    const adminPageDiv = document.createElement("div");
    adminPageDiv.classList.add("admin-page-div");

    const leftMenuAdminPage = document.createElement("div");
    leftMenuAdminPage.classList.add("left-menu-admin-page");
    adminPageDiv.appendChild(leftMenuAdminPage);

    const navMenuAdminPage = document.createElement("nav");
    navMenuAdminPage.classList.add("nav-menu-admin-page");
    leftMenuAdminPage.appendChild(navMenuAdminPage);

    const adminAddProductContent = await AdminAddProductPage();
    adminAddProductContent.style.display = "flex";

    let adminModifyProductContent;

    const adminProductTypeContent = await AdminProductTypePage();
    adminProductTypeContent.style.display = "none";

    let adminOrderContent;

    // const adminOrderContent = await AdminOrderPage();
    // adminOrderContent.style.display = "none";

    const aAddProduct = document.createElement("a");
    aAddProduct.classList.add("a-add-product");
    aAddProduct.classList.add("nav-menu-admin-page-selected");
    const aAddProductIcon = document.createElement("img");
    aAddProductIcon.src = "/assets/images/plus-icon.svg";
    aAddProductIcon.classList.add("a-icon-admin-account-page");
    aAddProduct.appendChild(aAddProductIcon);
    const addProductText = document.createElement("span");
    addProductText.innerText = "Adicionar produto";
    aAddProduct.appendChild(addProductText);
    navMenuAdminPage.appendChild(aAddProduct);

    const aAllProduct = document.createElement("a");
    const aAllProductIcon = document.createElement("img");
    aAllProductIcon.src = "/assets/images/book-open-icon.svg";
    aAllProductIcon.classList.add("a-icon-admin-account-page");
    aAllProduct.appendChild(aAllProductIcon);
    const allProductText = document.createElement("span");
    allProductText.innerText = "Produtos cadastrados";
    aAllProduct.appendChild(allProductText);
    aAllProduct.classList.add("a-all-product");
    navMenuAdminPage.appendChild(aAllProduct);

    const aAllProductType = document.createElement("a");
    const aAllProductTypeIcon = document.createElement("img");
    aAllProductTypeIcon.src = "/assets/images/product-type-icon.svg";
    aAllProductTypeIcon.classList.add("a-icon-admin-account-page");
    aAllProductType.appendChild(aAllProductTypeIcon);
    const allProductTypeText = document.createElement("span");
    allProductTypeText.innerText = "Tipos de produtos";
    aAllProductType.appendChild(allProductTypeText);
    aAllProductType.classList.add("a-all-product-type");
    navMenuAdminPage.appendChild(aAllProductType);

    const aOrder = document.createElement("a");
    const aOrderIcon = document.createElement("img");
    aOrderIcon.classList.add("a-icon-admin-account-page");
    aOrderIcon.src = "/assets/images/notes-icon.svg";
    aOrder.appendChild(aOrderIcon);
    const aOrderText = document.createElement("span");
    aOrderText.innerText = "Pedidos";
    aOrder.appendChild(aOrderText);
    aOrder.classList.add("a-all-product-type");
    navMenuAdminPage.appendChild(aOrder);

    aAddProduct.addEventListener("click", () => {
        if (adminModifyProductContent) {
            adminModifyProductContent.remove();
        }
        if (adminOrderContent) {
            adminOrderContent.remove();
        }
        adminAddProductContent.style.display = "flex";
        adminProductTypeContent.style.display = "none";
        aAddProduct.classList.add("nav-menu-admin-page-selected");
        aAllProduct.classList.remove("nav-menu-admin-page-selected");
        aAllProductType.classList.remove("nav-menu-admin-page-selected");
        aOrder.classList.remove("nav-menu-admin-page-selected");
    })

    aAllProduct.addEventListener("click", async () => {

        if (!adminModifyProductContent === "") {
            adminModifyProductContent.remove();
        }
        if (adminOrderContent) {
            adminOrderContent.remove();
        }
        if (aAllProduct.classList.contains("nav-menu-admin-page-selected")) {
            return;
        }

        adminModifyProductContent = await AdminModifyProductPage();
        adminPageDiv.appendChild(adminModifyProductContent);
        adminModifyProductContent.style.display = "flex";
        adminAddProductContent.style.display = "none";
        adminProductTypeContent.style.display = "none";
        aAllProduct.classList.add("nav-menu-admin-page-selected");
        aAddProduct.classList.remove("nav-menu-admin-page-selected");
        aAllProductType.classList.remove("nav-menu-admin-page-selected");
        aOrder.classList.remove("nav-menu-admin-page-selected");
    })

    aAllProductType.addEventListener("click", () => {
        if (adminModifyProductContent) {
            adminModifyProductContent.remove();
        }
        if (adminOrderContent) {
            adminOrderContent.remove();
        }
        adminProductTypeContent.style.display = "flex";
        adminAddProductContent.style.display = "none";
        aAllProductType.classList.add("nav-menu-admin-page-selected");
        aAllProduct.classList.remove("nav-menu-admin-page-selected");
        aAddProduct.classList.remove("nav-menu-admin-page-selected");
        aOrder.classList.remove("nav-menu-admin-page-selected");
    })

    aOrder.addEventListener("click", async () => {
        if (adminModifyProductContent) {
            adminModifyProductContent.remove();
        }
        if (!adminOrderContent === "") {
            adminOrderContent.remove();
        }
        if (aOrder.classList.contains("nav-menu-admin-page-selected")) {
            return;
        }
        
        adminOrderContent = await AdminOrderPage();
        adminPageDiv.appendChild(adminOrderContent);
        adminOrderContent.style.display = "flex";
        adminProductTypeContent.style.display = "none";
        adminAddProductContent.style.display = "none";
        aOrder.classList.add("nav-menu-admin-page-selected");
        aAllProductType.classList.remove("nav-menu-admin-page-selected");
        aAllProduct.classList.remove("nav-menu-admin-page-selected");
        aAddProduct.classList.remove("nav-menu-admin-page-selected");
    })

    adminPageDiv.appendChild(adminAddProductContent);
    adminPageDiv.appendChild(adminProductTypeContent);

    leftMenuAdminPage.appendChild(ButtonComponent("SAIR", 'exit-button', async () => {
        try {
            const response = await fetch('/api/logout', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.error("Erro ao fazer a requisição");
            throw new Error("Erro ao fazer a requisição!");
        } finally {
            router.navigate("/");
        }
    }));

    return adminPageDiv;
}