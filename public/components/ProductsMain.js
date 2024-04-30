import ProductCard from "./ProductCard.js";
import ButtonComponent from "./ButtonComponent.js";
import ProductCardSkeleton from "./ProductCardSkeleton.js";
import TypeProductBanner from "./TypeProductBanner.js";
import NotFound from "./NotFound.js";

export default async (params) => {
    const filter = params ? params.filter : undefined;
    const term = params ? params.term : undefined;
    try {
        let min = 1;
        let max = 12;

        const productsMain = document.createElement("main");
        productsMain.classList.add("products-main");

        if (filter === "type") {
            const typeBanner = TypeProductBanner(term)
            productsMain.appendChild(typeBanner)
        }

        const productsList = document.createElement("div");
        productsList.classList.add("products-list");
        productsMain.appendChild(productsList);

        const loadMoreButton = ButtonComponent("Carregar mais", "button-load-more", async (button) => {
            min += 12
            max += 12

            const products = await generateProducts(productsList, min, max, filter, term);

            if (products.length < 12) {
                button.remove();
            }
        })

        setTimeout(async () => {
            const products = await generateProducts(productsList, min, max, filter, term);

            if (products.length === 0) {
                const notFoundElement = await NotFound(term);
                productsMain.appendChild(notFoundElement);
            }
            if (products.length >= 12) {
                productsMain.appendChild(loadMoreButton);
            }
        }, 0);


        // productsMain.appendChild(loadMoreButton);
        return productsMain;
    } catch (error) {
        console.error(error);
    }
}

const getProducts = async (min, max, filter, term) => {
    let url;

    if (filter === "type") {
        url = `/api/product/interval?min=${min}&max=${max}&type=${term}`;
    } else if (filter === "search") {
        url = `/api/product/interval?min=${min}&max=${max}&search=${term}`;
    } else {
        url = `/api/product/interval?min=${min}&max=${max}`;
    }
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
}


const generateProducts = async (append, min, max, filter, term) => {

    for (let i = 0; i < 12; i++) {
        append.appendChild(ProductCardSkeleton(`skeleton-${i}`))
    }

    let products = filter ? await getProducts(min, max, filter, term) : await getProducts(min, max)
    if (products.length === 0) {
        for (let i = 0; i < 12; i++) {
            document.getElementById(`skeleton-${i}`).remove()
        }
        return products;
    }
    const productCardsPromises = products.map(async (product) => {
        return await ProductCard(product.id);
    });

    const productCards = await Promise.all(productCardsPromises);

    for (let i = 0; i < 12; i++) {
        document.getElementById(`skeleton-${i}`).remove()
    }

    productCards.forEach((card) => {
        append.appendChild(card);
    });

    return products;
}
