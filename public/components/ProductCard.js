import btn from "./ButtonComponent.js"

const discount = 0.92;

export default async (id) => {
	try {
    const response = await fetch(`/api/product/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();

	const mainDiv = document.createElement("div");
	mainDiv.classList.add("product-card");

	const imgDiv = document.createElement("img");
	imgDiv.src = data.url_img;
	imgDiv.classList.add("card-product-img");
	mainDiv.appendChild(imgDiv);

	const productTitleDiv = document.createElement("div");
	productTitleDiv.classList.add("product-title-div");
	mainDiv.appendChild(productTitleDiv);

	const productTitle = document.createElement("p");
	productTitle.classList.add("product-title");
	productTitle.innerText = data.name;
	productTitleDiv.appendChild(productTitle);

	const quantityDiv = document.createElement("div");
	quantityDiv.classList.add("quantity-div");
	mainDiv.appendChild(quantityDiv);

	const unitBtn = btn("Unidade", "selected-btn", async () => {
		// productQuantity = 1;
		unitBtn.classList.add('selected-btn');
		unitBtn.classList.remove('deselected-btn');
		buy3Btn.classList.add('deselected-btn');
		buy3Btn.classList.remove('selected-btn');
	});
	quantityDiv.appendChild(unitBtn);

	const buy3Btn = btn("Compre 3", "deselected-btn", async () => {
		// productQuantity = 3;
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
	unitPrice.innerText = `R$ ${(data.value * 1).toFixed(2)}`;
	unitPriceDiv.appendChild(unitPrice);

	const buy3PriceDiv = document.createElement("div");
	buy3PriceDiv.classList.add("buy-3-price-div");
	priceDiv.appendChild(buy3PriceDiv);

	const buy3FullPrice = document.createElement("p");
	buy3FullPrice.classList.add("buy-3-full-price");
	buy3FullPrice.innerText = `R$ ${(data.value * 3).toFixed(2)}`;
	buy3PriceDiv.appendChild(buy3FullPrice);

	const buy3DiscountPrice = document.createElement("p");
	buy3DiscountPrice.classList.add("buy-3-discount-price");
	buy3DiscountPrice.innerText = `R$ ${((data.value * 3) * discount).toFixed(2)}`;
	buy3PriceDiv.appendChild(buy3DiscountPrice);

	const addBtnDiv = document.createElement("div");
	addBtnDiv.classList.add("add-btn-div");
	mainDiv.appendChild(addBtnDiv);

	const shopIcon = document.createElement("img");
	shopIcon.src = "../assets/images/shop-icon.svg";
	shopIcon.classList.add("shop-icon");
	addBtnDiv.appendChild(shopIcon);

	const addBtn = btn("Adicionar", "add-btn", async () => {
        try {
			const userResponse = await fetch('/api/login', {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			});
			const userData = await userResponse.json();
			
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
					quantity: unitBtn.classList.contains("selected-btn") ? 1: 3,
                })
            });
            const data = await response.json();

        } catch (error) {
            console.error("Erro ao adicionar produtos ao carrinho:", error);
        }
	})
	addBtnDiv.appendChild(addBtn);

	return mainDiv;


	} catch (error) {
		console.error("Erro ao fazer login:", error);
	}

}