import ButtonComponent from "./ButtonComponent.js";

export default async () =>{
    const settingPageDiv = document.createElement("div");
    settingPageDiv.classList.add("setting-page-div");

    const h1 = document.createElement("h1");
    h1.innerText = "Configurações";
    h1.classList.add("setting-h1-text-page");
    settingPageDiv.appendChild(h1);

    const mainDiv = document.createElement("div");
    mainDiv.classList.add("main-setting-page-div");
    settingPageDiv.appendChild(mainDiv);

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left-setting-page-div");
    mainDiv.appendChild(leftDiv);

    const registerSetting = document.createElement("h2");
    registerSetting.classList.add("h2-title-setting-page");
    registerSetting.innerText = "Configurações do cadastro";
    leftDiv.appendChild(registerSetting);

    const userId = await getUserId();
    const userInfo = await getUserInfo(userId);

    const div = document.createElement("div");
    div.classList.add("div-user-setting-page-info");
    leftDiv.appendChild(div);

    const buttonSave = ButtonComponent("Salvar", "user-setting-save-button", (async () =>{
        try{
            const response = await fetch ('/api/users', {
                method: "PUT",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usernameSpan.innerText,
                    name: nameSpan.innerText,
                    email: emailSpan.innerText,
                    password: passwordSpan.value,
                    cpf: cpfSpan.innerText,
                    phone: phoneSpan.innerText
                })
            });
            notice.style.display = "block";
            notice.innerText = "Usuário atualizado com sucesso!";
            return;
        } catch (error){
            notice.style.display = "block";
            notice.style.color = "tomato";
            notice.innerText = "Erro ao atualizar usuário!"
            return;
        } finally{
            setTimeout(() =>{
                notice.style.display = "none"
                buttonSave.style.display = "none";
            }, 2000);
        }
    }))

    buttonSave.style.display = "none"

    const divName = document.createElement("div");
    divName.classList.add("user-info-setting-div")
    div.appendChild(divName);

    const divInfoName = document.createElement("div");
    divInfoName.classList.add("user-info-text-setting-div");
    divName.appendChild(divInfoName)

    const name = document.createElement("p");
    name.classList.add("user-info-text-setting-page");
    name.innerText = "Nome Completo: "
    divInfoName.appendChild(name);

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("user-info-span-setting-page");
    nameSpan.innerText = userInfo.name;
    divInfoName.appendChild(nameSpan);

    const divIconName = document.createElement("div");
    divIconName.classList.add("user-info-icon-setting-div")
    divName.appendChild(divIconName);

    const nameEditIcon = document.createElement("img");
    nameEditIcon.classList.add("edit-icon-setting-page");
    nameEditIcon.src = "/assets/images/edit-icon.svg";
    divIconName.appendChild(nameEditIcon);    

    nameEditIcon.addEventListener("click", async () =>{
        nameSpan.contentEditable = !nameSpan.isContentEditable;
        nameSpan.classList.toggle("edit-setting-page-mode");
        buttonSave.style.display = "block";

        if(nameSpan.isContentEditable){
            nameEditIcon.src = "/assets/images/save-icon.svg"
        } else {
            nameEditIcon.src = "/assets/images/edit-icon.svg"
        }

        if(nameSpan.isContentEditable || usernameSpan.isContentEditable || emailSpan.isContentEditable || passwordSpan.isContentEditable || cpfSpan.isContentEditable || phoneSpan.isContentEditable){
            buttonSave.classList.add("user-setting-save-button-disabled");
            buttonSave.disabled = true
        } else {
            buttonSave.classList.remove("user-setting-save-button-disabled");
            buttonSave.disabled = false
        }
    })

    const divUsername = document.createElement("div");
    divUsername.classList.add("user-info-setting-div")
    div.appendChild(divUsername);

    const divInfoUsername = document.createElement("div");
    divInfoUsername.classList.add("user-info-text-setting-div");
    divUsername.appendChild(divInfoUsername)

    const username = document.createElement("p");
    username.classList.add("user-info-text-setting-page");
    username.innerText = "Usuário: "
    divInfoUsername.appendChild(username);

    const usernameSpan = document.createElement("span");
    usernameSpan.classList.add("user-info-span-setting-page");
    usernameSpan.innerText = userInfo.username;
    divInfoUsername.appendChild(usernameSpan);

    const divIconUsername = document.createElement("div");
    divIconUsername.classList.add("user-info-icon-setting-div")
    divUsername.appendChild(divIconUsername);

    const usernameEditIcon = document.createElement("img");
    usernameEditIcon.classList.add("edit-icon-setting-page");
    usernameEditIcon.src = "/assets/images/edit-icon.svg";
    divIconUsername.appendChild(usernameEditIcon);
    
    usernameEditIcon.addEventListener("click", () =>{
        usernameSpan.contentEditable = !usernameSpan.isContentEditable;
        usernameSpan.classList.toggle("edit-setting-page-mode");
        buttonSave.style.display = "block";

        if(usernameSpan.isContentEditable){
            usernameEditIcon.src = "/assets/images/save-icon.svg"
        } else {
            usernameEditIcon.src = "/assets/images/edit-icon.svg"
        }

        if(nameSpan.isContentEditable || usernameSpan.isContentEditable || emailSpan.isContentEditable || passwordSpan.isContentEditable || cpfSpan.isContentEditable || phoneSpan.isContentEditable){
            buttonSave.classList.add("user-setting-save-button-disabled");
            buttonSave.disabled = true
        } else {
            buttonSave.classList.remove("user-setting-save-button-disabled");
            buttonSave.disabled = false
        }
    })

    const divEmail = document.createElement("div");
    divEmail.classList.add("user-info-setting-div")
    div.appendChild(divEmail);

    const divInfoEmail = document.createElement("div");
    divInfoEmail.classList.add("user-info-text-setting-div");
    divEmail.appendChild(divInfoEmail)

    const email = document.createElement("p");
    email.classList.add("user-info-text-setting-page");
    email.innerText = "Email: "
    divInfoEmail.appendChild(email);

    const emailSpan = document.createElement("span");
    emailSpan.classList.add("user-info-span-setting-page");
    emailSpan.innerText = userInfo.email;
    divInfoEmail.appendChild(emailSpan);

    const divIconEmail = document.createElement("div");
    divIconEmail.classList.add("user-info-icon-setting-div")
    divEmail.appendChild(divIconEmail);

    const emailEditIcon = document.createElement("img");
    emailEditIcon.classList.add("edit-icon-setting-page");
    emailEditIcon.src = "/assets/images/edit-icon.svg";
    divIconEmail.appendChild(emailEditIcon);

    emailEditIcon.addEventListener("click", () =>{
        emailSpan.contentEditable = !emailSpan.isContentEditable;
        emailSpan.classList.toggle("edit-setting-page-mode");
        buttonSave.style.display = "block";

        if(emailSpan.isContentEditable){
            emailEditIcon.src = "/assets/images/save-icon.svg"
        } else {
            emailEditIcon.src = "/assets/images/edit-icon.svg"
        }

        if(nameSpan.isContentEditable || usernameSpan.isContentEditable || emailSpan.isContentEditable || passwordSpan.isContentEditable || cpfSpan.isContentEditable || phoneSpan.isContentEditable){
            buttonSave.classList.add("user-setting-save-button-disabled");
            buttonSave.disabled = true
        } else {
            buttonSave.classList.remove("user-setting-save-button-disabled");
            buttonSave.disabled = false
        }
    })

    const divPassword = document.createElement("div");
    divPassword.classList.add("user-info-setting-div")
    div.appendChild(divPassword);

    const divInfoPassword = document.createElement("div");
    divInfoPassword.classList.add("user-info-text-setting-div");
    divPassword.appendChild(divInfoPassword)
    
    const password = document.createElement("p");
    password.classList.add("user-info-text-setting-page");
    password.innerText = "Senha: "
    divInfoPassword.appendChild(password)

    const passwordSpan = document.createElement("span");
    passwordSpan.classList.add("user-info-span-setting-page");
    passwordSpan.innerText = "*********";
    divInfoPassword.appendChild(passwordSpan);

    const divIconPassword = document.createElement("div");
    divIconPassword.classList.add("user-info-icon-setting-div")
    divPassword.appendChild(divIconPassword);

    const passwordEditIcon = document.createElement("img");
    passwordEditIcon.classList.add("edit-icon-setting-page");
    passwordEditIcon.src = "/assets/images/edit-icon.svg";
    divIconPassword.appendChild(passwordEditIcon);

    passwordEditIcon.addEventListener("click", () =>{
        passwordSpan.contentEditable = !passwordSpan.isContentEditable;
        passwordSpan.classList.toggle("edit-setting-page-mode");
        buttonSave.style.display = "block";

        if(passwordSpan.isContentEditable){
            passwordEditIcon.src = "/assets/images/save-icon.svg"
        } else {
            passwordEditIcon.src = "/assets/images/edit-icon.svg"
            if(passwordSpan.value === undefined && passwordSpan.innerText !== "*********"){
                passwordSpan.value = passwordSpan.innerText;
            }
        }

        if(nameSpan.isContentEditable || usernameSpan.isContentEditable || emailSpan.isContentEditable || passwordSpan.isContentEditable || cpfSpan.isContentEditable || phoneSpan.isContentEditable){
            buttonSave.classList.add("user-setting-save-button-disabled");
            buttonSave.disabled = true
        } else {
            buttonSave.classList.remove("user-setting-save-button-disabled");
            buttonSave.disabled = false
        }
    })

    const divCPF = document.createElement("div");
    divCPF.classList.add("user-info-setting-div")
    div.appendChild(divCPF);

    const divInfoCPF = document.createElement("div");
    divInfoCPF.classList.add("user-info-text-setting-div");
    divCPF.appendChild(divInfoCPF)

    const cpf = document.createElement("p");
    cpf.classList.add("user-info-text-setting-page");
    cpf.innerText = "CPF: "
    divInfoCPF.appendChild(cpf);
    
    const cpfSpan = document.createElement("span");
    cpfSpan.classList.add("user-info-span-setting-page");
    cpfSpan.innerText = userInfo.cpf;
    divInfoCPF.appendChild(cpfSpan);

    const divIconCPF = document.createElement("div");
    divIconCPF.classList.add("user-info-icon-setting-div")
    divCPF.appendChild(divIconCPF);

    const cpfEditIcon = document.createElement("img");
    cpfEditIcon.classList.add("edit-icon-setting-page");
    cpfEditIcon.src = "/assets/images/edit-icon.svg";
    divIconCPF.appendChild(cpfEditIcon);

    cpfEditIcon.addEventListener("click", () =>{
        cpfSpan.contentEditable = !cpfSpan.isContentEditable;
        cpfSpan.classList.toggle("edit-setting-page-mode");
        buttonSave.style.display = "block";

        if(cpfSpan.isContentEditable){
            cpfEditIcon.src = "/assets/images/save-icon.svg"
        } else {
            cpfEditIcon.src = "/assets/images/edit-icon.svg"
        }

        if(nameSpan.isContentEditable || usernameSpan.isContentEditable || emailSpan.isContentEditable || passwordSpan.isContentEditable || cpfSpan.isContentEditable || phoneSpan.isContentEditable){
            buttonSave.classList.add("user-setting-save-button-disabled");
            buttonSave.disabled = true
        } else {
            buttonSave.classList.remove("user-setting-save-button-disabled");
            buttonSave.disabled = false
        }
    })

    const divPhone = document.createElement("div");
    divPhone.classList.add("user-info-setting-div")
    div.appendChild(divPhone);

    const divInfoPhone = document.createElement("div");
    divInfoPhone.classList.add("user-info-text-setting-div");
    divPhone.appendChild(divInfoPhone)

    const phone = document.createElement("p");
    phone.classList.add("user-info-text-setting-page");
    phone.innerText = "Telefone: "
    phone.value = userInfo.phone
    divInfoPhone.appendChild(phone);

    const phoneSpan = document.createElement("span");
    phoneSpan.classList.add("user-info-span-setting-page");
    phoneSpan.innerText = userInfo.phone;
    divInfoPhone.appendChild(phoneSpan);

    const divIconPhone = document.createElement("div");
    divIconPhone.classList.add("user-info-icon-setting-div")
    divPhone.appendChild(divIconPhone);

    const phoneEditIcon = document.createElement("img");
    phoneEditIcon.classList.add("edit-icon-setting-page");
    phoneEditIcon.src = "/assets/images/edit-icon.svg";
    divIconPhone.appendChild(phoneEditIcon);

    phoneEditIcon.addEventListener("click", () =>{
        phoneSpan.contentEditable = !phoneSpan.isContentEditable;
        phoneSpan.classList.toggle("edit-setting-page-mode");
        buttonSave.style.display = "block";

        if(phoneSpan.isContentEditable){
            phoneEditIcon.src = "/assets/images/save-icon.svg"
        } else {
            phoneEditIcon.src = "/assets/images/edit-icon.svg"
        }

        if(nameSpan.isContentEditable || usernameSpan.isContentEditable || emailSpan.isContentEditable || passwordSpan.isContentEditable || cpfSpan.isContentEditable || phoneSpan.isContentEditable){
            buttonSave.classList.add("user-setting-save-button-disabled");
            buttonSave.disabled = true
        } else {
            buttonSave.classList.remove("user-setting-save-button-disabled");
            buttonSave.disabled = false
        }
    })

    const notice = document.createElement("p");
    notice.classList.add("user-setting-page-notice");
    notice.style.display = "none"
    div.appendChild(notice);

    const settingButtonDiv = document.createElement("div");
    settingButtonDiv.classList.add("user-setting-button-div");
    div.appendChild(settingButtonDiv);

    settingButtonDiv.appendChild(buttonSave);

    const modalDiv = document.createElement("div");
    modalDiv.classList.add("user-setting-page-modal-div");
    settingPageDiv.appendChild(modalDiv);
    modalDiv.style.display = "none";

    modalDiv.addEventListener("click", () =>{
        modalDiv.style.display = "none"
    })

    const modalContent = document.createElement("div");
    modalContent.classList.add("user-setting-page-modal-content-div");
    modalDiv.appendChild(modalContent);

    modalContent.addEventListener("click", (event) =>{
        event.stopPropagation();
    })

    const h1Modal = document.createElement("h1");
    h1Modal.innerText = "ATENÇÃO";
    h1Modal.classList.add("setting-page-modal-h1");
    modalContent.appendChild(h1Modal);

    const textModalWarning = document.createElement("p");
    textModalWarning.innerText = "Está é uma ação irreversível!";
    textModalWarning.classList.add("text-modal-setting-page");
    modalContent.appendChild(textModalWarning);

    const textModalQuestion = document.createElement("p");
    textModalQuestion.innerText = "Deseja continuar?";
    textModalQuestion.classList.add("text-modal-setting-page");
    modalContent.appendChild(textModalQuestion);

    const divActionModal = document.createElement("div");
    divActionModal.classList.add("action-modal-setting-page-div");
    modalContent.appendChild(divActionModal);

    divActionModal.appendChild(ButtonComponent("Sim", "action-button-yes-setting-page", (async () =>{
        try{
            const response = await fetch ('/api/users', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            try{
                const logout = await fetch('/logout', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            } catch (error){
                console.error("Erro ao fazer a requisição");
                throw new error("Erro ao fazer a requisição!");
            } finally {
                router.navigate("/");
            }
        } catch(error){
            console.log("Erro ao excluir a conta");
            return;
        }
    })));

    divActionModal.appendChild(ButtonComponent("Não", "action-button-no-setting-page", (() =>{
        modalDiv.style.display = "none";
    })))

    settingButtonDiv.appendChild(ButtonComponent("Excluir Conta", "button-erase-account-setting-page",(async () => {
        modalDiv.style.display = "flex"; 
    })));

    return settingPageDiv;
}

async function getUserId(){
    try{
        const response = await fetch ('/api/login', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data.user.id
    } catch (error){
        return;
    }
}

async function getUserInfo(userId){
    try{
        const response = await fetch (`/api/users/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const userData = await response.json();
        return userData;
    } catch(error){
        return;
    }
}