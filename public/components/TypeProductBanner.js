import MessageComponent from "./MessageComponent.js";

export default (type) => {
    const typeBannerDiv = document.createElement("div");
    typeBannerDiv.classList.add("type-banner-div");

    const imgCategoryDiv = document.createElement("div");
    imgCategoryDiv.classList.add("img-category-filter-div");

    const imgCategoryTemplateLine = document.createElement("img");
    imgCategoryTemplateLine.src = "/assets/images/category_template_line.svg";
    imgCategoryTemplateLine.classList.add("line-category-template-filter");

    const imgCategoryTemplateFilled = document.createElement("img");
    imgCategoryTemplateFilled.src = "/assets/images/category_template_filled.svg";
    imgCategoryTemplateFilled.classList.add("filled-category-template-filter");

    const imgCategoryCircle = document.createElement("div");
    imgCategoryCircle.classList.add("circle-category-template-filter");
    const imgCategory = document.createElement("img");
    imgCategory.classList.add("img-category-filter");

    setTimeout(async () => {
        const typeData = await getProductTypeByType(type);
        imgCategory.src = typeData.url_img;
    }, 0);

    imgCategoryCircle.appendChild(imgCategory);

    imgCategoryDiv.appendChild(imgCategoryTemplateLine);
    imgCategoryDiv.appendChild(imgCategoryTemplateFilled);
    imgCategoryDiv.appendChild(imgCategoryCircle);

    typeBannerDiv.appendChild(imgCategoryDiv);

    const typeH2 = document.createElement("h1");
    typeH2.innerText = decodeURIComponent(type).toUpperCase();

    typeBannerDiv.appendChild(typeH2);

    return typeBannerDiv;
}

const getProductTypeByType = async (type) => {
    try {
        const response = await fetch(`/api/product_type/type/${decodeURIComponent(type)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        MessageComponent("Erro ao buscar imagem", false);
        console.log(error);
    }
}