import ButtonComponent from "./ButtonComponent.js";
import LoadingComponent from "./LoadingComponent.js";
import MessageComponent from "./MessageComponent.js";
import inputEntry from "./inputEntry.js";

export default async () => {
    const productTypeDiv = document.createElement("div");
    productTypeDiv.classList.add("product-type-page-div");

    const h1ProductType = document.createElement("h1");
    h1ProductType.classList.add("h1-product-type-page");
    h1ProductType.innerText = "Tipos de produtos"
    productTypeDiv.appendChild(h1ProductType);

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("product-type-main-div");
    productTypeDiv.appendChild(mainDiv)

    const addProductTypeDiv = document.createElement("div");
    addProductTypeDiv.classList.add("add-product-type-div");
    mainDiv.appendChild(addProductTypeDiv);

    const h2AddProductType = document.createElement("h2");
    h2AddProductType.innerText = "Adicionar novo tipo de produto"
    h2AddProductType.classList.add("h2-product-type-div");
    addProductTypeDiv.appendChild(h2AddProductType);

    const divImageFile = document.createElement("div");
    divImageFile.classList.add("div-image-file-product-type");
    addProductTypeDiv.appendChild(divImageFile);

    const imagePreview = document.createElement("div");
    imagePreview.classList.add("image-preview-product-type");
    divImageFile.appendChild(imagePreview);

    const divImageText = document.createElement("div");
    divImageText.classList.add("div-image-text-product-type");
    divImageFile.appendChild(divImageText);

    const pFile = document.createElement("p");
    pFile.innerText = "Ícone da categoria";
    pFile.classList.add("p-file-admin-product-type");
    divImageText.appendChild(pFile)

    const labelFile = document.createElement("label");
    labelFile.innerText = "Selecionar arquivo";
    labelFile.classList.add("label-file-product-type");
    labelFile.setAttribute("for", "input-admin-file-product-type");
    divImageText.appendChild(labelFile)

    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.id = "input-admin-file-product-type";
    divImageText.appendChild(imageInput);

    imageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const imageUrl = e.target.result;
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "Preview Image";
                img.style.maxWidth = "100%";
                img.style.height = "100%";
                imagePreview.innerHTML = "";
                imagePreview.appendChild(img);
            };

            reader.readAsDataURL(file);
        };
    });

    addProductTypeDiv.appendChild(inputEntry("Nome do produto", "text", "input-product-type-name", "none"))

    const allProductTypeDiv = document.createElement("div");
    allProductTypeDiv.classList.add("all-product-type-page-div");
    mainDiv.appendChild(allProductTypeDiv);

    const divTopAllProductType = document.createElement("div");
    divTopAllProductType.classList.add("all-product-type-top");
    allProductTypeDiv.appendChild(divTopAllProductType)

    const pProductType = document.createElement("p");
    pProductType.classList.add("p-product-type-top");
    pProductType.innerText = "Tipos de produtos"
    divTopAllProductType.appendChild(pProductType);

    const pEditProductType = document.createElement("p");
    pEditProductType.classList.add("p-product-type-top");
    pEditProductType.innerText = "Editar"
    divTopAllProductType.appendChild(pEditProductType);

    const pDeleteProductType = document.createElement("p");
    pDeleteProductType.classList.add("p-product-type-top");
    pDeleteProductType.innerText = "Deletar"
    divTopAllProductType.appendChild(pDeleteProductType);

    const divBodyProductType = document.createElement("div");
    divBodyProductType.classList.add("div-body-product-type");
    allProductTypeDiv.appendChild(divBodyProductType);

    addProductTypeDiv.appendChild(ButtonComponent("Criar", "product-type-button-send", (async () => {
        const name = document.getElementById("input-product-type-name");
        const formData = new FormData();
        formData.append("name", name.value);
        formData.append("file", imageInput.files[0])
        try {

            const response = await fetch('/upload_file', {
                method: 'POST',
                body: formData,
            });
            const image = await response.json();

            try {

                const response = await fetch('/api/product_type', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        type: name.value,
                        url_img: `/assets/uploads/${image.filename}`
                    })
                })
                divBodyProductType.innerHtml = ""
            } catch (error) {
                return;
            } finally {
                name.value = "";
                imageInput.value = "";
                imagePreview.innerHTML = "";
                setTimeout(async () => {
                    const rightPage = await createAllRightPage(divBodyProductType, productTypeDiv);
                    divBodyProductType.appendChild(rightPage);
                }, 0);
            }
        } catch (error) {
            console.log(error);
            return;
        }
    })));

    setTimeout(async () => {
        const skeletonDiv = document.createElement("div");
        skeletonDiv.classList.add("product-type-page-right-div");
        skeletonDiv.id = `skeleton-product-type-div`
        divBodyProductType.appendChild(skeletonDiv);

        const loading = LoadingComponent(5);
        skeletonDiv.appendChild(loading);

        const rightPage = await createAllRightPage(divBodyProductType, productTypeDiv);
        divBodyProductType.appendChild(rightPage);

        skeletonDiv.remove();

    }, 0);

    return productTypeDiv;
}

