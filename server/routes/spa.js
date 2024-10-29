// spa.js

const routes = {
    "/": "/login.html",
    "/login": "/login.html",
    "/todo": "/todo.html",
    "/edit-todo": "/edit-todo.html",
    "/404": "/error404.html"
};

// arrow function for handling the click event
function route(event) {
    event.preventDefault();
    const path = event.target.getAttribute("href");
    window.history.pushState({}, "", path);
    handleLocation();
};

async function handleLocation() {
    const path = window.location.pathname;
    const route = routes[path] || routes["/404"];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
}

// Handle back/forward browser navigation
window.onpopstate = handleLocation;
window.route = route;

handleLocation();