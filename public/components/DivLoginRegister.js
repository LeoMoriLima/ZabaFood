export default () =>{

    const divBackground = document.createElement("div");
    divBackground.classList.add("div-background");

    const entryCard = document.createElement("div");
    entryCard.classList.add("entry-card");
    entryCard.id = "entry-card";
    divBackground.appendChild(entryCard)


    return divBackground;
}