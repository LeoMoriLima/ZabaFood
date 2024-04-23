export default () => {
    const divMessage = document.createElement("div");
    const textMessage = document.createElement("p");
    const imgMessage = document.createElement("img");
    imgMessage.src = "/assets/images/not-found.svg";

    textMessage.innerText = "Oops! Produto não encontrado :(";

    divMessage.classList.add("div-message-not-found-product");
    imgMessage.classList.add("img-message-not-found-product");
    textMessage.classList.add("text-message-not-found-product");

    divMessage.appendChild(textMessage);
    divMessage.appendChild(imgMessage);

    return divMessage;
}