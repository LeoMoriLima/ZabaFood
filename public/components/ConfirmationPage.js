import ButtonComponent from "./ButtonComponent.js";
import router from "../js/routes.js";

export default () => {
	const mainDiv = document.createElement("div");
	mainDiv.classList.add("main-div-confirmation-page");

	const grayDiv = document.createElement("div");
	grayDiv.classList.add("gray-div");
	mainDiv.appendChild(grayDiv);

	const cardTextDiv = document.createElement("div");
	cardTextDiv.classList.add("card-text-div");
	grayDiv.appendChild(cardTextDiv);

	const orderConfirmationText = document.createElement("p");
	orderConfirmationText.classList.add("order-confirmation-text");
	orderConfirmationText.innerText = "Pedido realizado!";
	cardTextDiv.appendChild(orderConfirmationText);

	const statusText = document.createElement("p");
	statusText.classList.add("status-order-text");
	statusText.innerText = "Status: Processando.";
	cardTextDiv.appendChild(statusText);

	const myAccountBtn = ButtonComponent("Acessar meus pedidos", "myaccount-btn", () => {
		router.navigate("/myaccount");
	});
	grayDiv.appendChild(myAccountBtn);

	const backToMainPageBtn = ButtonComponent("Voltar ao início", "back-to-main-btn", () => {
		router.navigate("/");
	});
	grayDiv.appendChild(backToMainPageBtn);

	return mainDiv;
}