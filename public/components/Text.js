export default (text_content, id, class_text) => {
    const text = document.createElement("p");
    text.innerText = text_content;
    text.id = id;
    text.classList.add(class_text);
    return text;
}