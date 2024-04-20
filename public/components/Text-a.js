import router from "../js/routes.js";

export default (text_content, id, class_text, href) => {
    const text = document.createElement("a");
    text.innerText = text_content;
    text.id = id;
    text.classList.add(class_text);
    text.href = href;
    text.onclick = (e) => {
        e.preventDefault();
        router.navigate(href)
    }
    return text;
}