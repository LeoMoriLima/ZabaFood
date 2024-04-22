import ButtonComponent from "./ButtonComponent.js";
import inputEntry from "./inputEntry.js";

export default async () =>{
    const addProductDiv = document.createElement("div");
    addProductDiv.classList.add("add-product-div");

    const leftAdminProductDiv = document.createElement("div");
    leftAdminProductDiv.classList.add("left-admin-product-div");
    addProductDiv.appendChild(leftAdminProductDiv);

    const titleAdminProductDiv = document.createElement("div");
    titleAdminProductDiv.classList.add("title-admin-product-div");
    leftAdminProductDiv.appendChild(titleAdminProductDiv);

    const titleAddProduct = document.createElement("h1");
    titleAddProduct.classList.add("title-add-product");
    titleAddProduct.innerText = "Adicionar um novo produto";
    titleAdminProductDiv.appendChild(titleAddProduct);

    const selectProductType = document.createElement("select");
    selectProductType.classList.add("select-product-type");

    const optionBase = document.createElement("option");
    optionBase.classList.add("product-type-option");
    optionBase.innerText = "Selecione a categoria do produto";
    optionBase.value = 1;
    selectProductType.appendChild(optionBase);

    const descriptionTextArea = document.createElement("textarea");
    descriptionTextArea.classList.add("description-text-area");
    descriptionTextArea.placeholder = "Descrição do produto..."

    const formAddProductImg = document.createElement("form");
    formAddProductImg.addEventListener("submit", submitForm)

    const divImageFile = document.createElement("div");
    divImageFile.classList.add("div-image-file");
    leftAdminProductDiv.appendChild(divImageFile);

    const imagePreview = document.createElement("div");
    imagePreview.classList.add("image-preview");
    divImageFile.appendChild(imagePreview);

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
    divImageText.appendChild(imageInput);    

    const formAddProductDiv = document.createElement("div");
    formAddProductDiv.classList.add("form-add-product-div");
    addProductDiv.appendChild(formAddProductDiv);

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

    async function getAllProductType() {
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

    getAllProductType()
    
    formAddProductDiv.appendChild(inputEntry("Nome do produto", "text", "input-admin-name", "none"));
    formAddProductDiv.appendChild(selectProductType);
    formAddProductDiv.appendChild(inputEntry("Quantidade em estoque", "number", "input-admin-stock", "none"));
    formAddProductDiv.appendChild(inputEntry("Valor do produto", "number", "input-admin-value", "none"));
    formAddProductDiv.appendChild(descriptionTextArea);

    const buttonAdminPageDiv = document.createElement("div");
    buttonAdminPageDiv.classList.add("button-admin-page-div");
    addProductDiv.appendChild(buttonAdminPageDiv);
    


    buttonAdminPageDiv.appendChild(ButtonComponent("Adicionar Produto", "button-admin-send", (async () => {
        const nameInput = document.getElementById("input-admin-name");
        const valueInput = document.getElementById("input-admin-value");
        const stockInput = document.getElementById("input-admin-stock");
        const type = selectProductType;
        const description = descriptionTextArea;
        pErrorMessageAdd.innerText = "";

        if(!nameInput.value){
            pErrorMessageAdd.innerText = "Por favor insira um nome!"
            return;
        }

        if(!valueInput.value){
            pErrorMessageAdd.innerText = "Por favor insira um valor!"
            return;
        }

        if(!stockInput.value){
            pErrorMessageAdd.innerText = "Por favor insira um valor de estoque!"
            return;
        }

        if(!imageInput.value){
            pErrorMessageAdd.innerText = "Por favor insira uma imagem!"
            return;
        }

        if(type.value === 1){
            pErrorMessageAdd.innerText = "Por favor insira um tipo de produto!"
            return;
        }

        if(!description.value){
            pErrorMessageAdd.innerText = "Por favor insira uma descrição!"
            return;
        }
        await submitForm(nameInput, valueInput, stockInput, type, description, imageInput);    
    })));

    const pErrorMessageAdd = document.createElement("p");
    pErrorMessageAdd.classList.add("p-error-message-add");
    addProductDiv.appendChild(pErrorMessageAdd);

    async function submitForm(name, value, stock, type, description, file){
        const formData = new FormData();
        formData.append("name", name.value);
        formData.append("file", file.files[0])
        try {
            const response = await fetch('/upload_file', {
                method: 'POST',
                body: formData,
            });
            const image = await response.json();
            try{
                const response = await fetch('/api/product', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "name" : name.value,
                        "value" : value.value,
                        "url_img": `/assets/uploads/${image.filename}`,
                        "stock": stock.value,
                        "type_id": type.value,
                        "description" : description.value,
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
            name.value = "";
            value.value = "";
            stock.value = "";
            type.value = 1;
            description.value = "";
            file.value = "";
        }
    }
    return addProductDiv;
}



