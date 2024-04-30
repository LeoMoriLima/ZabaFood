import TextA from "./Text-a.js";

export default async (removeOverlayCallback) => {
    const divModal = document.createElement("div");
    divModal.id = "div-modal-no-credits";

    const img = document.createElement("img");
    img.src = "/assets/images/no-credits.svg";
    img.classList.add("img-no-credits");

    const text = document.createElement("p");
    text.innerText = "Você não possui créditos suficientes para essa compra!";
    text.classList.add("text-modal-no-credits");

    const x = document.createElement("p");
    x.innerText = "x";
    x.classList.add("close-modal-no-credits");
    x.addEventListener("click", () => {
        divModal.style.display = "none";
        removeOverlayCallback();
    });

    const addCredits = TextA("Adicionar mais?", "none", "a-add-credits-modal", "/payment");
    addCredits.addEventListener("click", () => {
        divModal.style.display = "none";
        removeOverlayCallback();
    });

    const divText = document.createElement("div");
    divText.classList.add("div-text-no-credits");
    divText.appendChild(text);
    divText.appendChild(addCredits);

    divModal.appendChild(img);
    divModal.appendChild(divText);
    divModal.appendChild(x);

    return divModal;
}