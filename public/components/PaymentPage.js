import btn from "./ButtonComponent.js";
import router from "../js/routes.js";

export default async () => {
	try {
		const userResponse = await fetch('/api/login', {
			method: "GET",
            headers: {
				"Content-Type": "application/json"
            }
        });
        const userData = await userResponse.json();
		const userId = userData.user.id;

		const mainDiv = document.createElement("div");
		mainDiv.classList.add("pp-main-div");

        const leftDiv = document.createElement("div");
        leftDiv.classList.add("pp-left-div");
        mainDiv.appendChild(leftDiv);

        const methodsDiv = document.createElement("div");
		methodsDiv.classList.add("pp-methods-div");
        leftDiv.appendChild(methodsDiv);

        const methodsDivTitle = document.createElement("h1");
        methodsDivTitle.classList.add("pp-methods-div-title");
        methodsDivTitle.innerText = "Métodos de Pagamento";
        methodsDiv.appendChild(methodsDivTitle);

        const creditCardDiv = document.createElement("div");
        creditCardDiv.classList.add("pp-credit-card-div");
        methodsDiv.appendChild(creditCardDiv);

        const creditCardTitle = document.createElement("h3");
        creditCardTitle.classList.add("pp-credit-card-title");
        creditCardTitle.innerText = "Cartão de crédito";
        creditCardDiv.appendChild(creditCardTitle);

        const creditcardDescriptionDiv = document.createElement("div");
        creditcardDescriptionDiv.classList.add("pp-credit-card-desc-div");
        creditCardDiv.appendChild(creditcardDescriptionDiv);

        const creditCardCheckbox = document.createElement("input");
        creditCardCheckbox.classList.add("pp-credit-card-checkbox");
        creditCardCheckbox.setAttribute("type", "radio");
        creditCardCheckbox.name = "paymentMethod"; 
        creditcardDescriptionDiv.appendChild(creditCardCheckbox);

        const creditCardIcon = document.createElement("img");
        creditCardIcon.classList.add("pp-credit-card-icon");
        creditCardIcon.src = "/assets/images/credit-card-icon.svg";
        creditcardDescriptionDiv.appendChild(creditCardIcon);

        const creditCardText = document.createElement("p");
        creditCardText.classList.add("pp-credit-card-text");
        creditCardText.innerText = "Aceitamos diversas bandeiras de cartão de crédito.";
        creditcardDescriptionDiv.appendChild(creditCardText);

        const pixDiv = document.createElement("div");
        pixDiv.classList.add("pp-pix-div");
        methodsDiv.appendChild(pixDiv);

        const pixTitle = document.createElement("h3");
        pixTitle.classList.add("pp-pix-title");
        pixTitle.innerText = "PIX";
        pixDiv.appendChild(pixTitle);

        const pixDescriptionDiv = document.createElement("div");
        pixDescriptionDiv.classList.add("pp-pix-desc-div");
        pixDiv.appendChild(pixDescriptionDiv);

        const pixCheckbox = document.createElement("input");
        pixCheckbox.classList.add("pp-pix-checkbox");
        pixCheckbox.setAttribute("type", "radio");
        pixCheckbox.name = "paymentMethod"; 
        pixDescriptionDiv.appendChild(pixCheckbox);

        const pixIcon = document.createElement("img");
        pixIcon.classList.add("pp-pix-icon");
        pixIcon.src = "/assets/images/pix-icon.svg";
        pixDescriptionDiv.appendChild(pixIcon);

        const pixText = document.createElement("p");
        pixText.classList.add("pp-pix-text");
        pixText.innerText = "O código PIX gerado para o pagamento é válido por 30 minutos após a finalização do pedido.";
        pixDescriptionDiv.appendChild(pixText);

        const paymentSlipDiv = document.createElement("div");
        paymentSlipDiv.classList.add("pp-payment-slip-div");
        methodsDiv.appendChild(paymentSlipDiv);

        const paymentSlipTitle = document.createElement("h3");
        paymentSlipTitle.classList.add("pp-payment-slip-title");
        paymentSlipTitle.innerText = "Boleto bancário";
        paymentSlipDiv.appendChild(paymentSlipTitle);

        const paymentSlipDescriptionDiv = document.createElement("div");
        paymentSlipDescriptionDiv.classList.add("pp-payment-slip-desc-div");
        paymentSlipDiv.appendChild(paymentSlipDescriptionDiv);

        const paymentSlipCheckbox = document.createElement("input");
        paymentSlipCheckbox.classList.add("pp-payment-slip-checkbox");
        paymentSlipCheckbox.setAttribute("type", "radio");
        paymentSlipCheckbox.name = "paymentMethod"; 
        paymentSlipDescriptionDiv.appendChild(paymentSlipCheckbox);

        const paymentSlipIcon = document.createElement("img");
        paymentSlipIcon.classList.add("pp-payment-slip-icon");
        paymentSlipIcon.src = "/assets/images/payment-slip-icon.svg";
        paymentSlipDescriptionDiv.appendChild(paymentSlipIcon);

        const paymentSlipText = document.createElement("p");
        paymentSlipText.classList.add("pp-payment-slip-text");
        paymentSlipText.innerText = "Vencimento em 1 dia útil. A data de entrega poderá ser alterada devido ao tempo de processamento do boleto.";
        paymentSlipDescriptionDiv.appendChild(paymentSlipText);

        const rightDiv = document.createElement("div");
        rightDiv.classList.add("pp-right-div");
        mainDiv.appendChild(rightDiv);

        const totalDiv = document.createElement("div");
		totalDiv.classList.add("pp-total-div");
        rightDiv.appendChild(totalDiv);

        const TotalDivTitle = document.createElement("h1");
        TotalDivTitle.classList.add("pp-total-div-title");
        TotalDivTitle.innerText = "Resumo da compra";
        totalDiv.appendChild(TotalDivTitle);

        const totalTextDiv = document.createElement("div");
        totalTextDiv.classList.add("pp-total-text-div");
        totalDiv.appendChild(totalTextDiv);

        const totalTextDivLeft = document.createElement("p");
        totalTextDivLeft.classList.add("pp-total-text-div-left");
        totalTextDivLeft.innerText = "Total: ";
        totalTextDiv.appendChild(totalTextDivLeft);

        const creditInputDivTitle = document.createElement("input");
        creditInputDivTitle.classList.add("pp-credit-input");
        creditInputDivTitle.placeholder = "R$ xxx,xx";
        totalTextDiv.appendChild(creditInputDivTitle);

        const closeCartBtn = btn("Fechar compra", "pp-close-cart-btn", async () => {
            const response = await fetch("/api/credit_transaction/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: userId,
                    transaction_type: "credit",
                    transaction_value: creditInputDivTitle.value,
                })
            });
            const data = await response.json();
            console.log(data)

            router.navigate("/pay-confirmation")
        });
        totalDiv.appendChild(closeCartBtn);

        // Lógica dos checkboxes
        function uncheckCheckbox() {
            if (!creditCardCheckbox.checked) {
                creditCardCheckbox.checked = true;
            } else if (!pixCheckbox.checked) {
                pixCheckbox.checked = true;
            } else if (!paymentSlipCheckbox.checked) {
                paymentSlipCheckbox.checked = true;
            }
        }

		return mainDiv;

	} catch (error) {
		console.error("Erro ao buscar o carrinho:", error);
	}
}