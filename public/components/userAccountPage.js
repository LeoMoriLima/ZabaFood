import ButtonComponent from "./ButtonComponent.js";
import userAddressContent from "./userAddressContent.js";
import orderPageDiv from "./userOrdersContent.js";
import userSettingContent from "./userSettingContent.js";
import router from "../js/routes.js";
import LoadingComponent from "./LoadingComponent.js";

export default async () => {
    const userPageDiv = document.createElement("div");
    userPageDiv.classList.add("user-page-div");

    const leftMenuUserPage = document.createElement("div");
    leftMenuUserPage.classList.add("left-menu-user-page");
    userPageDiv.appendChild(leftMenuUserPage);

    const skeletonNavBar = document.createElement("div");
    skeletonNavBar.classList.add("div-info-user-page");
    skeletonNavBar.id = "skeleton-user-nav-bar";
    leftMenuUserPage.appendChild(skeletonNavBar);
    
    const loadingNavBar = LoadingComponent(3);
    skeletonNavBar.appendChild(loadingNavBar);

    setTimeout(async () => {
        const userId = await getUserId();
        const userData = await getUserInfo(userId);

        skeletonNavBar.remove();

        const divInfoUserPage = document.createElement("div");
        divInfoUserPage.classList.add("div-info-user-page");
        leftMenuUserPage.insertBefore(divInfoUserPage, leftMenuUserPage.firstChild);

        const divUserInfo = document.createElement("div");
        divUserInfo.classList.add("user-page-user-info");
        divInfoUserPage.appendChild(divUserInfo);

        const userIcon = document.createElement("img");
        userIcon.src = "/assets/images/menu-user-icon.svg";
        userIcon.classList.add("user-icon-menu-info");
        divUserInfo.appendChild(userIcon);

        const divTextUserInfo = document.createElement("div");
        divTextUserInfo.classList.add("user-text-info-div");
        divUserInfo.appendChild(divTextUserInfo);

        const helloText = document.createElement("p");
        helloText.classList.add("user-menu-hello-text");
        helloText.id = "user-info-show-account-page";
        helloText.innerText = "Olá, " + userData.name;
        divTextUserInfo.appendChild(helloText);
    
        const creditText = document.createElement("p");
        creditText.classList.add("p-credit-text");
        const value = Number(userData.credit_balance);
        const formattedValue = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        creditText.innerText = "Saldo : " + formattedValue;
        divTextUserInfo.appendChild(creditText);
    
        divInfoUserPage.appendChild(ButtonComponent("Adicionar crédito", "user-page-add-credit-button", () => {
            router.navigate("/payment");
        }));

        const addressContent = await userAddressContent();
        addressContent.style.display = "none";
        const orderContent = await orderPageDiv();
        const settingContent = await userSettingContent();
        settingContent.style.display = "none";

        userPageDiv.appendChild(orderContent);
        userPageDiv.appendChild(addressContent);
        userPageDiv.appendChild(settingContent);

        aAddress.addEventListener("click", () => {
            aAddress.classList.add("nav-menu-user-page-selected");
            aOrders.classList.remove("nav-menu-user-page-selected");
            aSettings.classList.remove("nav-menu-user-page-selected");
            addressContent.style.display = "flex";
            orderContent.style.display = "none";
            settingContent.style.display = "none";
        });
        
        aOrders.addEventListener("click", () => {
            aOrders.classList.add("nav-menu-user-page-selected");
            aSettings.classList.remove("nav-menu-user-page-selected");
            aAddress.classList.remove("nav-menu-user-page-selected");
            orderContent.style.display = "flex";
            addressContent.style.display = "none";
            settingContent.style.display = "none";
        });
        
        aSettings.addEventListener("click", () => { 
            aSettings.classList.add("nav-menu-user-page-selected");
            aOrders.classList.remove("nav-menu-user-page-selected");
            aAddress.classList.remove("nav-menu-user-page-selected");
            settingContent.style.display = "flex";
            addressContent.style.display = "none";
            orderContent.style.display = "none";
    })
    }, 0);

    const navMenuUserPage = document.createElement("nav");
    navMenuUserPage.classList.add("nav-menu-user-page");
    leftMenuUserPage.appendChild(navMenuUserPage);

    const aOrders = document.createElement("a");
    const aOrdersIcon = document.createElement("img");
    aOrdersIcon.classList.add("a-icon-menu-user");
    aOrdersIcon.src = "/assets/images/bag-icon.svg";
    aOrders.appendChild(aOrdersIcon);

    const ordersText = document.createElement("span");
    ordersText.innerText = "Meus pedidos";
    aOrders.appendChild(ordersText);
    aOrders.classList.add("a-orders");
    aOrders.classList.add("nav-menu-user-page-selected");
    navMenuUserPage.appendChild(aOrders);

    const aAddress = document.createElement("a");
    const aAddressIcon = document.createElement("img");
    aAddressIcon.classList.add("a-icon-menu-user");
    aAddressIcon.src = "/assets/images/address-icon.svg";
    aAddress.appendChild(aAddressIcon);

    const addressText = document.createElement("span");
    addressText.innerText = "Meus endereços";
    aAddress.appendChild(addressText);
    aAddress.classList.add("a-address");
    navMenuUserPage.appendChild(aAddress);

    const aSettings = document.createElement("a");
    const aSettingsIcon = document.createElement("img");
    aSettingsIcon.classList.add("a-icon-menu-user");
    aSettingsIcon.src = "/assets/images/settings-icon.svg";
    aSettings.appendChild(aSettingsIcon);
  
    const settingsText = document.createElement("span");
    settingsText.innerText = "Configurações";
    aSettings.appendChild(settingsText);
    aSettings.classList.add("a-settings");
    navMenuUserPage.appendChild(aSettings);


    leftMenuUserPage.appendChild(ButtonComponent("SAIR", 'exit-button-user-page', async () => {
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
            router.navigate("/");
        };
    }))

    return userPageDiv;
}

async function getUserId(){
    try{
        const response = await fetch ('/api/login', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data.user.id;
    } catch (error){
        return;
    }
}

async function getUserInfo(userId) {
    try{
        const response = await fetch (`/api/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const userData = await response.json();
        return userData;
    } catch(error) {
        return;
    }
}