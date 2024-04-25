import ButtonComponent from "./ButtonComponent.js";
import router from "../js/routes.js";

export default () => {
	const mainDiv = document.createElement("div");
	mainDiv.classList.add("pc-main-div-confirmation-page");

	const cardTextDiv = document.createElement("div");
	cardTextDiv.classList.add("pc-card-text-div");
	mainDiv.appendChild(cardTextDiv);

	const orderConfirmationText = document.createElement("p");
	orderConfirmationText.classList.add("pc-order-confirmation-text");
	orderConfirmationText.innerText = "Compra realizada!";
	cardTextDiv.appendChild(orderConfirmationText);

	const backToMainPageBtn = ButtonComponent("Voltar ao início", "pc-green-button", () => {
        router.navigate("/");
	})
	cardTextDiv.appendChild(backToMainPageBtn);

	return mainDiv;
}