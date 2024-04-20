import ButtonComponent from "./ButtonComponent.js";

export default () => {
	const mainDiv = document.createElement("div");
	mainDiv.classList.add("pc-main-div-confirmation-page");

	const cardTextDiv = document.createElement("div");
	cardTextDiv.classList.add("pc-card-text-div");
	mainDiv.appendChild(cardTextDiv);

	const orderConfirmationText = document.createElement("p");
	orderConfirmationText.classList.add("order-confirmation-text");
	orderConfirmationText.innerText = "Compra realizada!";
	cardTextDiv.appendChild(orderConfirmationText);

	const backToMainPageBtn = ButtonComponent("Voltar ao início", "green-button", () => {
		window.route({ preventDefault: () => {}, target: { href: "/" } });
	})
	cardTextDiv.appendChild(backToMainPageBtn);

	return mainDiv;
}