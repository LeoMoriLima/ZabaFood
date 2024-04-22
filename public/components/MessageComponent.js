export default (message, success) => {
    const messageDiv = document.querySelector("#message-div");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message-element");
    messageElement.innerText = message;

    if (success) {
        messageElement.style.backgroundColor = "#8AB661";
    } else {
        messageElement.style.backgroundColor = "#A21360";
    }

    setTimeout(() => {
        messageElement.remove();
    }, 3000);

    messageDiv.appendChild(messageElement);
}