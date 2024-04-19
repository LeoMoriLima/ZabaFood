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

    const productTypes = await getAllProductType();

    const divModal = document.createElement("div");
    divModal.id = "div-modal-category";
    const listCategory = document.createElement("ul");
    listCategory.classList.add("list-category");
    divModal.appendChild(listCategory);

    productTypes.forEach(type => {

        const elementListCategory = document.createElement("li");
        const divCategory = document.createElement("div");
        const imgCategory = document.createElement("div");
        const TextType = TextA(`${type.type}`, 'none', 'buttons-type', `/products/${type.type}`);

        TextType.classList.add("text-category-modal");
        divCategory.classList.add("div-category");
        imgCategory.classList.add("img-category");
        elementListCategory.classList.add("element-list-category");

        divCategory.appendChild(imgCategory);
        divCategory.appendChild(TextType);
        elementListCategory.appendChild(divCategory);
        listCategory.appendChild(elementListCategory);

    });
    return divModal;
}