import btn from "./ButtonComponent.js"
import router from "../js/routes.js";
import MessageComponent from "./MessageComponent.js";
import NoCreditsModal from "./NoCreditsModal.js";
import LoadingComponent from "./LoadingComponent.js";

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
		let freight = cartTotal > 0 ? 10 : 0;

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

		const freightDivValueNumber = document.createElement("div");
		freightDivValueNumber.classList.add("checkout-freight-div-value-number");
		const freightDivValue = document.createElement("p");
		freightDivValue.classList.add("checkout-freight-div-value");
		if (cartTotal > 200){
			const freightBefore = freight;
			freight = 0;
			const freightDivValueBefore = document.createElement("p");
			freightDivValueBefore.classList.add("checkout-freight-div-value-before");
			freightDivValueBefore.innerText = `R$ ${freightBefore},00`;
			freightDivValueNumber.appendChild(freightDivValueBefore);
		}
		freightDivValue.innerText = `R$ ${freight},00`;
		freightDivValueNumber.appendChild(freightDivValue);
		freightDiv.appendChild(freightDivValueNumber);

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

		const payNowBtn = btn("Pagar agora", "checkout-pay-now-btn");

		payNowBtnDiv.appendChild(payNowBtn);

		function removeOverlay() {
			const overlay = document.getElementById("overlay-no-credits");
			if (overlay) {
				overlay.remove();
			}
		}
		const modal = await NoCreditsModal(removeOverlay);
		modal.style.display = "none";
		mainDiv.appendChild(modal);

		const paymentMethodsDiv = document.createElement("div");
		paymentMethodsDiv.classList.add("checkout-payment-methods-div");
		rightDiv.appendChild(paymentMethodsDiv);

		const paymentMethodsText = document.createElement("p");
		paymentMethodsText.classList.add("checkout-payment-methods-text");
		paymentMethodsText.innerText = "Formas de Pagamento";
		paymentMethodsDiv.appendChild(paymentMethodsText);

		const paymentMethodsIcons = document.createElement("img");
		paymentMethodsIcons.classList.add("checkout-payment-methods-icons");
		paymentMethodsIcons.src = "/assets/images/payment-methods-icon.svg";
		paymentMethodsDiv.appendChild(paymentMethodsIcons);

		const payCart = async (address) => {
			if (user.credit_balance > (cartTotal + freight)) {
				try {
					const response = await fetch(`/api/cart/${cartId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							status: "approved",
							address_id: address.id
						})
					});

					const cartUpdated = await response.json();

					if (cartUpdated.error) {
						throw cartUpdated.error;
					}

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

					MessageComponent("Compra realizada com sucesso!", true);

					router.navigate("/confirmation");
				} catch (error) {
					MessageComponent(error, false);
					console.error(error);
				}
			} else {
				modal.style.display = "flex";
				const overlay = document.createElement("div");
				overlay.id = "overlay-no-credits";
				document.body.appendChild(overlay);
			}

		}

		const generateAddress = async (user_id, index) => {
			const addressDiv = document.createElement("div");
			addressDiv.classList.add("checkout-address-div");
			addressInfoDiv.appendChild(addressDiv);
			payNowBtn.disabled = true;

			const loading = LoadingComponent(4);
			addressDiv.appendChild(loading);

			addressDiv.style.justifyContent = "center";

			const addressResponse = await fetch(`/api/address/user/${user_id}?index=${index}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});

			const address = await addressResponse.json();

			payNowBtn.onclick = () => payCart(address);

			payNowBtn.disabled = false;

			loading.remove();
			addressDiv.style = "";

			const addressLeftDiv = document.createElement("div");
			addressLeftDiv.classList.add("checkout-address-left-div");
			addressDiv.appendChild(addressLeftDiv);

			const iconDiv = document.createElement("div");
			iconDiv.classList.add("checkout-point-icon-div");
			addressLeftDiv.appendChild(iconDiv);

			const pointIcon = document.createElement("img");
			pointIcon.classList.add("checkout-point-icon");
			pointIcon.src = "/assets/images/point-icon.svg";
			iconDiv.appendChild(pointIcon);

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

			const pageModalDiv = document.createElement("div");
			pageModalDiv.classList.add("checkout-page-modal-div");
			pageModalDiv.style.display = "none";
			mainDiv.appendChild(pageModalDiv);

			pageModalDiv.addEventListener("click", (event) => {
				if (event.target === pageModalDiv) {
					pageModalDiv.style.display = "none";
				}
			})

			const modalDiv = document.createElement("div");
			modalDiv.classList.add("checkout-modal-div-address");
			modalDiv.style.display = "flex";
			pageModalDiv.appendChild(modalDiv);

			const pencilIcon = document.createElement("img");
			pencilIcon.classList.add("checkout-pencil-icon");
			pencilIcon.src = "/assets/images/pencil-icon.svg";
			addressRightDiv.appendChild(pencilIcon);

			pencilIcon.addEventListener("click", () => {
				modalDiv.innerHTML = "";
				pageModalDiv.style.display = "flex";

				const h2Update = document.createElement("h2");
				h2Update.classList.add("checkout-h2-update-modal");
				h2Update.innerText = "Atualizar endereço";
				modalDiv.appendChild(h2Update);

				const closeIcon = document.createElement("img");
				closeIcon.classList.add("checkout-close-icon-address");
				closeIcon.src = "/assets/images/close-icon.svg";
				modalDiv.appendChild(closeIcon);

				closeIcon.addEventListener("click", () => {
					pageModalDiv.style.display = "none";
				})

				const divModalPostalCode = document.createElement("div");
				divModalPostalCode.classList.add("checkout-modal-div-postal-code");
				modalDiv.appendChild(divModalPostalCode);

				const modalInputPostalCode = createPostalCodeInput();
				modalInputPostalCode.value = address.postal_code;
				divModalPostalCode.appendChild(modalInputPostalCode);

				divModalPostalCode.appendChild(btn("Pesquisar", "checkout-button-search-postal-code", (async () => {
					const modalPostalCode = await searchPostalCode(modalInputPostalCode.value);
					modalInputState.value = modalPostalCode.state;
					modalInputCity.value = modalPostalCode.city;
					modalInputStreet.value = modalPostalCode.street;
					modalInputNumber.value = "";
					modalInputComplement.value = "";
				})));

				const modalInputCity = document.createElement("input");
				modalInputCity.placeholder = "Cidade";
				modalInputCity.classList.add("checkout-modal-input");
				modalInputCity.value = address.city;
				modalDiv.appendChild(modalInputCity);

				const modalInputState = document.createElement("input");
				modalInputState.placeholder = "Estado";
				modalInputState.classList.add("checkout-modal-input");
				modalInputState.value = address.state;
				modalDiv.appendChild(modalInputState);

				const modalInputStreet = document.createElement("input");
				modalInputStreet.placeholder = "Rua";
				modalInputStreet.classList.add("checkout-modal-input");
				modalInputStreet.value = address.street;
				modalDiv.appendChild(modalInputStreet);

				const modalInputNumber = document.createElement("input");
				modalInputNumber.placeholder = "Número";
				modalInputNumber.classList.add("checkout-modal-input");
				modalInputNumber.value = address.number;
				modalDiv.appendChild(modalInputNumber);

				const modalInputComplement = document.createElement("input");
				modalInputComplement.placeholder = "Complemento";
				modalInputComplement.classList.add("checkout-modal-input");
				modalInputComplement.value = address.complement;
				modalDiv.appendChild(modalInputComplement);

				modalDiv.appendChild(btn("Atualizar", "checkout-button-update-address", (async () => {
					try {
						const response = await fetch(`/api/address/${address.id}`, {
							method: "PUT",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify({
								postal_code: modalInputPostalCode.value,
								state: modalInputState.value,
								city: modalInputCity.value,
								street: modalInputStreet.value,
								number: modalInputNumber.value,
								complement: modalInputComplement.value || ""
							})
						})
						const responseData = await response.json();
						if (response.ok) {
							MessageComponent("Endereço atualizado com sucesso!", true);
							setTimeout(() => {
								pageModalDiv.style.display = "none";

							}, 2000);
							h3.innerText = modalInputStreet.value + "," + " " + modalInputNumber.value;
							pStateAndCity.innerText = modalInputCity.value + " " + "-" + " " + modalInputState.value;
							pPostalCodeAndComplement.innerText = modalInputPostalCode.value + "," + " " + modalInputComplement.value;
						} else {
							MessageComponent("Erro ao atualizar endereço!", false);
						}
						return responseData;
					} catch (error) {
						return;
					}
				}
				)));
			})

			const changeIcon = document.createElement("img");
			changeIcon.classList.add("checkout-change-icon");
			changeIcon.src = "/assets/images/change-icon.svg";
			addressRightDiv.appendChild(changeIcon);

			changeIcon.addEventListener("click", async () => {
				modalDiv.innerHTML = "";
				pageModalDiv.style.display = "flex";

				const h2Update = document.createElement("h2");
				h2Update.classList.add("checkout-h2-modal");
				h2Update.innerText = "Escolha o endereço de entrega";
				modalDiv.appendChild(h2Update);

				const addressListDivModal = document.createElement("div");
				addressListDivModal.classList.add("adress-list-div-modal");
				modalDiv.appendChild(addressListDivModal);

				addressListDivModal.style.alignItems = "center";
				addressListDivModal.style.justifyContent = "center";

				const addresListLoading = LoadingComponent(5);
				addressListDivModal.appendChild(addresListLoading);

				const closeIcon = document.createElement("img");
				closeIcon.classList.add("checkout-close-icon-address");
				closeIcon.src = "/assets/images/close-icon.svg";
				modalDiv.appendChild(closeIcon);

				closeIcon.addEventListener("click", () => {
					pageModalDiv.style.display = "none";
				})

				try {
					const allAddressResponse = await fetch(`/api/address/all/`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json"
						}
					});
					const allAddress = await allAddressResponse.json();

					addresListLoading.remove();

					addressListDivModal.style = "";

					allAddress.forEach((userAddress, index) => {
						const addressDivModal = document.createElement("div");
						addressDivModal.classList.add("checkout-address-div-modal");
						addressListDivModal.appendChild(addressDivModal);

						addressDivModal.addEventListener("click", () => {
							addressDiv.remove();
							pageModalDiv.style.display = "none";
							generateAddress(user_id, index);
						})

						const addressLeftDiv = document.createElement("div");
						addressLeftDiv.classList.add("checkout-address-left-div");
						addressDivModal.appendChild(addressLeftDiv);

						const iconModalDiv = document.createElement("div");
						iconModalDiv.classList.add("checkout-point-icon-modal-div")
						addressLeftDiv.appendChild(iconModalDiv);

						const pointIcon = document.createElement("img");
						pointIcon.classList.add("checkout-point-icon-modal");
						pointIcon.src = "/assets/images/point-icon.svg";
						iconModalDiv.appendChild(pointIcon);

						const addressInfo = document.createElement("div");
						addressInfo.classList.add("checkout-address-info");
						addressLeftDiv.appendChild(addressInfo);

						const streetText = document.createElement("p");
						streetText.classList.add("checkout-street-text");
						streetText.innerText = (userAddress.complement && userAddress.number) ? `${userAddress.street}, ${userAddress.number} - Complemento: ${userAddress.complement}` : (userAddress.number ? `${userAddress.street}, ${userAddress.number}` : `${userAddress.street}`);
						addressInfo.appendChild(streetText);

						const cityStateText = document.createElement("p");
						cityStateText.classList.add("checkout-city-state-text");
						cityStateText.innerText = `${userAddress.city} - ${userAddress.state}`;
						addressInfo.appendChild(cityStateText);

						const postalCodeText = document.createElement("p");
						postalCodeText.classList.add("checkout-cep-text");
						postalCodeText.innerText = `${userAddress.postal_code}`;
						addressInfo.appendChild(postalCodeText);
					});
				} catch (error) {
					console.log(error);
					return;
				}
			})
		}

		await generateAddress(userId, 0);

		return mainDiv;

	} catch (error) {
		console.error("Erro ao fazer login:", error);
	}
}

function createPostalCodeInput() {
	const inputPostalCode = document.createElement("input");
	inputPostalCode.placeholder = "CEP";
	inputPostalCode.classList.add("checkout-input-postal-code");
	inputPostalCode.type = "text";
	inputPostalCode.addEventListener("input", (event) => {
		let cep = event.target.value.replace(/\D/g, '');
		cep = cep.slice(0, 8);

		if (cep.length > 5) {
			cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
		}

		event.target.value = cep;
	})
	inputPostalCode.addEventListener("keypress", (event) => {
		const allowedChars = /[0-9]/;

		if (!allowedChars.test(event.key)) {
			event.preventDefault();
		}
	});

	return inputPostalCode;
}

async function searchPostalCode(postalCode) {
	try {
		const response = await fetch(`https://api.brasilaberto.com/v1/zipcode/${postalCode}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		return data.result;
	} catch (error) {
		return;
	}
}

