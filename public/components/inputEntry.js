export default (placeholder, type, id, imgName) => {

    const divInput = document.createElement("div");
    divInput.classList.add("div-input");

    const inputEntry = document.createElement("input");
    inputEntry.classList.add("input-entry");
    inputEntry.placeholder = placeholder;
    inputEntry.type = type;
    inputEntry.id = id;
    divInput.appendChild(inputEntry);

    const imgInput = document.createElement("img");
    imgInput.classList.add("entry-icon")
    imgInput.src = `../assets/images/${imgName}.svg`;
    divInput.appendChild(imgInput);
    
    return divInput;
}