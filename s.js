$(document).ready(function () {
    const routes = [
      {
        path: "/",
        component: "./src/pages/home.html",
      },
      {
        path: "/categoria",
        component: "./src/pages/categoria.html",
      },
    ];
  
    const routing = () => {
      const windowPath = window.location.pathname;
      const route = routes.find(
        (route) => route.path.toLowerCase() === windowPath.toLowerCase()
      );
      return route;
    };
  
    const page = routing();
  
    if (page) {
      $("#root").empty(); // Limpa o conteúdo anterior
      $("#root").load(page.component, function (response, status, xhr) {
        if (status === "error") {
          const msg = "Erro ao carregar: " + xhr.status + " " + xhr.statusText;
          console.error(msg);
          $("#root").html("<p>" + msg + "</p>"); // Mostra erro no root
        }
      });
    } else {
      console.error("Rota não encontrada!");
    }
  });
  