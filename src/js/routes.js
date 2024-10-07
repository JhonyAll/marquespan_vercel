const routes = [
  {
    path: "/",
    typePage: "home",
    component: "./src/pages/home.html",
  },
  {
    path: "/categoria",
    typePage: "categoria",
    component: "./src/pages/categoria.html",
  },
];

const routing = async () => {
  const windowPath = window.location.pathname;
  const route = routes.find(
    (route) => route.path.toLowerCase() === windowPath.toLowerCase()
  );
  return route;
};

$(document).ready(async function () {
  const page = await routing();

  if (page) {
    $("#root").empty();
    $("#root").load(page.component, function () {
      start(page.typePage)
    });
  } else {
    console.error("Rota não encontrada!");
  }
});
