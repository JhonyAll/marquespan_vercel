const routes = [
  {
    path: "/",
    typePage: "home",
    component: "home.html",
  },
  { path: "/empresa", typePage: "empresa", component: "empresa.html" },
  {
    path: "/categoria",
    typePage: "categoria",
    component: "./src/pages/categoria.html",
  },
  {
    path: "/logistica",
    typePage: "logistica",
    component: "logistica.html",
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
  await $.get("./src/js/eventos.json", function (data) {
    $(data).each((i, e) => {
      const route = {
        path: `/${e.slug_ev}`,
        typePage: "event",
        component: "eventos.html",
      };
      routes.push(route);
    });
  });

  await $.get("./src/js/categorias.json", function (data) {
    $(data).each((i, e) => {
      const route = {
        path: `/${e.slug_ev}`,
        component: "produtos.html",
      };
      routes.push(route);
    });
  });

  await $.get("./src/js/produtos.json", function (data) {
    $(data).each((i, e) => {
      const route = {
        path: `/${e.slug_ev}`,
        component: "produto.html",
      };
      routes.push(route);
    });
  });
  const page = await routing();

  if (page) {
    $("#root").empty();
    $("#root").load(`./src/pages/${page.component}`, function () {
      start(page.typePage);
    });
  } else {
    console.error("Rota não encontrada!");
  }
});
