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
  AOS.init()
  stopPreloader();

  if(typePage == 'home') {
    home()
  }
}

// Função que contém o código JS utilizado na página home
const home = () => {

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
          dots: true
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: true
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
          dots: true
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
