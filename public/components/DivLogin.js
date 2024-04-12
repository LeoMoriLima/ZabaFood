import inputEntry from "./inputEntry.js";
import buttonGray from "./buttonGray.js";

export default () => {
    const divBackground = document.createElement("div");
    divBackground.classList.add("div-background");

    const entryCard = document.createElement("div");
    entryCard.classList.add("entry-card");
    entryCard.id = "entry-card";
    divBackground.appendChild(entryCard);
    entryCard.appendChild(inputEntry("Usuário", "text", "user-input", "user-icon"));
    entryCard.appendChild(inputEntry("Senha", "password", "password-input", "password-icon"));

    entryCard.appendChild(buttonGray("Entrar", "button-login", async () => {
        const userInput = document.getElementById("user-input").value;
        const passwordInput = document.getElementById("password-input").value;
        try {
            const response = await fetch("http://108.61.49.221:3000/api/login/", {
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
                window.route({ preventDefault: () => {}, target: { href: "/" } });
            } else{
                alert(data.error);
            }

        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    }))

    return divBackground;
}