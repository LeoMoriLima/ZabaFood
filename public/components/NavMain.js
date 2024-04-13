import inputEntry from "./inputEntry.js";

export default () => {
    const divNavMain = document.createElement("div");
    divNavMain.classList.add("div-nav-main");

    const divLightGreen = document.createElement("div");
    divLightGreen.classList.add("div-light-green");
    divNavMain.appendChild(divLightGreen);

    const discountIcon = document.createElement("img");
    discountIcon.src = "../assets/images/discount-icon.svg";
    discountIcon.classList.add("discount-icon");
    divLightGreen.appendChild(discountIcon);

    const discountText = document.createElement("p");
    discountText.innerText = "Primeira compra? Use o cupom BOASVINDAS e ganhe 8% Off!";
    divLightGreen.appendChild(discountText);

    const navDivCenter = document.createElement("div");
    navDivCenter.classList.add("nav-div-center");
    divNavMain.appendChild(navDivCenter);

    const headerDivLeft = document.createElement("div");
    headerDivLeft.classList.add("header-div-left");
    navDivCenter.appendChild(headerDivLeft);

    const aLogoImg = document.createElement("a");
    aLogoImg.classList.add("a-logo-img");
    aLogoImg.href = "/";
    aLogoImg.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => {}, target: { href: "/" } });
    }
    headerDivLeft.appendChild(aLogoImg);
    
    const logoImg = document.createElement("img");
    logoImg.src = "../assets/images/logo-zabafood.svg";
    logoImg.classList.add("logo-img-header");
    aLogoImg.appendChild(logoImg);

    const divInputHeader = document.createElement("div");
    divInputHeader.classList.add("div-input-header");
    headerDivLeft.appendChild(divInputHeader);
    
    const buttonSearch = document.createElement("button");
    divInputHeader.appendChild(inputEntry("O que você está procurando?", "text", "search-input", "none"));
    divInputHeader.appendChild(buttonSearch);

    const imgSearch = document.createElement("img")
    imgSearch.src = "../assets/images/search-icon.svg"
    buttonSearch.appendChild(imgSearch);

    // buttonSearch.addEventListener("click", async () =>{
    //     const inputSearch = document.getElementById("search-input");
                
    // })

    const headerDivRight = document.createElement("div");
    headerDivRight.classList.add("header-div-right");
    navDivCenter.appendChild(headerDivRight);

    const contactDiv = document.createElement("div");
    contactDiv.classList.add("contact-div");
    headerDivRight.appendChild(contactDiv);

    const aPhoneIcon = document.createElement("a");
    aPhoneIcon.classList.add("a-phone-icon");
    aPhoneIcon.href = "/contact"
    aPhoneIcon.onclick = (e) => {
    e.preventDefault();
        window.route({ preventDefault: () => {}, target: { href: "/contact" } });
    }
    contactDiv.appendChild(aPhoneIcon);

    const phoneIcon = document.createElement("img");
    phoneIcon.src = "../assets/images/phone-icon.svg";
    aPhoneIcon.appendChild(phoneIcon);    

    const aContact = document.createElement("a");
    aContact.classList.add("a-contact");
    aContact.innerText = "Atendimento";
    aContact.href = "/contact";
    aContact.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => {}, target: { href: "/contact" } });
    }
    contactDiv.appendChild(aContact);

    const accountDiv = document.createElement("div");
    accountDiv.classList.add("account-div");
    headerDivRight.appendChild(accountDiv);

    const aAccountIcon = document.createElement("a");
    aAccountIcon.classList.add("a-account-icon");
    aAccountIcon.href= "/myaccount"
    aAccountIcon.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => {}, target: { href: "/myaccount" } });
    }
    accountDiv.appendChild(aAccountIcon);

    const accountIcon = document.createElement("img");
    accountIcon.src = "../assets/images/user-icon.svg";
    accountIcon.classList.add("a-account-icon");
    aAccountIcon.appendChild(accountIcon);

    const aAccount = document.createElement("a");
    aAccount.classList.add("a-account");
    aAccount.innerText = "Minha Conta";
    aAccount.href = "/myaccount";
    aAccount.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => {}, target: { href: "/myaccount" } });
    }
    accountDiv.appendChild(aAccount);

    const cartDiv = document.createElement("div");
    cartDiv.classList.add("cart-div");
    headerDivRight.appendChild(cartDiv);

    const aCartIcon = document.createElement("a");
    aCartIcon.classList.add("a-cart-icon");
    aCartIcon.href = "/cart";
    aCartIcon.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => {}, target: { href: "/" } });
    }
    cartDiv.appendChild(aCartIcon);
    
    const cartIcon = document.createElement("img");
    cartIcon.src = "../assets/images/cart-icon.svg";
    aCartIcon.appendChild(cartIcon);

    const navBarDiv = document.createElement("div");
    navBarDiv.classList.add("nav-bar-div");
    divNavMain.appendChild(navBarDiv)

    const productsMenuDiv = document.createElement("a");
    productsMenuDiv.classList.add("products-menu-a");
    navBarDiv.appendChild(productsMenuDiv);

    const productsMenu = document.createElement("a");
    productsMenu.classList.add("products-menu");
    productsMenu.innerText = "PRODUTOS";
    productsMenu.href = "/products";
    productsMenu.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => {}, target: { href: "/products" } });
    }
    productsMenuDiv.appendChild(productsMenu);

    const productsMenuArrow = document.createElement("img");
    productsMenuArrow.classList.add("products-menu-arrow");
    productsMenuArrow.src = "../assets/images/arrow-down.svg";
    productsMenuDiv.appendChild(productsMenuArrow);

    // const dialogMenuModal = document.createElement("dialog");



    const rightSideNavbarDiv = document.createElement("div");
    rightSideNavbarDiv.classList.add("right-side-navbar-div");
    navBarDiv.appendChild(rightSideNavbarDiv);

    const sellYourProducts = document.createElement("a");
    sellYourProducts.classList.add("sell-your-products");
    sellYourProducts.href = "/producer"
    sellYourProducts.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => {}, target: { href: "/producer" } });
    }
    sellYourProducts.innerText = "VENDA SEUS PRODUTOS";
    rightSideNavbarDiv.appendChild(sellYourProducts);

    const about = document.createElement("a");
    about.classList.add("sell-your-products");
    about.href = "/about"
    about.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => {}, target: { href: "/about" } });
    }
    about.innerText = "QUEM SOMOS";
    rightSideNavbarDiv.appendChild(about);

        return divNavMain;
}