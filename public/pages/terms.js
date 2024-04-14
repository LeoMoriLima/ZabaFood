import TermsPage from "../components/TermsPage.js";

export default () => {
    const page = document.createElement("div");

    page.appendChild(TermsPage());

    return page;
}