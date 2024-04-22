import LoadingComponent from "./LoadingComponent.js"

export default (id) => {
    const skeletonDiv = document.createElement("div");

    skeletonDiv.id = id

    skeletonDiv.classList.add("product-main-card");

    skeletonDiv.style.display = "flex"
    skeletonDiv.style.justifyContent = "center"
    skeletonDiv.style.alignItems= "center"
    skeletonDiv.style.minHeight = "45rem"

    skeletonDiv.appendChild(LoadingComponent(10));

    return skeletonDiv;
}