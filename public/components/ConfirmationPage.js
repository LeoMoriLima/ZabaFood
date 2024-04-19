import ButtonComponent from "./ButtonComponent.js";
import router from "../js/routes.js";

export default () => {
	const mainDiv = document.createElement("div");
	mainDiv.classList.add("main-div-confirmation-page");

	const cardTextDiv = document.createElement("div");
	cardTextDiv.classList.add("card-text-div");
	mainDiv.appendChild(cardTextDiv);

	const orderConfirmationText = document.createElement("p");
	orderConfirmationText.classList.add("order-confirmation-text");
	orderConfirmationText.innerText = "Pedido realizado!";
	cardTextDiv.appendChild(orderConfirmationText);

	const statusText = document.createElement("p");
	statusText.classList.add("status-order-text");
	statusText.innerText = "Status: Processando.";
	cardTextDiv.appendChild(statusText);

	const backToMainPageBtn = ButtonComponent("Voltar ao início", "green-button", () => {
		router.navigate("/")
	})
	cardTextDiv.appendChild(backToMainPageBtn);

	return mainDiv;
}