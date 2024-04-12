import inputEntry from "./inputEntry.js";
import buttonGray from "./buttonGray.js";
import textA from "./text-a.js";


export default () => {
    const divBackground = document.createElement("div");
    divBackground.classList.add("div-background");

    const entryCard = document.createElement("div");
    entryCard.classList.add("entry-card");
    entryCard.id = "entry-card";
    divBackground.appendChild(entryCard);

    entryCard.appendChild(inputEntry("Nome de Usuário", "text", "user-input", "user-icon"));
    entryCard.appendChild(inputEntry("Nome Completo", "text", "name-input", "user-icon"));
    entryCard.appendChild(inputEntry("Email", "text", "email-input", "email-icon"));
    entryCard.appendChild(inputEntry("Senha", "password", "password-input", "password-icon"));
    entryCard.appendChild(inputEntry("CPF", "text", "cpf-input", "cpf-icon"));
    entryCard.appendChild(inputEntry("Telefone", "text", "phone-input", "phone-icon"));

    entryCard.appendChild(buttonGray("Registrar-se", "button-register", async () => {
        const userInput = document.getElementById("user-input").value;
        const passwordInput = document.getElementById("password-input").value;
        const nameInput = document.getElementById("name-input").value;
        const emailInput = document.getElementById("email-input").value;
        const cpfInput = document.getElementById("cpf-input").value;
        const phoneInput = document.getElementById("phone-input").value;

        try {
            const response = await fetch("http://108.61.49.221:3000/api/users/", {
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
                    cpf_cnpj: cpfInput,
                    phone: phoneInput
                })
            });
            const data = await response.json();

            if (data.success) {
                window.route({ preventDefault: () => {}, target: { href: "/login" } });
            } else{
                alert("Erro ao efetuar registro");
            }
        } catch (error) {
            console.error("Erro ao efetuar registro:", error);
        }
    }))
    entryCard.appendChild(textA("Já tem uma conta?", "text-1-login", "text-class", "/login"));
    return divBackground;
}