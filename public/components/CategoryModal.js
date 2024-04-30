import router from "../js/routes.js";
import TextA from "./Text-a.js";

export default async () => {

    const getAllProductType = async () => {
        try {
            const response = await fetch(`/api/product_type`, {
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

    const divModal = document.createElement("div");
    divModal.id = "div-modal-category";
    const listCategory = document.createElement("ul");
    listCategory.classList.add("list-category");
    divModal.appendChild(listCategory);

    setTimeout(async () => {
        const productTypes = await getAllProductType();
        productTypes.forEach((type, index) => {

            const elementListCategory = document.createElement("li");
            elementListCategory.classList.add("element-list-category");
            elementListCategory.style.setProperty('--index', index);
            const divCategory = document.createElement("div");

            const imgCategoryDiv = document.createElement("div");
            imgCategoryDiv.classList.add("img-category-div");

            const imgCategoryTemplateLine = document.createElement("img");
            imgCategoryTemplateLine.src = "/assets/images/category_template_line.svg";
            imgCategoryTemplateLine.classList.add("line-category-template");

            const imgCategoryCircle = document.createElement("div");
            imgCategoryCircle.classList.add("circle-category-template");
            const imgCategory = document.createElement("img");
            imgCategory.classList.add("img-category");
            imgCategory.src = type.url_img;
            imgCategoryCircle.appendChild(imgCategory);

            imgCategoryDiv.appendChild(imgCategoryTemplateLine);
            imgCategoryDiv.appendChild(imgCategoryCircle);


            const TextType = TextA(`${type.type}`, 'none', 'buttons-type', `/products/type/${type.type}`);

            TextType.classList.add("text-category-modal");
            divCategory.classList.add("div-category");

            divCategory.appendChild(imgCategoryDiv);
            divCategory.appendChild(TextType);
            elementListCategory.appendChild(divCategory);
            listCategory.appendChild(elementListCategory);
            divCategory.onclick = (e) => {
                e.preventDefault();
                router.navigate(`/products/type/${type.type}`)
            }

        });
    }, 0);

    return divModal;
}
