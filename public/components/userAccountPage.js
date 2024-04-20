import ButtonComponent from "./ButtonComponent.js";
import userAddressContent from "./userAddressContent.js";
import orderPageDiv from "./userOrdersContent.js";

export default async () => {
    const userPageDiv = document.createElement("div");
    userPageDiv.classList.add("user-page-div");

    const leftMenuUserPage = document.createElement("div");
    leftMenuUserPage.classList.add("left-menu-user-page");
    userPageDiv.appendChild(leftMenuUserPage);

    const navMenuUserPage = document.createElement("nav");
    navMenuUserPage.classList.add("nav-menu-user-page");
    leftMenuUserPage.appendChild(navMenuUserPage);
    
    const aAddress = document.createElement("a");
    aAddress.innerText = "Meus endereços";
    aAddress.classList.add("a-address");
    navMenuUserPage.appendChild(aAddress);

    aAddress.addEventListener("click", async () => {
        handleSelected(aAddress)
        aAddress.classList.add("selected-option");
        userPageDiv.querySelectorAll(".content-container").forEach((element) => {
            element.remove();
        });

        const addressContent = await userAddressContent();
        addressContent.classList.add("content-container");
        userPageDiv.appendChild(addressContent);
    });

    const aOrders = document.createElement("a");
    aOrders.innerText = "Meus pedidos";
    aOrders.classList.add("a-orders");
    navMenuUserPage.appendChild(aOrders);

    
    aOrders.addEventListener("click", async () => {
        handleSelected(aOrders);
        userPageDiv.querySelectorAll(".content-container").forEach((element) => {
            element.remove();
        });

        const orderContent = await orderPageDiv();
        orderContent.classList.add("content-container");
        userPageDiv.appendChild(orderContent);
    });

    leftMenuUserPage.appendChild(ButtonComponent("SAIR", 'exit-button', async () => {
        try{
            const response = await fetch('/logout', {
                method: "GET",
                headers:{
                    "Content-Type": "application/json"
                }
            });
        } catch(error){
            console.error("Erro ao fazer a requisição");
            throw new error ("Erro ao fazer a requisição!");
        } finally {
            window.route({ preventDefault: () => {}, target: { href: "/" } });
        };
    }))

    return userPageDiv;
}

function handleSelected(element) {
    const allLinks = document.querySelectorAll(".nav-menu-user-page a");
    allLinks.forEach((link) => {
        link.classList.remove("selected-a");
    });
    element.classList.add("selected-a");
}