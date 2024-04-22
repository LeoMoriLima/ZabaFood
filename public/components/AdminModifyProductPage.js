import ButtonComponent from "./ButtonComponent.js";
import inputEntry from "./inputEntry.js";

export default async () =>{
    const modifyPageDiv = document.createElement("div");
    modifyPageDiv.classList.add("modify-page-div");

    const modifyTitle = document.createElement("h1");
    modifyTitle.classList.add("h1-modify-page");
    modifyTitle.innerText = "Produtos cadastrados";
    modifyPageDiv.appendChild(modifyTitle);

    const modifyProductDiv = document.createElement("div");
    modifyProductDiv.classList.add("modify-page-product-div");
    modifyPageDiv.appendChild(modifyProductDiv);


    setTimeout(async () =>{
        const productData = await getAllProduct();

        productData.forEach(product => {
            const div = document.createElement("div");
            div.classList.add("all-products-div-modify-page")
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
            productPrice.innerText = "R$ " + product.value;
            productTextDiv.appendChild(productPrice);

            const productStock = document.createElement("p");
            productStock.classList.add("product-stock-modify-page");
            productStock.innerText = "Estoque: " + product.stock;
            productTextDiv.appendChild(productStock);

            const productButtonDiv = document.createElement("div");
            productButtonDiv.classList.add("product-button-div-modify-page");
            div.appendChild(productButtonDiv);

            productButtonDiv.appendChild(ButtonComponent("Modificar", "product-button-modify", (async () =>{
                const modalDiv = document.createElement("div");
                modalDiv.classList.add("product-modify-page-modal-div");
                modifyPageDiv.appendChild(modalDiv);

                modalDiv.addEventListener("click", () =>{
                    modalDiv.remove();
                })

                const modalContent = document.createElement("div");
                modalContent.classList.add("product-modify-page-modal-content-div");
                modalDiv.appendChild(modalContent);

                modalContent.addEventListener("click", (event) =>{
                    event.stopPropagation();
                })

                const closeIcon = document.createElement("img");
                closeIcon.classList.add("close-modify-modal-icon");
                closeIcon.src = "../assets/images/close-icon.svg";
                modalContent.appendChild(closeIcon);

                closeIcon.addEventListener("click", () =>{
                    modalDiv.remove();
                })

                const pId = document.createElement("p");
                pId.classList.add("modal-text-info");
                pId.innerText = "ID: " + product.id;
                modalContent.appendChild(pId)

                const divImageFile = document.createElement("div");
                divImageFile.classList.add("div-image-file");
                divImageFile.id = "product-modify-image-div";
                modalContent.appendChild(divImageFile);
            
                const imagePreview = document.createElement("div");
                imagePreview.classList.add("image-preview");
                divImageFile.appendChild(imagePreview);

                const imgProduct = document.createElement("img");
                imgProduct.alt = "Preview Image";
                imgProduct.style.maxWidth = "100%";
                imgProduct.style.height = "100%";
                imgProduct.src = product.url_img;
                imagePreview.appendChild(imgProduct);
            
                const divImageText = document.createElement("div");
                divImageText.classList.add("div-image-text");
                divImageFile.appendChild(divImageText);
            
                const pFile = document.createElement("p");
                pFile.innerText = "Foto do Produto";
                pFile.classList.add("p-file-admin");
                divImageText.appendChild(pFile)
            
                const labelFile = document.createElement("label");
                labelFile.innerText = "Selecionar arquivo";
                labelFile.classList.add("label-file");
                labelFile.setAttribute("for", "input-admin-file");
                divImageText.appendChild(labelFile)
            
                const imageInput = document.createElement("input");
                imageInput.type = "file";
                imageInput.id = "input-admin-file";
                imageInput.value = "";
                divImageText.appendChild(imageInput);

                imageInput.addEventListener("change", (event) => {
                    const file = event.target.files[0];
            
                    if(file){
                        const reader = new FileReader();
            
                        reader.onload = (e) => {
                            const imageUrl = e.target.result;
                            const img = document.createElement("img");
                            img.src = imageUrl;
                            img.alt = "Preview Image";
                            img.style.maxWidth = "100%";
                            img.style.height = "auto";
                            imagePreview.innerHTML = "";
                            imagePreview.appendChild(img);
                        };
            
                        reader.readAsDataURL(file);
                    };
                });

                const selectProductType = document.createElement("select");
                selectProductType.classList.add("select-product-type");
                selectProductType.id = "select-product-modify-page"

                const optionBase = document.createElement("option");
                optionBase.classList.add("product-type-option");
                optionBase.innerText = "Selecione a categoria do produto";
                optionBase.value = 1;
                selectProductType.appendChild(optionBase);

                setTimeout(async () =>{
                    getAllProductType(selectProductType);
                }, 0)             

                const descriptionTextArea = document.createElement("textarea");
                descriptionTextArea.classList.add("description-text-area");
                descriptionTextArea.placeholder = product.description;
                modalContent.appendChild(inputEntry(product.name, "text", "input-modify-admin-name", "none"));
                modalContent.appendChild(selectProductType);
                modalContent.appendChild(inputEntry(product.stock, "number", "input-modify-admin-stock", "none"));
                modalContent.appendChild(inputEntry("R$ " + product.value , "number", "input-modify-admin-value", "none"));
                modalContent.appendChild(descriptionTextArea);

                const buttonSendModify = ButtonComponent("Enviar", "product-button-send-modify", (async () =>{
                    const productInputName = document.getElementById("input-modify-admin-name");
                    const productInputValue = document.getElementById("input-modify-admin-value");
                    const productInputStock = document.getElementById("input-modify-admin-stock");
                    
                    submitForm(productInputName, productInputValue, productInputStock, selectProductType, descriptionTextArea, imageInput, product);

                    const formData = new FormData();
                    formData.append("name", productInputName.value);
                    formData.append("file", imageInput.files[0]);

                    try {            
                        let image;
                
                        if(!imageInput.files[0]){
                            const src = product.url_img
                            image = src.split('/').pop();
                        } else{
                            const response = await fetch('/upload_file', {
                                method: 'POST',
                                body: formData,
                            });
                            const responseJson = await response.json();
                            image = responseJson.filename;
                        }
                        try{
                            const response = await fetch(`/api/product/${product.id}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    "name" : productInputName.value || product.name,
                                    "value" : productInputValue.value || product.value,
                                    "url_img": `../assets/uploads/${image}`,
                                    "stock": productInputStock.value || product.stock,
                                    "type_id": selectProductType.value || product.type_id,
                                    "description" : descriptionTextArea.value || product.description,
                                })
                            });
                
                            const data = await response.json();
                        } catch(error){
                            console.error("Erro ao fazer a requisição". error.message);
                            throw new Error ("Erro ao fazer a requisição!", error.message);
                        }
                    } catch (error) {
                        console.log(error);
                    } finally {
                        setInterval(() =>{
                            modalDiv.remove();
                        }, 2000)

                    }


                }))
                modalContent.appendChild(buttonSendModify);
            })))

            productButtonDiv.appendChild(ButtonComponent("Deletar", "product-button-delete-product", (async () =>{
                try{
                    const result = await fetch(`/api/product/${product.id}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const data = await result.json()
                } catch(error){
                    return;
                } finally {
                    div.remove();
                }

            })))
        });
    }, 0);

    return modifyPageDiv;
}

async function getAllProduct(){
    try{
        const result = await fetch ('/api/product', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await result.json();
        return data
    } catch (error){
        return;
    }
}

async function getAllProductType(selectProductType) {
    try{
        const response = await fetch('/api/product_type', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();

        data.forEach(type => {
            const option = document.createElement("option");
            option.innerText = type.type;
            option.classList.add("product-type-option");
            option.value = type.id;
            selectProductType.appendChild(option);
        })
    } catch(error){
    console.log(error);
}};