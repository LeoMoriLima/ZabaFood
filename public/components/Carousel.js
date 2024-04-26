import productCard from "../components/ProductCard.js";
import ArrowButton from "./ArrowButton.js";
import LoadingComponent from "./LoadingComponent.js";

export default async () => {
    let min = 1;
    let max = 3;

    const carousel = document.createElement("div");
    carousel.classList.add("carousel");

    const carouselText = document.createElement("p");
    carouselText.classList.add("main-div-text");
    carouselText.innerText = "CONFIRA OS PRODUTOS MAIS VENDIDOS";
    carousel.appendChild(carouselText);

    const carouselContainer = document.createElement("div");
    carouselContainer.classList.add("carousel-container");
    carousel.appendChild(carouselContainer);


    carouselContainer.appendChild(ArrowButton("back", "arrow-back", true, async function (arrow) {
        if (arrow.disabled) {
            return
        }

        const backArrow = arrow;
        const nextArrow = document.getElementById("arrow-next");

        backArrow.disabled = true;
        nextArrow.disabled = true;

        min -= 3;
        max -= 3;

        productsDiv.innerHTML = "";

        await generateCarousel(productsDiv, min, max);

        min !== 1 ? backArrow.disabled = false : backArrow.disabled = true;
        max !== 12 ? nextArrow.disabled = false : nextArrow.disabled = true;
    }))

    const productsDiv = document.createElement("div");
    productsDiv.classList.add("carousel-product-div");
    carouselContainer.appendChild(productsDiv);

    setTimeout(async () => {
        await generateCarousel(productsDiv, min, max);
    }, 0);


    carouselContainer.appendChild(ArrowButton("next", "arrow-next", false, async function (arrow) {
        if (arrow.disabled) {
            return
        }

        const nextArrow = arrow;
        const backArrow = document.getElementById("arrow-back");

        nextArrow.disabled = true
        backArrow.disabled = true
        min += 3;
        max += 3;

        productsDiv.innerHTML = "";
        await generateCarousel(productsDiv, min, max);

        max !== 12 ? nextArrow.disabled = false : nextArrow.disabled = true;
        min !== 1 ? backArrow.disabled = false : backArrow.disabled = true;
    }))

    return carousel;
}

const getProducts = async (min, max) => {
    try {
        const response = await fetch(`/api/product/interval?min=${min}&max=${max}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error);
    }
}

const generateCarousel = async (element, min, max) => {
    const loadingComponent = LoadingComponent(10);

    element.appendChild(loadingComponent);

    const products = await getProducts(min, max);
    const productCards = await Promise.all(products.map(async (product) => {
        return await productCard(product.id);
    }));

    loadingComponent.remove();

    productCards.forEach((card) => {
        element.appendChild(card);
    });
}