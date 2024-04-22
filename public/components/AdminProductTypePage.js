import ButtonComponent from "./ButtonComponent.js";
import inputEntry from "./inputEntry.js";

export default async () =>{
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

    setTimeout(async() =>{        
        const rightPage = await createAllRightPage(divBodyProductType, productTypeDiv);
        divBodyProductType.appendChild(rightPage);


        addProductTypeDiv.appendChild(ButtonComponent("Criar", "product-type-button-send", (async () => {
            const name = document.getElementById("input-product-type-name");
            try{
                const response = await fetch('/api/product_type', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        type: name.value,
                    })
                })
                divBodyProductType.innerHtml = ""
            } catch (error){
                return;
            } finally {
                name.value = "";
                setTimeout(async () => {
                    const rightPage = await createAllRightPage(divBodyProductType, productTypeDiv);
                    divBodyProductType.appendChild(rightPage);
                }, 0);
            }
        })));
    },0);

    return productTypeDiv;
}

async function createAllRightPage (divBodyProductType, productTypeDiv){

    const rightPageDiv = document.createElement("div");
    rightPageDiv.classList.add("product-type-page-right-div")


    try{
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
    modalProductType.addEventListener("click", () =>{
        modalProductType.style.display = "none"
    })

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

        editIcon.addEventListener("click", async () =>{
            modalProductType.style.display = "flex"

            const modalContent = document.createElement("div");
            modalContent.classList.add("modal-content-product-type");
            modalProductType.appendChild(modalContent)
    
            modalContent.addEventListener("click", (event) =>{
                event.stopPropagation();
            });

            const h2ModalProductType = document.createElement("h2");
            h2ModalProductType.innerText = "Atualizar tipo de produto";
            h2ModalProductType.classList.add("h2-product-type-div");
            modalContent.appendChild(h2ModalProductType)

            modalContent.appendChild(inputEntry(type.type, "text", "input-product-type-modal-content", "none" ))

            const closeIcon = document.createElement("img");
            closeIcon.classList.add("close-modify-modal-icon");
            closeIcon.src = "../assets/images/close-icon.svg";
            modalContent.appendChild(closeIcon);

            closeIcon.addEventListener("click", () =>{
                modalContent.remove();
                modalProductType.style.display = "none";
            });

            modalContent.appendChild(ButtonComponent("Atualizar", "product-type-modal-button", (async () =>{
                const productTypeName = document.getElementById("input-product-type-modal-content");
                try{
                    const updateResponse = await fetch(`/api/product_type/${type.id}`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            type: productTypeName.value || type.type
                        })
                    })
                } catch (error){
                    return;
                } finally {
                    modalContent.remove();
                    modalProductType.style.display = "none";
                    pInfo.innerText = productTypeName.value
                }
            })))
        })

        const deleteIcon = document.createElement("img");
        deleteIcon.classList.add("table-product-type-icon");
        deleteIcon.src = "../assets/images/trash-icon.svg";
        divColumnThree.appendChild(deleteIcon);

        deleteIcon.addEventListener("click", async() =>{
            try{
                const deleteResponse = await fetch (`/api/product_type/${type.id}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if(deleteResponse.ok) {
                    divInfo.remove()
                }

            } catch(error){
                return;
            }
        })
    });


} catch(error) {
    return;
}
return rightPageDiv;
}