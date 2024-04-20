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
    aOrders.innerText = "Meus pedidos";
    aOrders.classList.add("a-orders");
    navMenuUserPage.appendChild(aOrders);

    userPageDiv.appendChild(await orderPageDiv());

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
            router.navigate("/")
        };
    }))

    return userPageDiv;
}