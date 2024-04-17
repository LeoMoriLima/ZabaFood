import ButtonComponent from "./ButtonComponent.js";

export default () => {
    const termPageDiv = document.createElement("div");
    termPageDiv.classList.add("common-page-div");

    const termIconDiv = document.createElement("div");
    termIconDiv.classList.add("common-icon-div");
    termPageDiv.appendChild(termIconDiv);

    const termIcon = document.createElement("img");
    termIcon.src = "../assets/images/z-icon.svg";
    termIcon.classList.add("term-icon");
    termIconDiv.appendChild(termIcon);

    const termTextDiv = document.createElement("div");
    termTextDiv.classList.add("common-text-div");
    termPageDiv.appendChild(termTextDiv);

    const termPageText = document.createElement("p");
    termPageText.innerText = "Termos e Condições da ZabaFood";
    termPageText.classList.add("common-page-text");
    termTextDiv.appendChild(termPageText);
    
    const termsList = document.createElement("dl");
    termsList.classList.add("term-list");
    termTextDiv.appendChild(termsList);

    const termsAndConditionsTitles = [
        "Descrição do Serviço:",
        "Cadastro e Conta do Usuário:",
        "Produtos e Transações:",
        "Pagamentos e Taxas:",
        "Direitos Autorais e Propriedade Intelectual:",
        "Comportamento do Usuário:",
        "Alterações nos Termos:",
        "Contato:",
    ]

    const termsAndConditions = [
        "A ZabaFood é um marketplace online que conecta produtores locais de alimentos artesanais a consumidores interessados em produtos autênticos e de alta qualidade. Nós fornecemos uma plataforma para que produtores e consumidores possam interagir e realizar transações comerciais.",
        "Para utilizar nossos serviços, é necessário criar uma conta. Você é responsável por manter a segurança de sua conta e por qualquer atividade realizada por meio dela. Informações pessoais fornecidas devem ser precisas e atualizadas.",
        "A ZabaFood não é proprietária dos produtos listados em nosso marketplace. Nós facilitamos transações entre produtores e consumidores, mas não garantimos a qualidade, segurança ou veracidade dos produtos. Recomendamos verificar informações e avaliações antes de efetuar uma compra.",
        "Ao realizar uma compra, você concorda em pagar o valor total especificado. A ZabaFood pode cobrar taxas relacionadas a transações comerciais. Essas taxas serão claramente indicadas durante o processo de compra.",
        "Todo o conteúdo presente na ZabaFood, incluindo textos, imagens, logotipos, e outros materiais, são protegidos por direitos autorais e são propriedade da ZabaFood ou de seus respectivos proprietários. O uso não autorizado desses materiais é proibido.",
        "Ao utilizar nossos serviços, você concorda em não realizar atividades que violem nossos Termos e Condições, incluindo práticas fraudulentas, uso indevido do sistema, envio de conteúdo inadequado, entre outras ações prejudiciais.",
        "A ZabaFood reserva-se o direito de alterar estes Termos e Condições a qualquer momento. Recomendamos revisar periodicamente esta página para estar ciente de quaisquer atualizações.",
        "Se tiver dúvidas ou preocupações sobre nossos Termos e Condições, entre em contato conosco pelo e-mail: contato@zabafood.com.",
    ];
    
    termsAndConditionsTitles.forEach((title, index) => {
        const termTitle = document.createElement("dt");
        termTitle.classList.add("term-list-title");
        termTitle.textContent = title;
    
        const termText = document.createElement("dd");
        termText.classList.add("term-list-text")
        termText.textContent = termsAndConditions[index];
    
        termsList.appendChild(termTitle);
        termsList.appendChild(termText);
    });
    
    termPageDiv.appendChild(ButtonComponent("Voltar ao ínicio", "green-button", () => {
        window.route({ preventDefault: () => {}, target: { href: "/" } });
    }));

    return termPageDiv;
}