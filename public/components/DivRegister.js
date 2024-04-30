import inputEntry from "./InputEntry.js";
import buttonGray from "./ButtonComponent.js";
import textA from "./Text-a.js";
import router from "../js/routes.js";
import MessageComponent from "./MessageComponent.js";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default () => {
    const divBackground = document.createElement("div");
    divBackground.classList.add("div-background-register");

    const entryCard = document.createElement("div");
    entryCard.classList.add("entry-card-register");
    entryCard.id = "entry-card";
    divBackground.appendChild(entryCard);

    entryCard.appendChild(inputEntry("Nome de Usuário", "text", "user-input", "white-user-icon"));
    entryCard.appendChild(inputEntry("Nome Completo", "text", "name-input", "white-user-icon"));
    entryCard.appendChild(inputEntry("Email", "text", "email-input", "email-icon"));
    entryCard.appendChild(inputEntry("Senha", "password", "password-input", "password-icon"));
    entryCard.appendChild(inputEntry("CPF", "text", "cpf-input", "cpf-icon"));
    entryCard.appendChild(inputEntry("Telefone", "text", "phone-input", "white-phone-icon"));

    entryCard.appendChild(buttonGray("Registrar-se", "button-entry", async () => {
        const userInput = document.getElementById("user-input").value;
        const passwordInput = document.getElementById("password-input").value;
        const nameInput = document.getElementById("name-input").value;
        const emailInput = document.getElementById("email-input").value;
        const cpfInput = document.getElementById("cpf-input").value;
        const phoneInput = document.getElementById("phone-input").value;

        if (userInput.length < 4 || userInput.length > 50) {
            MessageComponent("O nome de usuário deve conter entre 4 e 50 caracteres!", false);
            return;
        }

        if (passwordInput.length < 4 || passwordInput.length > 30) {
            MessageComponent("A senha deve conter entre 4 e 30 caracteres!", false);
            return;
        }

        if (nameInput.length < 4 || nameInput.length > 50) {
            MessageComponent("Nome inválido!", false);
            return;
        }

        if (!emailRegex.test(emailInput)) {
            MessageComponent("Email inválido!", false);
            return;
        }

        if (cpfInput.length < 11 || cpfInput.length > 18) {
            MessageComponent("CPF inválido!", false);
            return;
        }

        if (phoneInput.length < 10 || phoneInput.length > 11) {
            MessageComponent("Número de telefone inválido!", false);
            return;
        }

        try {
            const response = await fetch("/api/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: userInput,
                    user_type: "user",
                    name: nameInput,
                    email: emailInput,
                    password: passwordInput,
                    cpf: cpfInput,
                    phone: phoneInput
                })
            });
            const data = await response.json();

            if (data.success) {
                router.navigate("/login");
            } else {
                MessageComponent("Erro ao efetuar registro", false);
            }
        } catch (error) {
            console.error("Erro ao efetuar registro:", error);
        }
    }))
    entryCard.appendChild(textA("Já tem uma conta?", "text-1-login", "text-class", "/login"));
    return divBackground;
}