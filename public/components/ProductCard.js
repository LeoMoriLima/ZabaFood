import btn from "./ButtonComponent.js"
import router from "../js/routes.js";
import LoadingComponent from "./LoadingComponent.js";
import MessageComponent from "./MessageComponent.js";

const discount = 0.92;

export default async (id) => {
	try {
		const response = await fetch(`/api/product/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const productData = await response.json();

		const mainDiv = document.createElement("div");
		mainDiv.classList.add("product-card");

		const imgDiv = document.createElement("img");
		imgDiv.src = productData.url_img;
		imgDiv.classList.add("card-product-img");
		mainDiv.appendChild(imgDiv);
		imgDiv.addEventListener("click", () => {
			router.navigate(`/product/${id}`)
		})

		const productTitleDiv = document.createElement("div");
		productTitleDiv.classList.add("product-title-div");
		mainDiv.appendChild(productTitleDiv);

		productTitleDiv.addEventListener("click", () => {
			router.navigate(`/product/${id}`)
		})

		const productTitle = document.createElement("p");
		productTitle.classList.add("product-title");
		productTitle.innerText = productData.name;
		productTitleDiv.appendChild(productTitle);

		const quantityDiv = document.createElement("div");
		quantityDiv.classList.add("quantity-div");
		mainDiv.appendChild(quantityDiv);

		const unitBtn = btn("Unidade", "selected-btn", async () => {
			unitBtn.classList.add('selected-btn');
			unitBtn.classList.remove('deselected-btn');
			buy3Btn.classList.add('deselected-btn');
			buy3Btn.classList.remove('selected-btn');
		});
		quantityDiv.appendChild(unitBtn);

		const buy3Btn = btn("Compre 3", "deselected-btn", async () => {
			buy3Btn.classList.add('selected-btn');
			buy3Btn.classList.remove('deselected-btn');
			unitBtn.classList.add('deselected-btn');
			unitBtn.classList.remove('selected-btn');
		});
		quantityDiv.appendChild(buy3Btn);

		const priceDiv = document.createElement("div");
		priceDiv.classList.add("price-div");
		mainDiv.appendChild(priceDiv);

		const unitPriceDiv = document.createElement("div");
		unitPriceDiv.classList.add("unit-price-div");
		priceDiv.appendChild(unitPriceDiv);

		const unitPrice = document.createElement("p");
		unitPrice.classList.add("unit-price");
		unitPrice.innerText = `R$ ${(productData.value * 1).toFixed(2)}`;
		unitPriceDiv.appendChild(unitPrice);

		const buy3PriceDiv = document.createElement("div");
		buy3PriceDiv.classList.add("buy-3-price-div");
		priceDiv.appendChild(buy3PriceDiv);

		const buy3FullPrice = document.createElement("p");
		buy3FullPrice.classList.add("buy-3-full-price");
		buy3FullPrice.innerText = `R$ ${(productData.value * 3).toFixed(2)}`;
		buy3PriceDiv.appendChild(buy3FullPrice);

		const buy3DiscountPrice = document.createElement("p");
		buy3DiscountPrice.classList.add("buy-3-discount-price");
		buy3DiscountPrice.innerText = `R$ ${((productData.value * 3) * discount).toFixed(2)}`;
		buy3PriceDiv.appendChild(buy3DiscountPrice);

		const addBtnDiv = document.createElement("div");
		addBtnDiv.classList.add("add-btn-div");
		mainDiv.appendChild(addBtnDiv);

		const shopIcon = document.createElement("img");
		shopIcon.src = "/assets/images/shop-icon.svg";
		shopIcon.classList.add("shop-icon");
		addBtnDiv.appendChild(shopIcon);

		const addBtn = btn("Adicionar", "add-btn", async (button) => {
			try {
				const userResponse = await fetch('/api/login', {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});
				const userData = await userResponse.json();

				if (userData.error) {
					console.log("Não autenticado");
					router.navigate("/login")
					return
				}

				shopIcon.src = "/assets/images/simple-loading.svg";
				shopIcon.classList.add("loading-animation")
				button.disabled = true
				button.innerText = "Adicionando"

				const quantityValue = unitBtn.classList.contains("selected-btn") ? 1 : 3

				console.log("Quantity value:", quantityValue);

				if (productData.stock < 1 && quantityValue === 1) {
					throw "Estoque do produto insuficiente"
				}

				if (productData.stock < 3 && quantityValue === 3) {
					throw "Estoque do produto insuficiente"
				}

				const userId = userData.user.id;

				const cartResponse = await fetch(`/api/cart/user/${userId}`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				});

				const cart = await cartResponse.json();
				const cartId = cart.id;

				const response = await fetch("/api/cart_product/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						cart_id: cartId,
						product_id: id,
						quantity: quantityValue,
					})
				});
				const data = await response.json();

				shopIcon.classList.remove("loading-animation")
				shopIcon.src = "/assets/images/check-icon.svg";
				button.innerText = "Adicionado"
				setTimeout(() => {
					button.innerText = "Adicionar"
					shopIcon.src = "/assets/images/shop-icon.svg";
					button.disabled = false
				}, 1000);

				const event = new CustomEvent("productAdded");
				window.dispatchEvent(event);

			} catch (error) {
				shopIcon.classList.remove("loading-animation")
				shopIcon.src = "/assets/images/shop-icon.svg";
				button.innerText = "Adicionar"
				button.disabled = false
				MessageComponent(error, false)
				console.error("Erro ao adicionar produtos ao carrinho:", error);
			}
		})
		addBtnDiv.appendChild(addBtn);

		return mainDiv;


	} catch (error) {
		console.error("Erro ao fazer login:", error);
	}

}