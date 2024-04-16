import CartModal from "../components/CartModal.js";

export default async () => {
    const page = document.createElement("div");

    page.appendChild(await CartModal());

    return page;
}