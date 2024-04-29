import inputEntry from "./inputEntry.js";
import buttonGray from "./ButtonComponent.js";
import text from "./Text.js";
import textA from "./Text-a.js";
import router from "../js/routes.js";
import MessageComponent from "./MessageComponent.js";

export default () => {
    const divBackground = document.createElement("div");
    divBackground.classList.add("div-background");

    const entryCard = document.createElement("div");
    entryCard.classList.add("entry-card");
    entryCard.id = "entry-card";
    divBackground.appendChild(entryCard);

    divBackground.addEventListener("keypress", function(e) {
        if(e.keyCode === 13) {
            e.preventDefault();
            const userInput = document.getElementById("user-input").value;
            const passwordInput = document.getElementById("password-input").value;

            login(userInput, passwordInput);
        }
    })

    entryCard.appendChild(inputEntry("Usuário", "text", "user-input", "white-user-icon"));
    entryCard.appendChild(inputEntry("Senha", "password", "password-input", "password-icon"));

    entryCard.appendChild(buttonGray("Entrar", "button-entry", async () => {
        const userInput = document.getElementById("user-input").value;
        const passwordInput = document.getElementById("password-input").value;

        login(userInput, passwordInput);
    }))
    
    entryCard.appendChild(text("Novo por aqui?", "text-1-register", "text-class"));
    entryCard.appendChild(textA("Clique aqui e crie sua conta!", "text-2-register", "text-class", "/register"));

    return divBackground;
}

async function login(userInput, passwordInput) {
    try {
        const response = await fetch("/api/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: userInput,
                password: passwordInput
            })
        });
        const data = await response.json();

        if (data.auth) {
            router.navigate("/");
        } else{
            MessageComponent(data.error, false);
        }

    } catch (error) {
        console.error("Erro ao fazer login:", error);
    }
}