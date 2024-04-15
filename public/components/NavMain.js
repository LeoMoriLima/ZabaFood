import inputEntry from "./inputEntry.js";
import text from "./Text.js";
import buttonGray from "./ButtonComponent.js";
import textA from "./Text-a.js";

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

    divLightGreen.appendChild(text("Primeira compra? Use o cupom BOASVINDAS e ganhe 8% Off!", "discount-text", "text-class"));

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
        window.route({ preventDefault: () => { }, target: { href: "/" } });
    }
    headerDivLeft.appendChild(aLogoImg);

    const logoImg = document.createElement("img");
    logoImg.src = "../assets/images/logo-zabafood.svg";
    logoImg.classList.add("logo-img-header");
    aLogoImg.appendChild(logoImg);

    const divInputHeader = document.createElement("div");
    const divInput = inputEntry("O que você está procurando?", "text", "search-input", "none");
    divInput.id = "input-header";
    divInputHeader.appendChild(divInput);
    divInputHeader.classList.add("div-input-header");
    headerDivLeft.appendChild(divInputHeader);

    const buttonSearch = buttonGray("", "button-search", "onClick");
    const imgSearch = document.createElement("img");
    imgSearch.src = "../assets/images/search-icon.svg";
    imgSearch.id = "img-search";
    buttonSearch.appendChild(imgSearch);
    divInputHeader.appendChild(buttonSearch);

    // Pesquisa

    buttonSearch.addEventListener("click", async (event) => {
        event.preventDefault();
        const searchTerm = document.getElementById("search-input").value.trim();
        try {
            const searchURL = `/products/search/${encodeURIComponent(searchTerm)}`;
            window.route({ preventDefault: () => { }, target: { href: searchURL } });
        } catch (error) {
            console.error("Erro ao buscar produtos:", error.message);
        }
    });


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
        window.route({ preventDefault: () => { }, target: { href: "/contact" } });
    }
    contactDiv.appendChild(aPhoneIcon);

    const phoneIcon = document.createElement("img");
    phoneIcon.src = "../assets/images/phone-icon.svg";
    aPhoneIcon.appendChild(phoneIcon);

    const aContact = textA("ATENDIMENTO", "a-contact", "none", "/contact");
    aContact.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => { }, target: { href: "/contact" } });
    }
    contactDiv.appendChild(aContact);

    const accountDiv = document.createElement("div");
    accountDiv.classList.add("account-div");
    headerDivRight.appendChild(accountDiv);

    const aAccountIcon = document.createElement("a");
    aAccountIcon.classList.add("a-account-icon");
    aAccountIcon.href = "/myaccount"
    aAccountIcon.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => { }, target: { href: "/myaccount" } });
    }
    accountDiv.appendChild(aAccountIcon);

    const accountIcon = document.createElement("img");
    accountIcon.src = "../assets/images/user-icon.svg";
    accountIcon.classList.add("a-account-icon");
    aAccountIcon.appendChild(accountIcon);

    const aAccount = textA("MINHA CONTA", "a-account", "none", "/myaccount");
    aAccount.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => { }, target: { href: "/myaccount" } });
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
        window.route({ preventDefault: () => { }, target: { href: "/" } });
    }
    cartDiv.appendChild(aCartIcon);

    const cartIcon = document.createElement("img");
    cartIcon.src = "../assets/images/cart-icon.svg";
    aCartIcon.appendChild(cartIcon);

    const navBarDiv = document.createElement("div");
    navBarDiv.classList.add("nav-bar-div");
    divNavMain.appendChild(navBarDiv)

    const productsMenuDiv = document.createElement("div");
    productsMenuDiv.classList.add("products-menu-div");
    productsMenuDiv.appendChild(textA("PRODUTOS", "products-menu", "none", "/myaccount"));
    navBarDiv.appendChild(productsMenuDiv);
    productsMenuDiv.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => { }, target: { href: "/products" } });
    }
    navBarDiv.appendChild(productsMenuDiv);

    const productsMenuArrow = document.createElement("img");
    productsMenuArrow.classList.add("products-menu-arrow");
    productsMenuArrow.src = "../assets/images/arrow-down.svg";
    productsMenuDiv.appendChild(productsMenuArrow);

    // const dialogMenuModal = document.createElement("dialog");

    const rightSideNavbarDiv = document.createElement("div");
    rightSideNavbarDiv.classList.add("right-side-navbar-div");
    navBarDiv.appendChild(rightSideNavbarDiv);

    const sellYourProducts = textA("VENDA SEUS PRODUTOS", "sell-your-products", "none", "/producer");
    sellYourProducts.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => { }, target: { href: "/producer" } });
    }
    rightSideNavbarDiv.appendChild(sellYourProducts);

    const about = textA("QUEM SOMOS", "about-nav", "none", "/about");
    about.onclick = (e) => {
        e.preventDefault();
        window.route({ preventDefault: () => { }, target: { href: "/about" } });
    }
    rightSideNavbarDiv.appendChild(about);

    return divNavMain;
}