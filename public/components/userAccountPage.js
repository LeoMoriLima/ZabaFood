import ButtonComponent from "./ButtonComponent.js";
import userAddressContent from "./userAddressContent.js";
import orderPageDiv from "./userOrdersContent.js";
import router from "../js/routes.js";

export default async () => {
    const userPageDiv = document.createElement("div");
    userPageDiv.classList.add("user-page-div");

    const leftMenuUserPage = document.createElement("div");
    leftMenuUserPage.classList.add("left-menu-user-page");
    userPageDiv.appendChild(leftMenuUserPage);

    const navMenuUserPage = document.createElement("nav");
    navMenuUserPage.classList.add("nav-menu-user-page");
    leftMenuUserPage.appendChild(navMenuUserPage);
    
    const addressContent = await userAddressContent();
    addressContent.style.display = "none";
    const orderContent = await orderPageDiv();

    const aOrders = document.createElement("a");
    const aOrdersIcon = document.createElement("img")
    aOrdersIcon.src = "../assets/images/bag-icon.svg"
    aOrders.appendChild(aOrdersIcon)

    const ordersText = document.createElement("span");
    ordersText.innerText = "Meus pedidos";
    aOrders.appendChild(ordersText);
    aOrders.classList.add("a-orders");
    aOrders.classList.add("nav-menu-user-page-selected");
    navMenuUserPage.appendChild(aOrders);

    const aAddress = document.createElement("a");
    const aAddressIcon = document.createElement("img");
    aAddressIcon.src = "../assets/images/address-icon.svg";
    aAddress.appendChild(aAddressIcon);

    const addressText = document.createElement("span");
    addressText.innerText = "Meus endereços";
    aAddress.appendChild(addressText);
    aAddress.classList.add("a-address");
    navMenuUserPage.appendChild(aAddress);

    const aSettings = document.createElement("a");
    const aSettingsIcon = document.createElement("img");
    aSettingsIcon.src = "../assets/images/settings-icon.svg";
    aSettings.appendChild(aSettingsIcon);
  
    const settingsText = document.createElement("span");
    settingsText.innerText = "Configurações";
    aSettings.appendChild(settingsText);
    aSettings.classList.add("a-settings");
    navMenuUserPage.appendChild(aSettings);

    aAddress.addEventListener("click", () =>{
        aAddress.classList.add("nav-menu-user-page-selected");
        aOrders.classList.remove("nav-menu-user-page-selected");
        aSettings.classList.remove("nav-menu-user-page-selected");
        addressContent.style.display = "flex";
        orderContent.style.display = "none";
    })

    aOrders.addEventListener("click", () => {
        aOrders.classList.add("nav-menu-user-page-selected");
        aSettings.classList.remove("nav-menu-user-page-selected");
        aAddress.classList.remove("nav-menu-user-page-selected");
        addressContent.style.display = "none"
        orderContent.style.display = "flex"
    })

    aSettings.addEventListener("click", () => { 
        aSettings.classList.add("nav-menu-user-page-selected");
        aOrders.classList.remove("nav-menu-user-page-selected");
        aAddress.classList.remove("nav-menu-user-page-selected");
    })

    userPageDiv.appendChild(orderContent);
    userPageDiv.appendChild(addressContent);

    leftMenuUserPage.appendChild(ButtonComponent("SAIR", 'exit-button', async () => {
        try {
            const response = await fetch('/logout', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (error) {
            console.error("Erro ao fazer a requisição");
            throw new error("Erro ao fazer a requisição!");
        } finally {
            router.navigate("/")
        };
    }))

    return userPageDiv;
}
