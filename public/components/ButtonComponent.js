export default (text, className, onClick) => {
    const buttonEntry = document.createElement("button");
    buttonEntry.innerText = text;
    buttonEntry.classList.add(className);

    buttonEntry.onclick = () => onClick();

    return buttonEntry;
}