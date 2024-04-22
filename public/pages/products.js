import HeaderMain from "../components/HeaderMain.js";
import ProductsMain from "../components/ProductsMain.js";
import FooterMain from "../components/FooterMain.js";
import MessageContainer from "../components/MessageContainer.js";

export default async (params) => {
  document.title = "Produtos | ZabaFood";

  const page = document.createElement("div");
  page.appendChild(MessageContainer());
  page.classList.add("products-page");
  page.appendChild(await HeaderMain());
  page.appendChild(await ProductsMain(params));
  page.appendChild(FooterMain());

  return page;
}