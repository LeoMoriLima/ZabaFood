import router from "../js/routes.js";
export default async (term) => {

    const getAllProduct = async () => {
        let url = `/api/product`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    }

    const textSuggestions = document.createElement("p");
    textSuggestions.innerText = "Você quis dizer:"
    const divSuggestions = document.createElement("div");
    const listSuggestions = document.createElement("ul");
    listSuggestions.classList.add("list-suggestions");

    async function findSuggestions(term) {
        const products = await getAllProduct();
        let suggestions = [];
        products.forEach(product => {
            const words = normalizeText(product.name).split(' ');
            const wordsOriginal = product.name.split(' ');
            const firstWord = words[0];
            if (firstWord === term) {
                suggestions.push(wordsOriginal[0]);
            }
        })
        return suggestions;
    }

    function normalizeText(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    let suggestions = await findSuggestions(term);
    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const textSuggestion = document.createElement("a");
            const elementList = document.createElement("li");
            elementList.classList.add("element-list-suggestion-not-found");
            textSuggestion.innerText = suggestion;
            elementList.onclick = (e) => {
                e.preventDefault();
                router.navigate(`/products/search/${suggestion}`)
            }
            elementList.appendChild(textSuggestion);
            listSuggestions.appendChild(elementList);
        });

        divSuggestions.style.display = "block";
    } else {
        divSuggestions.style.display = "none";
    }

    const divMessage = document.createElement("div");
    const divMessageText = document.createElement("div");
    const textMessage = document.createElement("p");
    const imgMessage = document.createElement("img");
    imgMessage.src = "/assets/images/not-found.svg";


    textMessage.innerText = "Oops! Produto não encontrado :(";

    divMessage.classList.add("div-message-not-found-product");
    imgMessage.classList.add("img-message-not-found-product");
    textMessage.classList.add("text-message-not-found-product");
    textSuggestions.classList.add("text-suggestions-not-found-product");
    divSuggestions.classList.add("div-suggestions");
    divMessageText.classList.add("div-message-text-not-found");

    divSuggestions.appendChild(textSuggestions);
    divSuggestions.appendChild(listSuggestions);

    divMessageText.appendChild(textMessage);
    divMessageText.appendChild(divSuggestions);

    divMessage.appendChild(imgMessage);
    divMessage.appendChild(divMessageText);

    return divMessage;
}