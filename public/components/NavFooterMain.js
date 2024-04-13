export default () =>{
    const divFooterMain = document.createElement("div");
    divFooterMain.classList.add("div-footer-main");

    const leftFooterDiv = document.createElement("div");
    leftFooterDiv.classList.add("left-footer-div");
    divFooterMain.appendChild(leftFooterDiv);

    const aTerm = document.createElement("a");
    aTerm.href="/terms";
    aTerm.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => {}, target: { href: "/terms" } });
    }
    aTerm.innerText = "Termos e condições";
    aTerm.classList.add("left-footer-a");
    leftFooterDiv.appendChild(aTerm)

    const aPolicy = document.createElement("a");
    aPolicy.href="/policy";
    aPolicy.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => {}, target: { href: "/policy" } });
    }
    aPolicy.innerText="Política de privacidade";
    aPolicy.classList.add("left-footer-a");
    leftFooterDiv.appendChild(aPolicy);

    const sellYourProducts = document.createElement("a");
    sellYourProducts.href = "/producer";
    sellYourProducts.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => {}, target: { href: "/producer" } });
    }
    sellYourProducts.innerText = "Venda seus produtos";
    sellYourProducts.classList.add("left-footer-a");
    leftFooterDiv.appendChild(sellYourProducts);

    const leftCenterFooterDiv = document.createElement("div");
    leftCenterFooterDiv.classList.add("left-center-footer-div");
    divFooterMain.appendChild(leftCenterFooterDiv);

    const paymentText = document.createElement("p");
    paymentText.innerText = "Formas de pagamento";
    paymentText.classList.add("payment-text");
    leftCenterFooterDiv.appendChild(paymentText);

    const paymentMethodIcon = document.createElement("img");
    paymentMethodIcon.src = "../assets/images/payment-methods-icon.svg";
    paymentMethodIcon.classList.add("payment-method-icon");
    leftCenterFooterDiv.appendChild(paymentMethodIcon);

    const rightCenterFooterDiv = document.createElement("div");
    rightCenterFooterDiv.classList.add("right-center-footer-div");
    divFooterMain.appendChild(rightCenterFooterDiv);

    const socialText = document.createElement("p");
    socialText.innerText = "Redes Sociais";
    rightCenterFooterDiv.appendChild(socialText);

    const aInstagram = document.createElement("a");
    aInstagram.classList.add("a-instagram");
    aInstagram.href = "https://www.instagram.com/zabafoodbr/";
    rightCenterFooterDiv.appendChild(aInstagram);

    const instagramIcon = document.createElement("img");
    instagramIcon.classList.add("instagram-icon");
    instagramIcon.src = "../assets/images/instagram-icon.svg"
    aInstagram.appendChild(instagramIcon);

    const aFacebook = document.createElement("a");
    aFacebook.classList.add("a-facebook");
    aFacebook.href = "https://www.facebook.com/profile.php?id=61558397242215&locale=pt_BR";
    rightCenterFooterDiv.appendChild(aFacebook);

    const facebookIcon = document.createElement("img");
    facebookIcon.classList.add("facebook-icon")
    facebookIcon.src = "../assets/images/facebook-icon.svg"
    aFacebook.appendChild(facebookIcon);

    const aTikTok = document.createElement("a");
    aTikTok.classList.add("a-tiktok");
    aTikTok.href = "https://www.tiktok.com/@zabafoodbr";
    rightCenterFooterDiv.appendChild(aTikTok);

    const tikTokIcon = document.createElement("img");
    tikTokIcon.classList.add("tiktok-icon")
    tikTokIcon.src = "../assets/images/tiktok-icon.svg"
    aTikTok.appendChild(tikTokIcon);

    const rightDivFooter = document.createElement("div");
    rightDivFooter.classList.add("right-div-footer");
    divFooterMain.appendChild(rightDivFooter);

    const aRightLogo = document.createElement("a");
    aRightLogo.href = "/";
    aRightLogo.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => {}, target: { href: "/" } });
    }
    aRightLogo.classList.add("a-right-logo");
    rightDivFooter.appendChild(aRightLogo);

    const rightLogo = document.createElement("img");
    rightLogo.src = "../assets/images/logo-zabafood2.svg";
    rightLogo.classList.add("rigth-logo-footer");
    aRightLogo.appendChild(rightLogo);

    return divFooterMain;
}