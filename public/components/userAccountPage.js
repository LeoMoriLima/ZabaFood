import ButtonComponent from "./ButtonComponent.js";
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

    const aOrders = document.createElement("a");
    const aOrdersIcon = document.createElement("img")
    aOrdersIcon.src = "../assets/images/bag-icon.svg"
    aOrders.appendChild(aOrdersIcon)
    const ordersText = document.createElement("span")
    ordersText.innerText = "Meus pedidos"
    aOrders.appendChild(ordersText)
    aOrders.classList.add("a-orders");
    aOrders.classList.add("nav-menu-user-page-selected")
    navMenuUserPage.appendChild(aOrders);

    const aSettings = document.createElement("a");
    const aSettingsIcon = document.createElement("img")
    aSettingsIcon.src = "../assets/images/settings-icon.svg"
    aSettings.appendChild(aSettingsIcon)
    const settingsText = document.createElement("span")
    settingsText.innerText = "Configurações"
    aSettings.appendChild(settingsText)
    aSettings.classList.add("a-settings");
    navMenuUserPage.appendChild(aSettings);

    aOrders.addEventListener("click", () => {
        aOrders.classList.add("nav-menu-user-page-selected")
        aSettings.classList.remove("nav-menu-user-page-selected")
    })

    aSettings.addEventListener("click", () => { 
        aSettings.classList.add("nav-menu-user-page-selected")
        aOrders.classList.remove("nav-menu-user-page-selected")
    })

    userPageDiv.appendChild(await orderPageDiv());

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