export default (text, id, onClick) => {
    const buttonEntry = document.createElement("button");
    buttonEntry.innerText = text;
    buttonEntry.id = id;
    buttonEntry.classList.add("button-entry");

    buttonEntry.onclick = () => onClick();

    return buttonEntry;
}