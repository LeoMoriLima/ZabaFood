import MainProductCard from "./MainProductCard.js";
import ProductCardRecommended from "./ProductCardRecommended.js";
import MainProductSkeleton from "./MainProductSkeleton.js";
import ProductCardRecommendedSkeleton from "./ProductCardRecommendedSkeleton.js";


export default async (id) => {
    const main = document.createElement("main");
    main.classList.add("product-main")
    const mainProductDiv = document.createElement("div")
    mainProductDiv.classList.add("main-product-div")
    main.appendChild(mainProductDiv)
    const mainProductSkeleton = MainProductSkeleton()
    mainProductDiv.appendChild(mainProductSkeleton)

    setTimeout(async () => {
        const product = await getProduct(id)
        descriptionContent.textContent = product.description;
        const mainProductCard = await MainProductCard(product)
        mainProductSkeleton.remove()
        mainProductDiv.appendChild(mainProductCard)
        await generateRecommended(recommendedProductsDiv)
    }, 0);


    const recomendedH2 = document.createElement("h2")
    recomendedH2.innerText = "Quem viu esse, também levou esses :)"
    recomendedH2.classList.add("recommended-h2")
    main.appendChild(recomendedH2)

    const recommendedProductsDiv = document.createElement("div")
    recommendedProductsDiv.classList.add("product-card-recommended-div")
    main.appendChild(recommendedProductsDiv)

    for (let i = 0; i < 5; i++) {
        recommendedProductsDiv.appendChild(ProductCardRecommendedSkeleton(`skeleton-${i}`))
    }

    const descriptionDiv = document.createElement("div")
    descriptionDiv.classList.add("product-main-description")
    main.appendChild(descriptionDiv)

    const descriptionH1 = document.createElement("h2")
    descriptionH1.innerText = "Descrição do produto"
    descriptionDiv.appendChild(descriptionH1)

    const descriptionContent = document.createElement("p")

    descriptionDiv.appendChild(descriptionContent)

    return main;
}


const getProduct = async (id) => {
    const response = await fetch(`/api/product/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    return data;
}

const getRecommended = async (min, max) => {
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

const generateRecommended = async (append) => {
    const products = await getRecommended(1, 5);
    const productCards = await Promise.all(products.map(async (product) => {
        return await ProductCardRecommended(product.id);
    }));

    for (let i = 0; i < 5; i++) {
        document.getElementById(`skeleton-${i}`).remove()
    }

    productCards.forEach((card) => {
        append.appendChild(card);
    });
}