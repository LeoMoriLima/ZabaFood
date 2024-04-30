export default () => {
    const ImageLine = document.createElement("img");
    ImageLine.src = "/assets/images/lines-footer-page.svg";
    ImageLine.classList.add("footer-image-line");

    return ImageLine;
}