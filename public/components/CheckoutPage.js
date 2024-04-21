import btn from "./ButtonComponent.js"
import router from "../js/routes.js";

export default async () => {
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
		const cartId = cart.id;
		const cartTotal = parseFloat(cart.total);
		const freight = cartTotal > 0 ? 10 : 0;

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
		addressInfoDiv.classList.add("checkout-address-info-div");
		infoDiv.appendChild(addressInfoDiv);

		const addressDivText = document.createElement("p");
		addressDivText.classList.add("checkout-address-div-text");
		addressDivText.innerText = "ENDEREÇO DE ENTREGA";
		addressInfoDiv.appendChild(addressDivText);

		const addressDiv = document.createElement("div");
		addressDiv.classList.add("checkout-address-div");
		addressInfoDiv.appendChild(addressDiv);

		const addressLeftDiv = document.createElement("div");
		addressLeftDiv.classList.add("checkout-address-left-div");
		addressDiv.appendChild(addressLeftDiv);

		const pointIcon = document.createElement("img");
		pointIcon.classList.add("checkout-point-icon");
		pointIcon.src = "../assets/images/point-icon.svg";
		addressLeftDiv.appendChild(pointIcon);

		const addressInfo = document.createElement("div");
		addressInfo.classList.add("checkout-address-info");
		addressLeftDiv.appendChild(addressInfo);

		const streetText = document.createElement("p");
		streetText.classList.add("checkout-street-text");
		streetText.innerText = (address.complement && address.number) ? `${address.street}, ${address.number} - Complemento: ${address.complement}` : (address.number ? `${address.street}, ${address.number}` : `${address.street}`);
		addressInfo.appendChild(streetText);

		const cityStateText = document.createElement("p");
		cityStateText.classList.add("checkout-city-state-text");
		cityStateText.innerText = `${address.city} - ${address.state}`;
		addressInfo.appendChild(cityStateText);

		const postalCodeText = document.createElement("p");
		postalCodeText.classList.add("checkout-cep-text");
		postalCodeText.innerText = `${address.postal_code}`;
		addressInfo.appendChild(postalCodeText);

		const addressRightDiv = document.createElement("div");
		addressRightDiv.classList.add("checkout-address-right-div");
		addressDiv.appendChild(addressRightDiv);

		const pencilIcon = document.createElement("img");
		pencilIcon.classList.add("checkout-pencil-icon");
		pencilIcon.src = "../assets/images/pencil-icon.svg";
		addressRightDiv.appendChild(pencilIcon);

		const changeIcon = document.createElement("img");
		changeIcon.classList.add("checkout-change-icon");
		changeIcon.src = "../assets/images/change-icon.svg";
		addressRightDiv.appendChild(changeIcon);

		const paymentDiv = document.createElement("div");
		paymentDiv.classList.add("checkout-payment-div");
		infoDiv.appendChild(paymentDiv);

		const line = document.createElement("hr");
		line.classList.add("checkout-line");
		infoDiv.appendChild(line);

		const creditInfoDiv = document.createElement("div");
		creditInfoDiv.classList.add("checkout-credit-info-div");
		infoDiv.appendChild(creditInfoDiv);

		const creditDivText = document.createElement("p");
		creditDivText.classList.add("checkout-credit-div-text");
		creditDivText.innerText = "SALDO DE CRÉDITOS";
		creditInfoDiv.appendChild(creditDivText);

		const creditDiv = document.createElement("div");
		creditDiv.classList.add("checkout-credit-div");
		creditInfoDiv.appendChild(creditDiv);

		const userCreditBalance = document.createElement("p");
		userCreditBalance.classList.add("checkout-user-credit-balance");
		userCreditBalance.innerText = `Seu saldo de créditos é de: R$ ${(user.credit_balance).replace('.', ',')}`;
		creditDiv.appendChild(userCreditBalance);

		const userCreditFinal = document.createElement("p");
		userCreditFinal.classList.add("checkout-user-credit-final");
		userCreditFinal.innerText = `Seu saldo após a compra dos produtos será de: R$ ${(user.credit_balance - cart.total - freight).toFixed(2).replace('.', ',')}`;
		creditDiv.appendChild(userCreditFinal);

		const insertCreditText = document.createElement("p");
		insertCreditText.classList.add("checkout-insert-credit-text");
		insertCreditText.innerText = "Deseja inserir mais créditos?";
		insertCreditText.addEventListener("click", async () => {
			router.navigate("/payment");
		})
		creditDiv.appendChild(insertCreditText);

		const rightDiv = document.createElement("div");
		rightDiv.classList.add("checkout-right-div");
		mainDiv.appendChild(rightDiv);

		const valueDiv = document.createElement("div");
		valueDiv.classList.add("checkout-value-div");
		rightDiv.appendChild(valueDiv);

		const valueDivText = document.createElement("p");
		valueDivText.classList.add("checkout-order-resume-text");
		valueDivText.innerText = "Resumo do Pedido";
		valueDiv.appendChild(valueDivText);

		const freightDiv = document.createElement("div");
		freightDiv.classList.add("checkout-freight-div");
		valueDiv.appendChild(freightDiv);

		const freightDivText = document.createElement("p");
		freightDivText.classList.add("checkout-freight-div-text");
		freightDivText.innerText = "Frete:";
		freightDiv.appendChild(freightDivText);

		const freightDivValue = document.createElement("p");
		freightDivValue.classList.add("checkout-freight-div-value");
		freightDivValue.innerText = `R$ ${freight},00`;
		freightDiv.appendChild(freightDivValue);

		const subTotalDiv = document.createElement("div");
		subTotalDiv.classList.add("checkout-subtotal-div");
		valueDiv.appendChild(subTotalDiv);

		const subTotalDivText = document.createElement("p");
		subTotalDivText.classList.add("checkout-subtotal-div-text");
		subTotalDivText.innerText = "Subtotal:";
		subTotalDiv.appendChild(subTotalDivText);

		const subTotalDivValue = document.createElement("p");
		subTotalDivValue.classList.add("checkout-subtotal-div-value");
		subTotalDivValue.innerText = `R$ ${(cart.total).replace('.', ',')}`;
		subTotalDiv.appendChild(subTotalDivValue);

		const totalDiv = document.createElement("div");
		totalDiv.classList.add("checkout-total-div");
		valueDiv.appendChild(totalDiv);

		const totalDivText = document.createElement("p");
		totalDivText.classList.add("checkout-total-div-text");
		totalDivText.innerText = "Total:";
		totalDiv.appendChild(totalDivText);

		const totalDivValue = document.createElement("p");
		totalDivValue.classList.add("checkout-total-div-value");

		totalDivValue.innerText = `R$ ${(cartTotal + freight).toFixed(2)}`;
		totalDiv.appendChild(totalDivValue);

		const payNowBtnDiv = document.createElement("div");
		payNowBtnDiv.classList.add("checkout-pay-now-btn-div");
		valueDiv.appendChild(payNowBtnDiv);

		const payNowBtn = btn("Pagar agora", "checkout-pay-now-btn", async () => {
			try {
				const response = await fetch(`/api/cart/${cartId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						status: "approved",
					})
				});
	
				const newCartResponse = await fetch("/api/cart", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						user_id: userId,
					})
				});
	
				const userResponse = await fetch(`/api/users/${userId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						credit_balance: (user.credit_balance - freight - cart.total),
					})
				});
	
				const userData = await userResponse.json();
				console.log(userData)
	
				router.navigate("/confirmation")
			} catch (error) {
				console.log(error)
			}
		});
		payNowBtnDiv.appendChild(payNowBtn);

		const paymentMethodsDiv = document.createElement("div");
		paymentMethodsDiv.classList.add("checkout-payment-methods-div");
		rightDiv.appendChild(paymentMethodsDiv);

		const paymentMethodsText = document.createElement("p");
		paymentMethodsText.classList.add("checkout-payment-methods-text");
		paymentMethodsText.innerText = "Formas de Pagamento";
		paymentMethodsDiv.appendChild(paymentMethodsText);

		const paymentMethodsIcons = document.createElement("img");
		paymentMethodsIcons.classList.add("checkout-payment-methods-icons");
		paymentMethodsIcons.src = "../assets/images/payment-methods-icon.svg";
		paymentMethodsDiv.appendChild(paymentMethodsIcons);

		return mainDiv;

	} catch (error) {
		console.error("Erro ao fazer login:", error);
	}
}