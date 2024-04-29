import router from "../js/routes.js";

export default () => {
    const navHeaderLogin = document.createElement("nav");
    navHeaderLogin.classList.add('nav-header-login', 'roboto-regular');

    const backBtn = document.createElement("a");
    backBtn.href = '/';
    backBtn.onclick = (e) => {
        e.preventDefault();
        router.navigate("/");
    }
    backBtn.classList.add('back-btn');
    navHeaderLogin.appendChild(backBtn);

    const arrowLeftImg = document.createElement("img");
    arrowLeftImg.src = "/assets/images/arrow-left.svg";
    arrowLeftImg.classList.add('arrow-left-img');
    backBtn.appendChild(arrowLeftImg);

    const spanBack = document.createElement("span");
    spanBack.innerText = "Voltar";
    spanBack.classList.add("span-back");
    backBtn.appendChild(spanBack); 


    const logoBtn = document.createElement("a");
    logoBtn.href = '/';
    logoBtn.onclick = (e) => {
        e.preventDefault();
        router.navigate("/");
    }
    logoBtn.classList.add('logo-btn');
    navHeaderLogin.appendChild(logoBtn);
    
    const logoImg = document.createElement("img");
    logoImg.src = "/assets/images/logo-zabafood.svg";
    logoImg.classList.add('logo-img');
    logoBtn.appendChild(logoImg);

    return navHeaderLogin;
}