async function createAllRightPage(divBodyProductType, productTypeDiv) {

    const rightPageDiv = document.createElement("div");
    rightPageDiv.classList.add("product-type-page-right-div")


    try {
        const response = await fetch('/api/product_type', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const productTypeData = await response.json();

        const modalProductType = document.createElement("div");
        modalProductType.classList.add("modal-product-type");
        modalProductType.style.display = "none";
        productTypeDiv.appendChild(modalProductType);

        productTypeData.forEach(type => {
            const divInfo = document.createElement("div");
            divInfo.classList.add("div-info-body-product-type");
            rightPageDiv.appendChild(divInfo);

            const divColumnOne = document.createElement("div");
            divColumnOne.classList.add("div-column-one");
            divInfo.appendChild(divColumnOne);

            const divColumnTwo = document.createElement("div");
            divColumnTwo.classList.add("div-column-two");
            divInfo.appendChild(divColumnTwo);

            const divColumnThree = document.createElement("div");
            divColumnThree.classList.add("div-column-three");
            divInfo.appendChild(divColumnThree);

            const pInfo = document.createElement("p");
            pInfo.classList.add("p-product-type");
            pInfo.innerText = type.type
            divColumnOne.appendChild(pInfo);

            const editIcon = document.createElement("img");
            editIcon.classList.add("table-product-type-icon");
            editIcon.src = "../assets/images/edit-icon.svg";
            divColumnTwo.appendChild(editIcon);

            editIcon.addEventListener("click", async () => {
                if (modalProductType.style.display === "flex") {
                    return
                }

                modalProductType.style.display = "flex"
                editIcon.style.pointerEvents = "none";

                modalProductType.addEventListener("click", () => {
                    modalContent.remove();
                    modalProductType.style.display = "none";
                    editIcon.style.pointerEvents = "auto";
                    modalProductType.innerHTML = ""
                    modalProductType.removeEventListener("click");
                });

                const data = await getProductType(type.id);

                modalProductType.innerHTML = ""

                const modalContent = document.createElement("div");
                modalContent.classList.add("modal-content-product-type");
                modalProductType.appendChild(modalContent)

                modalContent.addEventListener("click", (event) => {
                    event.stopPropagation();
                });

                const h2ModalProductType = document.createElement("h2");
                h2ModalProductType.innerText = "Atualizar tipo de produto";
                h2ModalProductType.classList.add("h2-product-type-div");
                modalContent.appendChild(h2ModalProductType)

                const divImageFileModal = document.createElement("div");
                divImageFileModal.classList.add("div-image-file-product-type-modal");
                modalContent.appendChild(divImageFileModal);

                const imagePreviewModal = document.createElement("div");
                imagePreviewModal.classList.add("image-preview-product-type-modal");
                divImageFileModal.appendChild(imagePreviewModal);

                const divImageTextModal = document.createElement("div");
                divImageTextModal.classList.add("div-image-text-product-type");
                divImageFileModal.appendChild(divImageTextModal);

                const pFileModal = document.createElement("p");
                pFileModal.innerText = "Ícone da categoria";
                pFileModal.classList.add("p-file-admin-product-type");
                divImageTextModal.appendChild(pFileModal)

                const labelFileModal = document.createElement("label");
                labelFileModal.innerText = "Selecionar arquivo";
                labelFileModal.classList.add("label-file-product-type-modal");
                labelFileModal.setAttribute("for", "input-admin-file-product-type-modal");
                divImageTextModal.appendChild(labelFileModal)

                const imageInputModal = document.createElement("input");
                imageInputModal.type = "file";
                imageInputModal.id = "input-admin-file-product-type-modal";
                divImageTextModal.appendChild(imageInputModal);

                imageInputModal.addEventListener("change", (event) => {
                    const file = event.target.files[0];

                    if (file) {
                        const reader = new FileReader();
                        imagePreviewModal.innerHTML = "";

                        reader.onload = (e) => {
                            const imageUrl = e.target.result;
                            const img = document.createElement("img");
                            img.src = imageUrl;
                            img.alt = "Preview Image";
                            img.style.maxWidth = "100%";
                            img.style.height = "100%";
                            imagePreviewModal.innerHTML = "";
                            imagePreviewModal.appendChild(img);
                        };

                        reader.readAsDataURL(file);
                    };
                });

                const imgProductModal = document.createElement("img");
                imgProductModal.alt = "Preview Image";
                imgProductModal.style.maxWidth = "100%";
                imgProductModal.style.height = "100%";
                imagePreviewModal.appendChild(imgProductModal);
                if (typeof data.url_img === 'string' && data.url_img.trim() !== '') {
                    imgProductModal.src = data.url_img;
                } else {
                    imgProductModal.remove();
                }

                modalContent.appendChild(inputEntry(type.type, "text", "input-product-type-modal-content", "none"))

                const closeIcon = document.createElement("img");
                closeIcon.classList.add("close-modify-modal-icon");
                closeIcon.src = "../assets/images/close-icon.svg";
                modalContent.appendChild(closeIcon);

                closeIcon.addEventListener("click", () => {
                    modalContent.remove();
                    modalProductType.style.display = "none";
                    editIcon.style.pointerEvents = "auto";
                    modalProductType.innerHTML = ""
                    modalProductType.removeEventListener("click");
                });

                modalContent.appendChild(ButtonComponent("Atualizar", "product-type-modal-button", (async () => {
                    const productTypeName = document.getElementById("input-product-type-modal-content");

                    const formData = new FormData();
                    formData.append("name", productTypeName.value);
                    formData.append("file", imageInputModal.files[0]);

                    try {
                        let image;

                        if (!imageInputModal.files[0]) {
                            const src = product.url_img;
                            image = src.split("/").pop();
                        } else {
                            const response = await fetch("/upload_file", {
                                method: "POST",
                                body: formData,
                            });
                            const responseJson = await response.json();
                            image = responseJson.filename;
                        }

                        try {
                            const updateResponse = await fetch(`/api/product_type/${type.id}`, {
                                method: 'PUT',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    type: productTypeName.value || type.type,
                                    url_img: `/assets/uploads/${image}`,
                                })
                            })

                            if (updateResponse.ok) {
                                modalContent.remove();
                                modalProductType.style.display = "none";
                                pInfo.innerText = productTypeName.value
                                MessageComponent("Categoria do produto atualizada com sucesso!", true)
                            } else {
                                MessageComponent("Erro ao atualizar a categoria do produto!", false)
                            }
                        } catch (error) {
                            return;
                        }
                    } catch (error) {
                        console.log(error)
                    }
                })))
            })

            const deleteIcon = document.createElement("img");
            deleteIcon.classList.add("table-product-type-icon");
            deleteIcon.src = "../assets/images/delete-icon.svg";
            divColumnThree.appendChild(deleteIcon);

            deleteIcon.addEventListener("click", async () => {
                try {
                    const deleteResponse = await fetch(`/api/product_type/${type.id}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });

                    if (deleteResponse.ok) {
                        MessageComponent("Categoria excluida com sucesso!", true)
                        divInfo.remove()
                    } else {
                        MessageComponent("Erro ao excluir categoria!", false)
                    }

                } catch (error) {
                    return;
                }
            })
        });


    } catch (error) {
        return;
    }
    return rightPageDiv;
}

async function getProductType(id) {
    try {
        const response = await fetch(`/api/product_type/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        return data;
    } catch (error) {
        return
    }
}