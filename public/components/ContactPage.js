import ButtonComponent from "./ButtonComponent.js";
import router from "../js/routes.js";

export default () => {
    const contactPageDiv = document.createElement("div");
    contactPageDiv.classList.add("contact-page-div");

    const contactPageTitleDiv = document.createElement("div");
    contactPageTitleDiv.classList.add("contact-page-title-div");
    contactPageDiv.appendChild(contactPageTitleDiv);

    const h1ContactPage = document.createElement("h1");
    h1ContactPage.innerText = "Entre em contato conosco!";
    h1ContactPage.classList.add("h1-contact-page");
    contactPageTitleDiv.appendChild(h1ContactPage);

    const contactPageBodyDiv = document.createElement("div");
    contactPageBodyDiv.classList.add("contact-page-body-div");
    contactPageDiv.appendChild(contactPageBodyDiv);

    const phoneContactPageDiv = document.createElement("div");
    phoneContactPageDiv.classList.add("phone-contact-page-div");
    contactPageBodyDiv.appendChild(phoneContactPageDiv);

    const phoneContactIcon = document.createElement("img");
    phoneContactIcon.src = "../assets/images/phone-icon.svg";
    phoneContactIcon.classList.add ("phone-contact-icon");
    phoneContactPageDiv.appendChild(phoneContactIcon);

    const phoneContactText = document.createElement("p");
    phoneContactText.innerText = "(XX) XXXXX-XXXX";
    phoneContactText.classList.add("contact-page-text");
    phoneContactPageDiv.appendChild(phoneContactText);

    const emailContactPageDiv = document.createElement("div");
    emailContactPageDiv.classList.add("email-contact-page-div");
    contactPageBodyDiv.appendChild(emailContactPageDiv);

    const emailContactIcon = document.createElement("img");
    emailContactIcon.src = "../assets/images/email-icon-green.svg";
    emailContactIcon.classList.add ("email-contact-icon");
    emailContactPageDiv.appendChild(emailContactIcon);

    const emailContactText = document.createElement("p");
    emailContactText.innerText = "contato@zabafood.com.br";
    emailContactText.classList.add("contact-page-text");
    emailContactPageDiv.appendChild(emailContactText);

    const instagramContactPageDiv = document.createElement("div");
    instagramContactPageDiv.classList.add("instagram-contact-page-div");
    contactPageBodyDiv.appendChild(instagramContactPageDiv);

    const instagramContactIcon = document.createElement("img");
    instagramContactIcon.src = "../assets/images/insta-icon-green.svg";
    instagramContactIcon.classList.add ("instagram-contact-icon");
    instagramContactPageDiv.appendChild(instagramContactIcon);

    const instagramContactText = document.createElement("p");
    instagramContactText.innerText = "@zabafoodbr";
    instagramContactText.classList.add("contact-page-text");
    instagramContactPageDiv.appendChild(instagramContactText);

    contactPageDiv.appendChild(ButtonComponent("Voltar ao ínicio", "green-button", () => {
        router.navigate("/")
    }));

    return contactPageDiv;
}