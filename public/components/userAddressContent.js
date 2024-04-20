import ButtonComponent from "./ButtonComponent.js";
import inputEntry from "./inputEntry.js";

export default async () =>{
    const addressPageDiv = document.createElement("div");
    addressPageDiv.classList.add("address-page-div");

    const h1 = document.createElement("h1");
    h1.innerText = "Meus endereços";
    h1.classList.add("address-h1-text");
    addressPageDiv.appendChild(h1);

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("main-address-page-div");
    addressPageDiv.appendChild(mainDiv);

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left-address-page-div");
    mainDiv.appendChild(leftDiv);

    const registerAddress= document.createElement("h2");
    registerAddress.classList.add("h2-title-address-page");
    registerAddress.innerText = "Cadastrar novo endereço";
    leftDiv.appendChild(registerAddress);

    const userAddress = await getUserAddress();
    console.log(userAddress);

    const divPostalCode = document.createElement("div");
    divPostalCode.classList.add("div-postal-code");
    leftDiv.appendChild(divPostalCode);

    const inputPostalCode = createPostalCodeInput();
    inputPostalCode.id = "input-postal-code"

    divPostalCode.appendChild(inputPostalCode);
    divPostalCode.appendChild(ButtonComponent("Pesquisar", "button-search-postal-code", (async () =>{
        const postalCode = await searchPostalCode(inputPostalCode.value);
        const inputState = document.getElementById("state-input");
        const inputCity = document.getElementById("city-input");
        const inputStreet = document.getElementById("street-input");
        inputState.value = postalCode.state;
        inputCity.value = postalCode.city;
        inputStreet.value = postalCode.street

    })));
    leftDiv.appendChild(inputEntry("Estado", "text", "state-input", "none"));
    leftDiv.appendChild(inputEntry("Cidade", "text", "city-input", "none"));
    leftDiv.appendChild(inputEntry("Rua", "text", "street-input", "none"));
    leftDiv.appendChild(inputEntry("Número", "text", "number-input", "none"));
    leftDiv.appendChild(inputEntry("Complemento", "text", "complement-input", "none"));

    const notice = document.createElement("p");
    notice.classList.add("address-notice-p");
    leftDiv.appendChild(notice);
    
    leftDiv.appendChild(ButtonComponent("Criar", "button-create-address", (async () =>{
        const createError = "Erro ao cadastrar novo endereço"
        const inputState = document.getElementById("state-input");
        const inputCity = document.getElementById("city-input");
        const inputStreet = document.getElementById("street-input");
        const inputNumber = document.getElementById("number-input");
        const inputComplement = document.getElementById("complement-input");
        try{
            const response = await fetch('/api/address', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    postal_code : inputPostalCode.value,
                    state: inputState.value,
                    city: inputCity.value,
                    street: inputStreet.value,
                    number: inputNumber.value,
                    complement: inputComplement.value

                })
            })
            const data = await response.json();
            notice.innerText = "Endereço criado com sucesso!"
            return ;
        } catch (error){
            notice.style.color = "tomato"
            notice.innerText = "Erro ao criar endereço!"
            return createError;
        } finally{
            inputState.value = "";
            inputCity.value = "";
            inputStreet.value = "";
            inputNumber.value = "";
            inputComplement.value = "";
            inputPostalCode.value = "";
            setTimeout(() =>{
                notice.innerText = ""
            }, 2000);
        }

        })));

    const rightDiv = document.createElement("div");
    rightDiv.classList.add("right-address-page-div");
    mainDiv.appendChild(rightDiv);

    const allAddress = document.createElement("h2");
    allAddress.classList.add("h2-title-address-page");
    allAddress.innerText = "Endereços cadastrados"

    if(!userAddress){
        rightDiv.innerHTML = ""
        allAddress.innerText = "Cadastre um novo endereço para começar";
        rightDiv.appendChild(allAddress);
    } else {
        rightDiv.appendChild(allAddress);

        userAddress.forEach(data => {
            const div = document.createElement("div");
            div.classList.add("address-div");
            rightDiv.appendChild(div);

            const icon = document.createElement("img");
            icon.classList.add("icon-address-img");
            icon.src = "../assets/images/navigation-icon.svg";
            div.appendChild(icon);

            const textDiv = document.createElement("div");
            textDiv.classList.add("info-address-div");
            div.appendChild(textDiv);

            const h3 = document.createElement("h3");
            h3.innerText = data.street + "," + " " + data.number;
            h3.classList.add("street-text-info");
            textDiv.appendChild(h3);

            const pStateAndCity = document.createElement("p");
            pStateAndCity.innerText = data.city + " " + "-" + " " + data.state;
            pStateAndCity.classList.add("text-state-city-address");
            textDiv.appendChild(pStateAndCity);

            const pPostalCodeAndComplement = document.createElement("p");
            pPostalCodeAndComplement.innerText = data.postal_code + "," + " " + data.complement;
            pPostalCodeAndComplement.classList.add("text-postal-complement-address");
            textDiv.appendChild(pPostalCodeAndComplement);

            const divIcons = document.createElement("div");
            divIcons.classList.add("div-address-icons");
            div.appendChild(divIcons)

            const editIcon = document.createElement("img");
            editIcon.src = "../assets/images/edit-icon.svg";
            editIcon.classList.add("icon-address-action");
            divIcons.appendChild(editIcon);

            const pageModalDiv = document.createElement("div");
            pageModalDiv.classList.add("page-modal-div");
            pageModalDiv.style.display = "none";
            addressPageDiv.appendChild(pageModalDiv)

            pageModalDiv.addEventListener("click", () =>{
                pageModalDiv.style.display = "none";
            })

            const modalDiv = document.createElement("div");
            modalDiv.classList.add("modal-div-address");
            modalDiv.style.display = "flex";
            pageModalDiv.appendChild(modalDiv);

            modalDiv.addEventListener("click", (event) =>{
                event.stopPropagation();
            })


            editIcon.addEventListener("click", async () =>{
                modalDiv.innerHTML = ""
                pageModalDiv.style.display = "flex";

                const h2Update = document.createElement("h2");
                h2Update.classList.add("h2-update-modal");
                h2Update.innerText = "Atualizar endereço"
                modalDiv.appendChild(h2Update);

                const closeIcon = document.createElement("img");
                closeIcon.classList.add("close-icon-address");
                closeIcon.src = "../assets/images/close-icon.svg";
                modalDiv.appendChild(closeIcon);

                closeIcon.addEventListener("click", () =>{
                    pageModalDiv.style.display = "none"
                })

                const divModalPostalCode = document.createElement("div");
                divModalPostalCode.classList.add("modal-div-postal-code");
                modalDiv.appendChild(divModalPostalCode)

                const modalInputPostalCode = createPostalCodeInput();
                modalInputPostalCode.value = data.postal_code;
                divModalPostalCode.appendChild(modalInputPostalCode);

                divModalPostalCode.appendChild(ButtonComponent("Pesquisar", "button-search-postal-code", (async () =>{
                    const modalPostalCode = await searchPostalCode(modalInputPostalCode.value);
                    modalInputState.value = modalPostalCode.state;
                    modalInputCity.value = modalPostalCode.city;
                    modalInputStreet.value = modalPostalCode.street;
                    modalInputNumber.value = "";
                    modalInputComplement.value = "";
                })));

                const modalInputCity = document.createElement("input");
                modalInputCity.classList.add("modal-input");
                modalInputCity.value = data.city;
                modalDiv.appendChild(modalInputCity);

                const modalInputState = document.createElement("input");
                modalInputState.classList.add("modal-input");
                modalInputState.value = data.state;
                modalDiv.appendChild(modalInputState);

                const modalInputStreet = document.createElement("input");
                modalInputStreet.classList.add("modal-input");
                modalInputStreet.value = data.street;
                modalDiv.appendChild(modalInputStreet);

                const modalInputNumber = document.createElement("input");
                modalInputNumber.classList.add("modal-input");
                modalInputNumber.value = data.number;
                modalDiv.appendChild(modalInputNumber);

                const modalInputComplement = document.createElement("input");
                modalInputComplement.classList.add("modal-input");
                modalInputComplement.value = data.complement;
                modalDiv.appendChild(modalInputComplement);

                const modalNotice = document.createElement("p");
                modalNotice.classList.add("modal-notice-address");
                modalDiv.appendChild(modalNotice);

                modalDiv.appendChild(ButtonComponent("Atualizar", "button-update-address", (async () =>{
                    try{
                        const response = await fetch(`/api/address/${data.id}`, {
                            method: "PUT",
                            headers:{
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                postal_code : modalInputPostalCode.value,
                                state: modalInputState.value,
                                city: modalInputCity.value,
                                street: modalInputStreet.value,
                                number: modalInputNumber.value,
                                complement: modalInputComplement.value
                            })
                        })
                        const responseData = await response.json();
                        modalNotice.style.color = "var(--color-white)"
                        modalNotice.innerText = "Endereço atualizado com sucesso!"
                        return responseData;
                    } catch(error){
                        modalNotice.style.color = "tomato"
                        modalNotice.innerText = "Erro ao atualizar endereço"
                    } finally{
                        setTimeout(() => {
                            pageModalDiv.style.display = "none";
                            
                        }, 2000);
                        h3.innerText = modalInputStreet.value + "," + " " + modalInputNumber.value;
                        pStateAndCity.innerText = modalInputCity.value + " " + "-" + " " + modalInputState.value;
                        pPostalCodeAndComplement.innerText = modalInputPostalCode.value + "," + " " + modalInputComplement.value;
                    }
                }
                )));
            });

            const trashIcon = document.createElement("img");
            trashIcon.src = "../assets/images/trash-icon.svg";
            trashIcon.classList.add("icon-address-action");
            divIcons.appendChild(trashIcon);



            trashIcon.addEventListener("click", async () =>{

                addressRightNotice.style.display = "block";            
                try{
                    const response = await fetch (`/api/address/${data.id}` , {
                        method: "DELETE",
                        headers:{
                            "Content-Type": "application/json"
                        }
                    }) 
            
                    const deletedData = await response.json();
                    addressRightNotice.style.color = "var(--color-secundary)"
                    addressRightNotice.innerText = "Endereço deletado com sucesso!";

            
                    return;
                } catch(error) {
                    addressRightNotice.style.color = "tomato"
                    addressRightNotice.innerText = "Erro ao deletar endereço!"            
                    return;
                } finally{
                    setTimeout(() => {
                        addressRightNotice.style.display = "none";
                    }, 2000);
                    div.style.display = "";
                }
            })

        });
    }

    const addressRightNotice = document.createElement("p");
    addressRightNotice.classList.add("address-right-notice");
    addressRightNotice.id = "address-right-notice";
    rightDiv.appendChild(addressRightNotice)    

    return addressPageDiv;
}

async function getUserAddress(){
    try{
        const response = await fetch (`/api/address/all/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    } catch(error){
        return;
    }
}

function createPostalCodeInput(){
    const inputPostalCode = document.createElement("input");
        inputPostalCode.placeholder = "CEP";
        inputPostalCode.classList.add("input-postal-code");
        inputPostalCode.type = "text";
        inputPostalCode.addEventListener("input", (event) =>{
            let cep = event.target.value.replace(/\D/g, '');
            cep = cep.slice(0, 8);

            if(cep.length > 5){
                cep = cep.replace(/(\d{5})(\d)/, '$1-$2');
            }

            event.target.value = cep
        })
        inputPostalCode.addEventListener("keypress", (event) =>{
            const allowedChars = /[0-9]/;

            if (!allowedChars.test(event.key)){
                event.preventDefault();
            }
        });

        return inputPostalCode;
}

async function searchPostalCode(postalCode){
    try{
        const response = await fetch(`https://api.brasilaberto.com/v1/zipcode/${postalCode}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data.result;
    } catch(error){
        return;
    }
}
