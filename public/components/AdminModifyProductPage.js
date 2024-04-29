import ButtonComponent from "./ButtonComponent.js";
import LoadingComponent from "./LoadingComponent.js";
import MessageComponent from "./MessageComponent.js";
import inputEntry from "./InputEntry.js";

export default async () => {
    const modifyPageDiv = document.createElement("div");
    modifyPageDiv.classList.add("modify-page-div");

    const modifyTitle = document.createElement("h1");
    modifyTitle.classList.add("h1-modify-page");
    modifyTitle.innerText = "Produtos cadastrados";
    modifyPageDiv.appendChild(modifyTitle);

    const modifyProductDiv = document.createElement("div");
    modifyProductDiv.classList.add("modify-page-product-div");
    modifyPageDiv.appendChild(modifyProductDiv);

    const modalDiv = document.createElement("div");
    modalDiv.classList.add("product-modify-page-modal-div");
    modalDiv.style.display = "none";
    modifyPageDiv.appendChild(modalDiv);

    for (let i = 0; i < 10; i++) {

        const skeletonDiv = document.createElement("div");
        skeletonDiv.classList.add("all-products-div-modify-page");
        skeletonDiv.id = `skeleton-${i}`;
        skeletonDiv.classList.add('skeleton-modify-product-page');
        modifyProductDiv.appendChild(skeletonDiv);

        const firstLoading = LoadingComponent(5);
        skeletonDiv.appendChild(firstLoading);

    }
    setTimeout(async () => {     
        
        const productData = await getAllProduct();
        
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                const skeleton = document.querySelector(`#skeleton-${i}`);
                if(skeleton) {
                    skeleton.remove();
                }
            }
        }, 1000);

        modifyProductDiv.style.overflowY = "auto";

        const products = productData.filter((product) => !product.deleted);

        products.forEach((product) => {
            const div = document.createElement("div");
            div.classList.add("all-products-div-modify-page");
            modifyProductDiv.appendChild(div);

            const productImgDiv = document.createElement("div");
            productImgDiv.classList.add("all-products-image-div-modify");
            div.appendChild(productImgDiv);

            const img = document.createElement("img");
            img.src = product.url_img;
            img.classList.add("product-image-modify-page");
            productImgDiv.appendChild(img);

            const productTextDiv = document.createElement("div");
            productTextDiv.classList.add("product-text-div-modify-page");
            div.appendChild(productTextDiv);

            const productName = document.createElement("p");
            productName.classList.add("product-name-modify-page");
            productName.innerText = product.name;
            productTextDiv.appendChild(productName);

            const productPrice = document.createElement("p");
            productPrice.classList.add("product-price-modify-page");
            const value = Number(product.value);
            const formattedValue = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            productPrice.innerText = formattedValue;
            productTextDiv.appendChild(productPrice);

            const productStock = document.createElement("p");
            productStock.classList.add("product-stock-modify-page");
            productStock.innerText = "Estoque: " + product.stock;
            productTextDiv.appendChild(productStock);

            const productButtonDiv = document.createElement("div");
            productButtonDiv.classList.add("product-button-div-modify-page");
            div.appendChild(productButtonDiv);

            productButtonDiv.appendChild(
                ButtonComponent("Modificar", "product-button-modify", async () => {
                    modalDiv.style.display = "flex";

                    setTimeout(async () => {
                        const modalContent = document.createElement("div");
                        modalContent.classList.add("product-modify-page-modal-content-div");
                        modalDiv.appendChild(modalContent);

                        const loading = LoadingComponent(5);
                        modalContent.appendChild(loading);

                        const selectProductType = document.createElement("select");
                        selectProductType.classList.add("select-product-type");
                        selectProductType.id = "select-product-modify-page";

                        const optionBase = document.createElement("option");
                        optionBase.classList.add("product-type-option");
                        optionBase.innerText = "Selecione a categoria do produto";
                        optionBase.value = 1;
                        selectProductType.appendChild(optionBase);

                        const option = await getAllProductType(selectProductType);
                        const info = await getProductById(product.id);

                        loading.remove();

                        modalDiv.addEventListener("click", () => {
                            modalDiv.style.display = "none";
                            modalContent.remove();
                        });

                        modalContent.addEventListener("click", (event) => {
                            event.stopPropagation();
                        });

                        const closeIcon = document.createElement("img");
                        closeIcon.classList.add("close-modify-modal-icon");
                        closeIcon.src = "../assets/images/close-icon.svg";
                        modalContent.appendChild(closeIcon);

                        closeIcon.addEventListener("click", () => {
                            modalDiv.style.display = "none";
                            modalContent.remove();
                        });

                        const pId = document.createElement("p");
                        pId.classList.add("modal-text-info");
                        pId.innerText = "ID: " + product.id;
                        modalContent.appendChild(pId);

                        const divImageFileModal = document.createElement("div");
                        divImageFileModal.classList.add("div-image-file-modal");
                        divImageFileModal.id = "product-modify-image-div-modal";
                        modalContent.appendChild(divImageFileModal);

                        const imagePreviewModal = document.createElement("div");
                        imagePreviewModal.classList.add("image-preview-modal");
                        divImageFileModal.appendChild(imagePreviewModal);

                        const divImageTextModal = document.createElement("div");
                        divImageTextModal.classList.add("div-image-text-modal");
                        divImageFileModal.appendChild(divImageTextModal);

                        const pFile = document.createElement("p");
                        pFile.innerText = "Foto do Produto";
                        pFile.classList.add("p-file-admin-modal");
                        divImageTextModal.appendChild(pFile);

                        const labelFile = document.createElement("label");
                        labelFile.innerText = "Selecionar arquivo";
                        labelFile.classList.add("label-file-modal");
                        labelFile.setAttribute("for", "input-admin-file-modal");
                        divImageTextModal.appendChild(labelFile);

                        const imageInputModal = document.createElement("input");
                        imageInputModal.type = "file";
                        imageInputModal.id = "input-admin-file-modal";
                        imageInputModal.value = "";
                        divImageTextModal.appendChild(imageInputModal);

                        imageInputModal.addEventListener("change", (event) => {
                            const file = event.target.files[0];

                            if (file) {
                                const readerModal = new FileReader();
                                imagePreviewModal.innerHTML = "";

                                readerModal.onload = (e) => {
                                    const imageUrl = e.target.result;
                                    const img = document.createElement("img");
                                    img.src = imageUrl;
                                    img.alt = "Preview Image";
                                    img.style.maxWidth = "100%";
                                    img.style.height = "100%";
                                    imagePreviewModal.appendChild(img);
                                };

                                readerModal.readAsDataURL(file);
                            }
                        });

                        const imgProductModal = document.createElement("img");
                        imgProductModal.alt = "Preview Image";
                        imgProductModal.style.maxWidth = "100%";
                        imgProductModal.style.height = "100%";
                        imgProductModal.src = info.url_img;
                        imagePreviewModal.appendChild(imgProductModal);

                        const valueInfo = Number(info.value);
                        const formattedValueInfo = valueInfo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                        const descriptionTextArea = document.createElement("textarea");
                        descriptionTextArea.classList.add("description-text-area-modal");
                        descriptionTextArea.placeholder = info.description;
                        modalContent.appendChild(
                            inputEntry(info.name, "text", "input-modify-admin-name", "none")
                        );
                        modalContent.appendChild(selectProductType);
                        modalContent.appendChild(
                            inputEntry(
                                info.stock,
                                "number",
                                "input-modify-admin-stock",
                                "none"
                            )
                        );
                        modalContent.appendChild(
                            inputEntry(
                                formattedValueInfo,
                                "number",
                                "input-modify-admin-value",
                                "none"
                            )
                        );
                        modalContent.appendChild(descriptionTextArea);

                        const buttonSendModify = ButtonComponent(
                            "Enviar",
                            "product-button-send-modify",
                            async () => {
                                const productInputName = document.getElementById(
                                    "input-modify-admin-name"
                                );
                                const productInputValue = document.getElementById(
                                    "input-modify-admin-value"
                                );
                                const productInputStock = document.getElementById(
                                    "input-modify-admin-stock"
                                );

                                if (productInputName.value === "") {
                                    productInputName.value = info.name;
                                }

                                if (productInputValue.value === "") {
                                    productInputValue.value = info.value;
                                }

                                if (productInputStock.value === "") {
                                    productInputStock.value = info.stock;
                                }

                                if (selectProductType.value === "1") {
                                    selectProductType.value = info.type_id;
                                }

                                const formData = new FormData();
                                formData.append("name", productInputName.value);
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
                                        const response = await fetch(`/api/product/${product.id}`, {
                                            method: "PUT",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify({
                                                name: productInputName.value || product.name,
                                                value: productInputValue.value || product.value,
                                                url_img: `../assets/uploads/${image}`,
                                                stock: productInputStock.value || product.stock,
                                                type_id: selectProductType.value || product.type_id,
                                                description:
                                                    descriptionTextArea.value || product.description,
                                            }),
                                        });

                                        if (response.ok) {
                                            MessageComponent("Produto modificado com sucesso", true);
                                            productName.innerText = productInputName.value;
                                            productPrice.innerText =
                                                "R$ " + Number(productInputValue.value).toFixed(2);
                                            productStock.value = productInputStock.value;
                                            descriptionTextArea.placeholder =
                                                descriptionTextArea.value;
                                            img.src = `../assets/uploads/${image}`;
                                            modalDiv.style.display = "none";
                                            modalDiv.innerHTML = "";
                                        } else {
                                            MessageComponent("Erro ao modificar produto", false);
                                        }
                                    } catch (error) {
                                        console.error("Erro ao fazer a requisição".error.message);
                                        throw new Error(
                                            "Erro ao fazer a requisição!",
                                            error.message
                                        );
                                    }
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        );
                        modalContent.appendChild(buttonSendModify);
                    }, 0);
                })
            );

            productButtonDiv.appendChild(
                ButtonComponent(
                    "Deletar",
                    "product-button-delete-product",
                    async () => {
                        try {
                            const result = await fetch(`/api/product/status/${product.id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });
                            if (result.ok) {
                                div.remove();
                                MessageComponent("Produto removido com sucesso", true);
                            } else {
                                MessageComponent("Erro ao remover produto", false);
                            }
                        } catch (error) {
                            return;
                        }
                    }
                )
            );
        });
    }, 0);

    return modifyPageDiv;
};

async function getAllProduct() {
    try {
        const result = await fetch("/api/product", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await result.json();
        return data;
    } catch (error) {
        return;
    }
}

async function getProductById(id) {
    try {
        const result = await fetch(`/api/product/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await result.json();
        return data;
    } catch (error) {
        return;
    }
}

async function getAllProductType(selectProductType) {
    try {
        const response = await fetch("/api/product_type", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();

        data.forEach((type) => {
            const option = document.createElement("option");
            option.innerText = type.type;
            option.classList.add("product-type-option");
            option.value = type.id;
            selectProductType.appendChild(option);
        });
    } catch (error) {
        console.log(error);
    }
}