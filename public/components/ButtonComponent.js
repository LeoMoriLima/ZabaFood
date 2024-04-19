export default (text, className, onClick) => {
    const button = document.createElement("button");
    button.innerText = text;
    button.classList.add(className);

    button.onclick = () => onClick(button);

    return button;
}