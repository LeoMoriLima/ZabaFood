import ProductCard from "./ProductCard.js";
import ButtonComponent from "./ButtonComponent.js";

export default async () => {
    try {
        let min = 1;
        let max = 12;

        const productsMain = document.createElement("main");
        productsMain.classList.add("products-main");

        const productsList = document.createElement("div");
        productsList.classList.add("products-list");
        productsMain.appendChild(productsList);

        const loadMoreButton = ButtonComponent("Carregar mais", "button-load-more", async (button) => {
            min += 12
            max += 12

            const products = await generateProducts(productsList, min, max);

            if (products.length < 12) {
                button.remove();
            }
        })

        const products = await generateProducts(productsList, min, max);

        if (products.length >= 12) {
            productsMain.appendChild(loadMoreButton);
        }

        productsMain.appendChild(loadMoreButton);
        return productsMain;
    } catch (error) {
        console.error(error);
    }
}

const getProducts = async (min, max) => {
    const response = await fetch(`/api/product/interval?min=${min}&max=${max}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
}


const generateProducts = async (append, min, max) => {
    const products = await getProducts(min, max);
    const productCardsPromises = products.map(async (product) => {
        return await ProductCard(product.id);
    });

    const productCards = await Promise.all(productCardsPromises);
    productCards.forEach((card) => {
        append.appendChild(card);
    });

    return products;
}
