export default (text, id) =>{
    const buttonEntry = document.createElement("button");
    buttonEntry.innerText = text;
    buttonEntry.id = id;
    buttonEntry.classList.add("button-entry");
    
    return buttonEntry;
}