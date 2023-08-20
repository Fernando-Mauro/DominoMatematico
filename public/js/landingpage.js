const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    effect: "cards",
    
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    //scrollbar: {
      //el: '.swiper-scrollbar',
    //},
  });