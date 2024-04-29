import ButtonComponent from "./ButtonComponent.js";
import router from "../js/routes.js";


export default () => {
    const aboutPageDiv = document.createElement("div");
    aboutPageDiv.classList.add("about-page-div");

    const aboutIconDiv = document.createElement("div");
    aboutIconDiv.classList.add("about-icon-div");
    aboutPageDiv.appendChild(aboutIconDiv);

    const aboutIcon = document.createElement("img");
    aboutIcon.src = "/assets/images/z-icon.svg";
    aboutIcon.classList.add("about-icon");
    aboutIconDiv.appendChild(aboutIcon);

    const aboutTextDiv = document.createElement("div");
    aboutTextDiv.classList.add("about-text-div");
    aboutPageDiv.appendChild(aboutTextDiv);

    const aboutPageText = document.createElement("p");
    aboutPageText.innerText = "Fundada em 2024, a ZabaFood é um marketplace especializado em alimentos artesanais, conectando produtores locais apaixonados pela culinária artesanal a consumidores que valorizam produtos autênticos e de qualidade. Nosso objetivo é promover a diversidade gastronômica e oferecer uma experiência única, onde cada produto conta uma história de dedicação e tradição. Com ZabaFood, você descobre o melhor os melhores produtos feitos com amor e cuidado, diretamente da fonte para a sua mesa.";
    aboutPageText.classList.add("about-page-text");
    aboutTextDiv.appendChild(aboutPageText);

    aboutPageDiv.appendChild(ButtonComponent("Voltar ao ínicio", "green-button", () => {
        router.navigate("/");
    }));

    return aboutPageDiv;
}