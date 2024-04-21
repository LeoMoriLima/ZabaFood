import about from "../pages/about.js";
import contact from "../pages/contact.js";
import home from "../pages/home.js";
import login from "../pages/login.js";
import notFound from "../pages/notFound.js";
import register from "../pages/register.js";
import product from "../pages/product.js";
import terms from "../pages/terms.js";
import confirmation from "../pages/confirmation.js";
import policy from "../pages/policy.js";
import checkout from "../pages/checkout.js";
import cart from "../pages/cart.js";
import myaccount from "../pages/myaccount.js";
import products from "../pages/products.js";
import payment from "../pages/payment.js";
import payconfirmation from "../pages/payconfirmation.js";

class Router {
	constructor() {
		this.routes = {};
		this.routeParamsRegex = /\/\:([\w]+)/g;
	}

	// Adiciona uma rota estática ou dinâmica com um manipulador
	addRoute(path, handler) {
		// Converta a rota para uma RegExp para poder reconhecer segmentos dinâmicos
		const regexPath = this._routeToRegex(path);
		this.routes[regexPath] = {
			handler,
			path,
			regex: new RegExp(`^${regexPath}$`) // Use ^ e $ para corresponder ao início e fim da string
		};
	}

	// Converte a rota com segmentos dinâmicos para uma expressão regular
	_routeToRegex(path) {
		return path.replace(this.routeParamsRegex, '/([^/]*)');
	}

	// Processa a mudança de rota
	navigate(path, ignorePushState) {
		for (const [regexPath, routeInfo] of Object.entries(this.routes)) {
			const match = path.match(routeInfo.regex);
			if (match) {
				if (!ignorePushState) {
					window.history.pushState({}, "", match[0]);
				}
				const params = this._extractParams(routeInfo.path, match);
				routeInfo.handler(params);
				return;
			}
		}

		this.navigate("/not-found")
	}

	// Extrai os parâmetros de uma rota dinâmica com base nos segmentos capturados pelo regex
	_extractParams(route, match) {
		const params = {};
		const paramNames = route.match(this.routeParamsRegex);
		if (paramNames) {
			for (const [index, paramName] of paramNames.entries()) {
				const paramNameWithoutColon = paramName.slice(2); // remove "/:"
				params[paramNameWithoutColon] = match[index + 1];
			}
		}
		return params;
	}
}

const switchPage = async (page, params) => {
	const root = document.getElementById("root");
	root.innerHTML = "";
	if (params) {
		root.appendChild(await page(params));
		return
	}
	root.appendChild(await page());
}

const router = new Router();

router.addRoute("/", async () => switchPage(home));
router.addRoute("/about", async () => switchPage(about));
router.addRoute("/cart", async () => switchPage(cart));
router.addRoute("/checkout", async () => switchPage(checkout));
router.addRoute("/confirmation", async () => switchPage(confirmation));
router.addRoute("/contact", async () => switchPage(contact));
router.addRoute("/login", async () => switchPage(login));
router.addRoute("/myaccount", async () => switchPage(myaccount));
router.addRoute("/not-found", async () => switchPage(notFound));
router.addRoute("/policy", async () => switchPage(policy));
router.addRoute("/product/:id", async (params) => {
	const id = params.id;
	switchPage(product, id);
});
router.addRoute("/products", async () => switchPage(products));
router.addRoute("/register", async () => switchPage(register));
router.addRoute("/terms", async () => switchPage(terms));
router.addRoute("/payment", async () => switchPage(payment));
router.addRoute("/pay-confirmation", async () => switchPage(payconfirmation));

router.navigate(window.location.pathname)

window.addEventListener('popstate', () => {
	router.navigate(window.location.pathname, true);
});

export default router