export default (text, className, onClick) => {
    const button = document.createElement("button");
    button.innerText = text;
    button.classList.add(className);

    if (onClick) {
        button.onclick = () => onClick(button);
    }

    return button;
}