import LoadingComponent from "./LoadingComponent.js"

export default (id) => {
    const skeletonDiv = document.createElement("div");

    skeletonDiv.id = id

    skeletonDiv.classList.add("product-card");

    skeletonDiv.appendChild(LoadingComponent(5));

    return skeletonDiv;
}