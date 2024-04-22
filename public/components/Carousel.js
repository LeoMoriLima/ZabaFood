import productCard from "../components/ProductCard.js";
import ArrowButton from "./ArrowButton.js";
import LoadingComponent from "./LoadingComponent.js";

export default async () => {
    let min = 1;
    let max = 4;

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

        const backArrow = arrow
        const nextArrow = document.getElementById("arrow-next");

        if (max === 12) {
            nextArrow.disabled = false;
        }

        min -= 4;
        max -= 4;

        if (min === 1) {
            backArrow.disabled = true;
        }
        productsDiv.innerHTML = "";
        generateCarousel(productsDiv, min, max);
    }))

    const productsDiv = document.createElement("div");
    productsDiv.classList.add("carousel-product-div");
    carouselContainer.appendChild(productsDiv);

    setTimeout(async () => {
       await generateCarousel(productsDiv, min, max);
    }, 0);


    carouselContainer.appendChild(ArrowButton("next", "arrow-next", false, async function (arrow) {
        if (arrow.disabled) {
            console.log("Desativado");
            return
        }

        const nextArrow = arrow;
        const backArrow = document.getElementById("arrow-back");

        if (min === 1) {
            backArrow.disabled = false;
        }

        min += 4;
        max += 4;

        if (max === 12) {
            nextArrow.disabled = true;
        }
        productsDiv.innerHTML = "";
        generateCarousel(productsDiv, min, max);
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