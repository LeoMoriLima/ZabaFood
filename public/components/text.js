export default (text_content, id, class_text) => {
    const text = document.createElement("div");
    text.innerText = text_content;
    text.id = id;
    text.classList.add(class_text);
    return text;
}