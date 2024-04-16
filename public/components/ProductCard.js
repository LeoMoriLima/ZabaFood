import btn from "./ButtonComponent.js"

const discount = 0.92;

export default async (id) => {
	try {
    const response = await fetch(`http://108.61.49.221:3000/api/product/${id}`, {
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
	imgDiv.classList.add("product-img");
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

	const unitBtn = btn("Unidade", "unit-btn", async () => productQuantity = 1);
	quantityDiv.appendChild(unitBtn);

	const buy3Btn = btn("Compre 3", "buy-3-btn", async () => productQuantity = 3);
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
			const cart_id_response = await fetch(`http://108.61.49.221:3000/api/cart/${user_id}`, {
				method: "GET",
				headers: {
                    "Content-Type": "application/json"
                }
			});
			const cartData = await cart_id_response.json();


            const response = await fetch("http://108.61.49.221:3000/api/item_product/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    // cart_id: ,
                    product_id: id,
					quantity: data.quantity,
					price_unity: data.quantity > 2 ? (data.value * discount) : data.value,
					total_item: quantity * price_unity
                })
            });
            const data = await response.json();

            // if (data.success) {
            //     window.route({ preventDefault: () => {}, target: { href: "/login" } });
            // } else{
            //     alert("Erro ao efetuar registro");
            // }
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