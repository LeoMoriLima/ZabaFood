export default (size) =>{
    const loadingDiv = document.createElement("div");
    loadingDiv.style.width = `${size}rem`;
    loadingDiv.style.height = `${size}rem`
    
    const loadingImg = document.createElement("img");
    loadingImg.src = "/assets/images/zaba-leaves-loading.png";
    loadingImg.classList.add("loading-animation");
    loadingImg.style.width = `${size}rem`;

    loadingDiv.appendChild(loadingImg);

    return loadingDiv
}