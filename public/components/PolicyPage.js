import ButtonComponent from "./ButtonComponent.js";
import router from "../js/routes.js";

export default () => {
    const policyPageDiv = document.createElement("div");
    policyPageDiv.classList.add("common-page-div");

    const policyIconDiv = document.createElement("div");
    policyIconDiv.classList.add("common-icon-div");
    policyPageDiv.appendChild(policyIconDiv);

    const policyIcon = document.createElement("img");
    policyIcon.src = "/assets/images/z-icon.svg";
    policyIcon.classList.add("policy-icon");
    policyIconDiv.appendChild(policyIcon);

    const policyTextDiv = document.createElement("div");
    policyTextDiv.classList.add("common-text-div");
    policyPageDiv.appendChild(policyTextDiv);

    const policyH1 = document.createElement("h1");
    policyH1.innerText = "Política de privacidade.";
    policyH1.classList.add("common-page-text");
    policyTextDiv.appendChild(policyH1)

    const policyPageText = document.createElement("p");
    policyPageText.innerText = "A ZabaFood valoriza a privacidade e a segurança dos dados de seus usuários. Esta Política de Privacidade descreve como coletamos, usamos e protegemos as informações pessoais que você nos fornece ao usar nossos serviços.";
    policyPageText.classList.add("policy-page-text");
    policyTextDiv.appendChild(policyPageText);
    
    const policyList = document.createElement("dl");
    policyList.classList.add("policy-list");
    policyTextDiv.appendChild(policyList);

    const policyTitles = [
        "Coleta de Informações",
        "Uso de Informações",
        "Segurança de Dados",
        "Cookies e Tecnologias Semelhantes",
        "Alterações na Política de Privacidade",
        "Contato",
    ]

    const policyPolicy = [
        "A ZabaFood valoriza a privacidade e a segurança dos dados de seus usuários. Esta Política de Privacidade descreve como coletamos, usamos e protegemos as informações pessoais que você nos fornece ao usar nossos serviços.",
        "Ao utilizar a ZabaFood, podemos coletar informações pessoais como nome, endereço de e-mail, informações de pagamento e preferências de compra. Também podemos coletar automaticamente informações sobre seu dispositivo, como endereço IP, navegador e sistema operacional.",
        "Utilizamos as informações coletadas para fornecer nossos serviços, processar transações, personalizar sua experiência, enviar comunicações relevantes e melhorar nossos produtos e serviços. Não compartilhamos suas informações pessoais com terceiros para fins de marketing sem seu consentimento.",
        "Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, uso indevido, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet ou armazenamento eletrônico é 100% seguro, e não podemos garantir segurança absoluta.",
        "Utilizamos cookies e tecnologias semelhantes para coletar informações sobre sua interação com nosso site e melhorar sua experiência. Você pode controlar o uso de cookies através das configurações do seu navegador.",
        "Reservamo-nos o direito de atualizar esta Política de Privacidade periodicamente. Recomendamos revisar esta página regularmente para estar ciente de quaisquer alterações.",
        "Se tiver dúvidas ou preocupações sobre nossa Política de Privacidade, entre em contato conosco pelo e-mail: privacidade@zabafood.com.",
    ];
    
    policyTitles.forEach((title, index) => {
        const policyTitle = document.createElement("dt");
        policyTitle.classList.add("policy-list-title");
        policyTitle.textContent = title;
    
        const policyText = document.createElement("dd");
        policyText.classList.add("policy-list-text")
        policyText.textContent = policyPolicy[index];
    
        policyList.appendChild(policyTitle);
        policyList.appendChild(policyText);
    });
    
    policyPageDiv.appendChild(ButtonComponent("Voltar ao ínicio", "green-button", () => {
        router.navigate("/")
    }));

    return policyPageDiv;
}