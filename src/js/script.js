// Função para remover o preloader
const stopPreloader = () => {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";

  const content = document.getElementById("content");
  content.style.display = "block";
};

// Funções para o Header

// Função para fixar o Header ao scrollar
window.onscroll = () => {
  let header = document.getElementById("Header");
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  let stickyPoint = 62;

  if (scrollTop > stickyPoint) {
    header.classList.add("header-fixed");
  } else {
    header.classList.remove("header-fixed");
  }
};

// Função para abrir o FullMenu
const openFullMenu = () => {
  let fullmenu = document.getElementById("FullMenu");

  fullmenu.classList.add("open");
  document.querySelector("body").classList.add("overflow-hidden");
};

// Funções para o FullMenu

// Função para fechar o menu
const closeFullMenu = () => {
  let fullmenu = document.getElementById("FullMenu");

  fullmenu.classList.remove("open");
  document.querySelector("body").classList.remove("overflow-hidden");
};

// Função que irá inicializar todas as demais funções correspondendo a rota de cada uma
const start = (typePage) => {
  AOS.init();
  setInterval(() => {
    AOS.init();
  }, 500);
  stopPreloader();

  if (typePage == "home") {
    homePage();
  }
  if (typePage == "event") {
    eventPage();
  }
  if (typePage == "empresa") {
    empresaPage();
  }
};

const empresaPage = () => {
  function animarNumeros() {
    const numeros = document.querySelectorAll(".numero");
    numeros.forEach((numero) => {
      const valorFinal = parseInt(numero.getAttribute("data-numero"));
      const duracao = 2000;
      const passo = (valorFinal / duracao) * 50;

      let contador = 0;

      const temporizador = setInterval(() => {
        contador += passo;
        numero.textContent = Math.floor(contador);

        if (contador >= valorFinal) {
          numero.textContent = valorFinal;
          clearInterval(temporizador);
        }
      }, 50);
    });
  }

  function verificarScroll() {
    const numerosSection = document.querySelector(".numeros");
    const numerosPosicao = numerosSection.getBoundingClientRect().top;

    const alturaJanela = window.innerHeight;

    if (numerosPosicao < alturaJanela) {
      animarNumeros();
      window.removeEventListener("scroll", verificarScroll);
    }
  }

  window.addEventListener("scroll", verificarScroll);
};

const eventPage = () => {
  $("body").css("background", "#eee");
  $(".redirect-link").on("click", function (event) {
    event.preventDefault();
    window.location.hash = $(this).attr("href");
  });
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    window.location.hash = 0;
    window.location.hash = targetId;
  }
  loadEventPage();
};

// Função que contém o código JS utilizado na página home
const homePage = () => {
  // Tudo relacionado ao modal do video
  $(".redirect-link").on("click", function (event) {
    event.preventDefault();
    window.location.hash = $(this).attr("href");
  });
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    window.location.hash = 0;
    window.location.hash = targetId;
  }

  if (!window.location.hash) {
    $("#videoModal").fadeIn(0, function () {
      $("#videoModal").css("visibility", "hidden");
      $(".modal-content").addClass("active");
    });
  }
  $("#closeBtn").click(function () {
    $(".modal-content").removeClass("active");
    $("#videoModal").fadeOut(500, function () {
      $("#popupVideo")[0].pause();
    });
  });
  $("#videoModal").click(function (event) {
    if (event.target !== this) return;
    $(".modal-content").removeClass("active");
    $("#videoModal").fadeOut(500, function () {
      $("#popupVideo")[0].pause();
    });
  });

  $(".modal-content").click(function (event) {
    event.stopPropagation();
  });

  const video = $("#popupVideo")[0];

  $("#popupVideo").on("dblclick", function () {
    if (video.muted) {
      video.muted = false;
    } else {
      video.muted = true;
    }
  });

  video.addEventListener("play", function () {
    $("#videoModal").css("visibility", "visible");
  });

  // Inicia o carousel que contém os eventos
  $("#eventsSlider").slick({
    arrows: false,
    dots: $("#eventsSlider").children().length > 4 ? true : false,
    speed: 800,
    focusOnSelect: true,
    centerMode: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    responsive: [
      {
        breakpoint: 1125,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: false,
          centerPadding: "0",
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  });

  // Inicializa o slider de vídeo (slider principal)
  $(".video-slider")
    .slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: ".image-carousel",
    })
    .on("afterChange", function (event, slick, currentSlide) {
      // Função para dar play no vídeo atual
      var currentVideo = $(".video-slider").find("video")[currentSlide];
      currentVideo.play();

      $(".video-slider")
        .find("video")
        .each(function (index, video) {
          if (index !== currentSlide) {
            video.pause();
            video.currentTime = 0;
          }
        });
    });

  // Inicializa o slider de thumbnails
  $(".image-carousel").slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 15000,
    centerMode: false,
    variableWidth: false,
    asNavFor: ".video-slider",
    focusOnSelect: true,
  });

  // Inicia o Hero Slider no começo da página usando o puglin Swiper
  document.querySelector(".p-swiper").classList.add("p-swiper-active");
  document.querySelector(".title-swiper").classList.add("title-swiper-active");
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    autoplay: {
      delay: 4000,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    speed: 2000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      bulletClass: "swiper-pagination-bullet",
      bulletActiveClass: "swiper-pagination-bullet-active",
    },
    on: {
      slideChangeTransitionStart: function () {
        swiper.slides[swiper.previousIndex]
          .querySelector(".p-swiper")
          .classList.remove("p-swiper-active");
        swiper.slides[swiper.previousIndex]
          .querySelector(".title-swiper")
          .classList.remove("title-swiper-active");
        swiper.slides[swiper.activeIndex]
          .querySelector(".p-swiper")
          .classList.add("p-swiper-active");
        swiper.slides[swiper.activeIndex]
          .querySelector(".title-swiper")
          .classList.add("title-swiper-active");
      },
    },
  });
};

// Função responsável por chamar os dados de um evento especifico e apresenta-lo na página event
async function loadEventPage() {
  await $.get("./src/js/eventos.json", function (data) {
    var event;
    data.forEach((evento) => {
      if (window.location.pathname === "/" + evento.slug_ev) {
        event = evento;
      }
    });
    var imagesEvent = [];
    $.get("./src/js/imagens_ev.json", function (imgsEv) {
      imgsEv.forEach((imgEv) => {
        if (imgEv.fk == event.id_ev) {
          imagesEvent.push({
            img_p: imgEv.img_p,
            img_g: imgEv.img_g,
          });
        }
      });
      for (let i = 0; i < imagesEvent.length; i++) {
        const element = `
            <div class="col-md-4 gallery-item p-3">
              <a
                class="venobox"
                data-gall="gallery"
                href="./src/assets/img/eventos/${imagesEvent[i].img_g}.jpg"
              >
                <img src="./src/assets/img/eventos/${imagesEvent[i].img_p}.jpg"/>
              </a>
            </div>`;
        $("#gallery-container").append(element);
      }
      $("#title-gallery-event").empty();
      $("#title-gallery-event").append(`${event.nome_ev}`);
      $("#description-gallery-event").empty();
      $("#description-gallery-event").append(`${event.descricao_ev}`);
      $(".venobox").venobox({
        titleattr: "data-title",
        numeratio: true,
        infinigall: true,
        spinner: "rotating-plane",
      });
    });
  });
}
