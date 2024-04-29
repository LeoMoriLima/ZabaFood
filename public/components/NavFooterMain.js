import router from "../js/routes.js";

export default () => {
    const footerMain = document.createElement("footer");
    footerMain.classList.add("footer-main");
    
    const divFooterMain = document.createElement("div");
    divFooterMain.classList.add("div-footer-main");
    footerMain.appendChild(divFooterMain);

    const leftFooterDiv = document.createElement("div");
    leftFooterDiv.classList.add("left-footer-div");
    divFooterMain.appendChild(leftFooterDiv);

    const aTerm = document.createElement("a");
    aTerm.href="/terms";
    aTerm.onclick = (e) => {
        e.preventDefault();
        router.navigate("/terms");
    }
    aTerm.innerText = "Termos e condições";
    aTerm.classList.add("left-footer-a");
    leftFooterDiv.appendChild(aTerm);

    const aPolicy = document.createElement("a");
    aPolicy.href="/policy";
    aPolicy.onclick = (e) => {
        e.preventDefault();
        router.navigate("/policy");
    }
    aPolicy.innerText="Política de privacidade";
    aPolicy.classList.add("left-footer-a");
    leftFooterDiv.appendChild(aPolicy);

    const leftCenterFooterDiv = document.createElement("div");
    leftCenterFooterDiv.classList.add("left-center-footer-div");
    divFooterMain.appendChild(leftCenterFooterDiv);

    const paymentText = document.createElement("p");
    paymentText.innerText = "Formas de pagamento";
    paymentText.classList.add("payment-text");
    leftCenterFooterDiv.appendChild(paymentText);

    const paymentMethodIcon = document.createElement("img");
    paymentMethodIcon.src = "/assets/images/payment-methods-icon.svg";
    paymentMethodIcon.classList.add("payment-method-icon");
    leftCenterFooterDiv.appendChild(paymentMethodIcon);

    const rightCenterFooterDiv = document.createElement("div");
    rightCenterFooterDiv.classList.add("right-center-footer-div");
    divFooterMain.appendChild(rightCenterFooterDiv);
    
    const socialText = document.createElement("p");
    socialText.innerText = "Redes Sociais";
    rightCenterFooterDiv.appendChild(socialText);

    const rightCenterSocialDiv = document.createElement("div");
    rightCenterSocialDiv.classList.add("right-center-social-div");
    rightCenterFooterDiv.appendChild(rightCenterSocialDiv);


    const aInstagram = document.createElement("a");
    aInstagram.classList.add("a-instagram");
    aInstagram.href = "https://www.instagram.com/zabafoodbr/";
    aInstagram.target = "_blank";
    rightCenterSocialDiv.appendChild(aInstagram);

    const instagramIcon = document.createElement("img");
    instagramIcon.classList.add("instagram-icon");
    instagramIcon.src = "/assets/images/instagram-icon.svg";
    aInstagram.appendChild(instagramIcon);

    const aFacebook = document.createElement("a");
    aFacebook.classList.add("a-facebook");
    aFacebook.href = "https://www.facebook.com/profile.php?id=61558397242215&locale=pt_BR";
    aFacebook.target = "_blank";
    rightCenterSocialDiv.appendChild(aFacebook);

    const facebookIcon = document.createElement("img");
    facebookIcon.classList.add("facebook-icon");
    facebookIcon.src = "/assets/images/facebook-icon.svg";
    aFacebook.appendChild(facebookIcon);

    const aTikTok = document.createElement("a");
    aTikTok.classList.add("a-tiktok");
    aTikTok.href = "https://www.tiktok.com/@zabafoodbr";
    aTikTok.target = "_blank";
    rightCenterSocialDiv.appendChild(aTikTok);

    const tikTokIcon = document.createElement("img");
    tikTokIcon.classList.add("tiktok-icon");
    tikTokIcon.src = "/assets/images/tiktok-icon.svg";
    aTikTok.appendChild(tikTokIcon);

    const rightDivFooter = document.createElement("div");
    rightDivFooter.classList.add("right-div-footer");
    divFooterMain.appendChild(rightDivFooter);

    const aRightLogo = document.createElement("a");
    aRightLogo.href = "/";
    aRightLogo.onclick = (e) => {
        e.preventDefault();
        router.navigate("/");
    }
    aRightLogo.classList.add("a-right-logo");
    rightDivFooter.appendChild(aRightLogo);

    const rightLogo = document.createElement("img");
    rightLogo.src = "/assets/images/logo-zabafood2.svg";
    rightLogo.classList.add("right-logo-footer");
    aRightLogo.appendChild(rightLogo);

    return footerMain;
}