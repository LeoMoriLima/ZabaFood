import FooterMain from "../components/FooterMain.js";
import ProductBanner from "../components/ProductBanner.js";
import HeaderMain from "../components/HeaderMain.js";
import mainBanner from "../components/MainBanner.js";
import Carousel from "../components/Carousel.js";
import ImageLine from "../components/ImageLine.js";
import MessageContainer from "../components/MessageContainer.js";

export default async () => {
    document.title = "Home | ZabaFood";
    const page = document.createElement("div");
    page.classList.add("home");
    page.appendChild(MessageContainer());
    page.appendChild(await HeaderMain());
    page.appendChild(mainBanner());
    page.appendChild(await Carousel());
    page.appendChild(await ProductBanner());
    page.appendChild(ImageLine());
    page.appendChild(FooterMain());

    return page;
}
