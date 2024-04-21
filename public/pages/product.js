import HeaderMain from "../components/HeaderMain.js";
import ProductMain from "../components/ProductMain.js";
import FooterMain from "../components/FooterMain.js";

export default async (id) => {
  document.title = "Produto | ZabaFood";

  const page = document.createElement("div");
  page.appendChild(await HeaderMain());
  page.appendChild(await ProductMain(id))
  page.appendChild(FooterMain());

  return page;
}