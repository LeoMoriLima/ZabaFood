export default (direction, id , disabled, onClick) => {
    const arrowButton = document.createElement("button");
    arrowButton.classList.add("arrow-buttons");
    arrowButton.id = id;
    arrowButton.disabled = disabled;
    
    const arrow = document.createElement("img");
    arrow.src = `/assets/images/arrow-${direction}.svg`;
    arrow.classList.add("arrow-buttons");
    arrowButton.appendChild(arrow);
    
    arrowButton.onclick = () => onClick(arrowButton);
    
    return arrowButton;
}

