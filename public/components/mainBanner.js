export default () => {
    const divMainBanner = document.createElement("div");
    divMainBanner.classList.add("div-main-banner");

    const divBannerImg = document.createElement("div");
    divBannerImg.classList.add("div-banner-img");
    divMainBanner.appendChild(divBannerImg);

    const bannerImg = document.createElement("img");
    bannerImg.classList.add("banner-img")
    bannerImg.src = "/assets/images/banner-main.svg";
    divBannerImg.appendChild(bannerImg);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("info-div");
    divMainBanner.appendChild(infoDiv);

    const deliveryDiv = document.createElement("div");
    deliveryDiv.classList.add("delivery-div");
    infoDiv.appendChild(deliveryDiv);

    const deliveryIcon = document.createElement("img");
    deliveryIcon.src = "/assets/images/delivery-truck.svg";
    deliveryIcon.classList.add("delivery-icon");
    deliveryDiv.appendChild(deliveryIcon);

    const deliveryText = document.createElement("p");
    deliveryText.innerText = "FRETE GRÁTIS *";
    deliveryText.classList.add("info-div-text");
    deliveryDiv.appendChild(deliveryText);

    const signDiv = document.createElement("div");
    signDiv.classList.add("sign-div");
    infoDiv.appendChild(signDiv);

    const signIcon = document.createElement("img");
    signIcon.src = "/assets/images/sign-icon.svg";
    signIcon.classList.add("sign-icon");
    signDiv.appendChild(signIcon);

    const signText = document.createElement("p");
    signText.innerText = "DESCONTO DE ATÉ 4% NO PIX";
    signText.classList.add("info-div-text");
    signDiv.appendChild(signText);

    const percentageDiv = document.createElement("div");
    percentageDiv.classList.add("percentage-div");
    infoDiv.appendChild(percentageDiv);

    const percentageIcon = document.createElement("img");
    percentageIcon.src = "/assets/images/percentage-icon.svg";
    percentageIcon.classList.add("percentage-icon");
    percentageDiv.appendChild(percentageIcon);

    const percentageText = document.createElement("p");
    percentageText.innerText = "GANHE DESCONTO A PARTIR DA 3° UNIDADE";
    percentageText.classList.add("info-div-text");
    percentageDiv.appendChild(percentageText);

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card-div");
    infoDiv.appendChild(cardDiv);

    const cardIcon = document.createElement("img");
    cardIcon.src = "/assets/images/card-icon.svg";
    cardIcon.classList.add("card-icon");
    cardDiv.appendChild(cardIcon);

    const cardText = document.createElement("p");
    cardText.innerText = "RECARREGUE EM ATÉ 5X NO CARTÃO";
    cardText.classList.add("info-div-text");
    cardDiv.appendChild(cardText);
    
    return divMainBanner;
}