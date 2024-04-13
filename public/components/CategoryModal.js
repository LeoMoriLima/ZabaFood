export default(img_source, title, id) => {
    const divCategory = document.createElement("div");
    divCategory.classList.add("category-modal");
    divCategory.id = id;

    const imgCategory = document.createElement("img");
    imgCategory.src = img_source;
    imgCategory.classList.add("img-category");

    const textCategory = document.createElement("p");
    textCategory.innerText = title;
    textCategory.classList.add("title-category-modal");

    divCategory.appendChild(imgCategory);
    divCategory.appendChild(textCategory);

    return divCategory;
}