import CartModal from "../components/CartModal.js";

export default async () => {
    const page = document.createElement("div");
    const cartId = "aa92868f-5889-4c90-8f98-850c60732a92"; // Carrinho default;

    page.appendChild(await CartModal(cartId));

    return page;
}