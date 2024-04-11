const urlPageTitle = "ZabaFood";

// Cria um escutador de evento de clique e verifica os links de navegação
document.addEventListener("click", (e) => {
	const { target } = e;
	if (!target.matches("nav a")) {
		return;
	}
	e.preventDefault();
	urlRoute();
});

// Cria um objeto para mapear a url para o template, titulo e descrição
const urlRoutes = {
	404: {
		template: "/pages/404.html",
		title: "404 | " + urlPageTitle,
		description: "Page not found",
	},
	"/": {
		template: "/pages/home.html",
		title: "Home | " + urlPageTitle,
		description: "This is the home page",
	},
	"/about": {
		template: "/pages/about.html",
		title: "Quem Somos | " + urlPageTitle,
		description: "This is the about page",
	},
	"/contact": {
		template: "/pages/contact.html",
		title: "Contato | " + urlPageTitle,
		description: "This is the contact page",
	},
	"/login": {
		template: "/pages/login.html",
		title: "Login | " + urlPageTitle,
		description: "This is the login page",
	},
	"/register": {
		template: "/pages/register.html",
		title: "Register | " + urlPageTitle,
		description: "This is the register page",
	},
};

// Cria uma função que verifica a url e chama o urlLocationHandler
const urlRoute = (event) => {
	event = event || window.event;
	event.preventDefault();

	window.history.pushState({}, "", event.target.href);
	urlLocationHandler();
};

// Cria uma função para lidar com a localização da url
const urlLocationHandler = async () => {
	const location = window.location.pathname;

	if (location.length == 0) {
		location = "/";
	}

	const route = urlRoutes[location] || urlRoutes["404"];
	const html = await fetch(route.template).then((response) => response.text());
	document.getElementById("root").innerHTML = html;
	document.title = route.title;
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", route.description);
};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;
urlLocationHandler();