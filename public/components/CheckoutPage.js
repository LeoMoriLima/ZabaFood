import btn from "./ButtonComponent.js"
import router from "../js/routes.js";

export default async () => {
	const freight = 10;
	
	try {
		const response = await fetch('/api/login', {
			method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const userData = await response.json();
		const userId = userData.user.id;

		const userResponse = await fetch(`api/users/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		const user = await userResponse.json();

		const cartResponse = await fetch(`/api/cart/user/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		const cart = await cartResponse.json();

		const addressResponse = await fetch(`/api/address/user/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});

		const address = await addressResponse.json();

		const mainDiv = document.createElement("div");
		mainDiv.classList.add("checkout-page-main-div");

		const infoDiv = document.createElement("div");
		infoDiv.classList.add("info-div-checkout");
		mainDiv.appendChild(infoDiv);

		const addressInfoDiv = document.createElement("div");
		addressInfoDiv.classList.add("address-info-div");
		infoDiv.appendChild(addressInfoDiv);

		const addressDivText = document.createElement("p");
		addressDivText.classList.add("address-div-text");
		addressDivText.innerText = "ENDEREÇO DE ENTREGA";
		addressInfoDiv.appendChild(addressDivText);

		const addressDiv = document.createElement("div");
		addressDiv.classList.add("address-div");
		addressInfoDiv.appendChild(addressDiv);

		const addressLeftDiv = document.createElement("div");
		addressLeftDiv.classList.add("address-left-div");
		addressDiv.appendChild(addressLeftDiv);

		const pointIcon = document.createElement("img");
		pointIcon.classList.add("point-icon");
		pointIcon.src = "../assets/images/point-icon.svg";
		addressLeftDiv.appendChild(pointIcon);

		const addressInfo = document.createElement("div");
		addressInfo.classList.add("address-info");
		addressLeftDiv.appendChild(addressInfo);

		const streetText = document.createElement("p");
		streetText.classList.add("street-text");
		streetText.innerText = (address.complement && address.number) ? `${address.street}, ${address.number} - Complemento: ${address.complement}` : (address.number ? `${address.street}, ${address.number}` : `${address.street}`);
		addressInfo.appendChild(streetText);

		const cityStateText = document.createElement("p");
		cityStateText.classList.add("city-state-text");
		cityStateText.innerText = `${address.city} - ${address.state}`;
		addressInfo.appendChild(cityStateText);

		const postalCodeText = document.createElement("p");
		postalCodeText.classList.add("cep-text");
		postalCodeText.innerText = `${address.postal_code}`;
		addressInfo.appendChild(postalCodeText);

		const addressRightDiv = document.createElement("div");
		addressRightDiv.classList.add("address-right-div");
		addressDiv.appendChild(addressRightDiv);

		const pencilIcon = document.createElement("img");
		pencilIcon.classList.add("pencil-icon");
		pencilIcon.src = "../assets/images/pencil-icon.svg";
		addressRightDiv.appendChild(pencilIcon);

		const changeIcon = document.createElement("img");
		changeIcon.classList.add("change-icon");
		changeIcon.src = "../assets/images/change-icon.svg";
		addressRightDiv.appendChild(changeIcon);

		const paymentDiv = document.createElement("div");
		paymentDiv.classList.add("payment-div");
		infoDiv.appendChild(paymentDiv);

		const line = document.createElement("hr");
		line.classList.add("line");
		infoDiv.appendChild(line);

		const creditInfoDiv = document.createElement("div");
		creditInfoDiv.classList.add("credit-info-div");
		infoDiv.appendChild(creditInfoDiv);

		const creditDivText = document.createElement("p");
		creditDivText.classList.add("credit-div-text");
		creditDivText.innerText = "SALDO DE CRÉDITOS";
		creditInfoDiv.appendChild(creditDivText);

		const creditDiv = document.createElement("div");
		creditDiv.classList.add("credit-div");
		creditInfoDiv.appendChild(creditDiv);

		const userCreditBalance = document.createElement("p");
		userCreditBalance.classList.add("user-credit-balance");
		userCreditBalance.innerText = `Seu saldo de créditos é de: R$ ${(user.credit_balance).replace('.', ',')}`;
		creditDiv.appendChild(userCreditBalance);

		const userCreditFinal = document.createElement("p");
		userCreditFinal.classList.add("user-credit-final");
		userCreditFinal.innerText = `Seu saldo após a compra dos produtos será de: R$ ${(user.credit_balance - cart.total - freight).toFixed(2).replace('.', ',')}`;
		creditDiv.appendChild(userCreditFinal);

		const insertCreditText = document.createElement("p");
		insertCreditText.classList.add("insert-credit-text");
		insertCreditText.innerText = "Deseja inserir mais créditos?";
		insertCreditText.addEventListener("click", async () => {
			window.route({ preventDefault: () => {}, target: { href: `/payment` } });
		})
		creditDiv.appendChild(insertCreditText);

		const rightDiv = document.createElement("div");
		rightDiv.classList.add("right-div");
		mainDiv.appendChild(rightDiv);

		const valueDiv = document.createElement("div");
		valueDiv.classList.add("value-div");
		rightDiv.appendChild(valueDiv);

		const valueDivText = document.createElement("p");
		valueDivText.classList.add("order-resume-text");
		valueDivText.innerText = "Resumo do Pedido";
		valueDiv.appendChild(valueDivText);

		const freightDiv = document.createElement("div");
		freightDiv.classList.add("freight-div");
		valueDiv.appendChild(freightDiv);

		const freightDivText = document.createElement("p");
		freightDivText.classList.add("freight-div-text");
		freightDivText.innerText = "Frete:";
		freightDiv.appendChild(freightDivText);

		const freightDivValue = document.createElement("p");
		freightDivValue.classList.add("freight-div-value");
		freightDivValue.innerText = `R$ ${freight},00`;
		freightDiv.appendChild(freightDivValue);

		const totalDiv = document.createElement("div");
		totalDiv.classList.add("total-div");
		valueDiv.appendChild(totalDiv);

		const totalDivText = document.createElement("p");
		totalDivText.classList.add("total-div-text");
		totalDivText.innerText = "Total:";
		totalDiv.appendChild(totalDivText);

		const totalDivValue = document.createElement("p");
		totalDivValue.classList.add("total-div-value");
		totalDivValue.innerText = `R$ ${(cart.total).replace('.', ',')}`;
		totalDiv.appendChild(totalDivValue);

		const payNowBtn = btn("Pagar agora", "pay-now-btn", async () => {
			router.navigate("/confirmation")
		});
		valueDiv.appendChild(payNowBtn);

		const paymentMethodsDiv = document.createElement("div");
		paymentMethodsDiv.classList.add("payment-methods-div");
		rightDiv.appendChild(paymentMethodsDiv);

		const paymentMethodsText = document.createElement("p");
		paymentMethodsText.classList.add("payment-methods-text");
		paymentMethodsText.innerText = "Formas de Pagamento";
		paymentMethodsDiv.appendChild(paymentMethodsText);

		const paymentMethodsIcons = document.createElement("img");
		paymentMethodsIcons.classList.add("payment-methods-icons");
		paymentMethodsIcons.src = "../assets/images/payment-methods-icon.svg";
		paymentMethodsDiv.appendChild(paymentMethodsIcons);

		return mainDiv;

	} catch (error) {
		console.error("Erro ao fazer login:", error);
	}
}