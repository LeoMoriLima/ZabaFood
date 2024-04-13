import FooterMain from "../components/FooterMain.js";
import ProductBanner from "../components/ProductBanner.js";
import HeaderMain from "../components/HeaderMain.js";
import mainBanner from "../components/mainBanner.js";

export default async () => {
    const page = document.createElement("div");
    const productId = "4c3e47b0-dce2-48c8-9b79-21709abd12bb"; // Produto: Cúrcuma com Pimenta

    page.appendChild(HeaderMain());
    page.appendChild(mainBanner());
    page.appendChild(await ProductBanner(productId));
    page.appendChild(FooterMain());

    return page;
}