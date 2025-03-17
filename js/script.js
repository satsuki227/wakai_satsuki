$(function () {
  // ハンバーガーメニュー
  $(".hamburger").click(function () {
    $(".hamburger").toggleClass("open");
    $(".gnav-sp").fadeToggle();
  });

  // Slickが読み込まれている場合のみスライダーを実行
  if (typeof $.fn.slick !== "undefined") {
    // メインビジュアルスライダー
    $(".main-visual").slick({
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
    });

    // カルーセルスライダー（共通設定）
    $(".carousel").slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
    //スライダー
    $(".other_container").each(function (index) {
      const $slider = $(this).find(".slider-wrap");
      const $prevBtn = $(this).find(".custom-prev");
      const $nextBtn = $(this).find(".custom-next");
      const $counter = $(this).find(".custom-counter");

      // スライダーの初期化 & カウンターの更新
      $slider.on(
        "init reInit afterChange",
        function (event, slick, currentSlide) {
          let i = (currentSlide ? currentSlide : 0) + 1; // 現在のスライド (1から始める)
          $counter.text(i + " / " + slick.slideCount); // カウンターを更新
        }
      );

      // Slick の設定（個別に適用）
      $slider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: false, // デフォルトの矢印を非表示
      });

      // カスタム矢印ボタン
      $prevBtn.click(function () {
        $slider.slick("slickPrev");
      });

      $nextBtn.click(function () {
        $slider.slick("slickNext");
      });
    });
  }

  $(window).on("scroll", function () {
    const scrollTop = $(window).scrollTop();
    const winH = $(window).height();

    // profile_imagesの処理
    const profileArea = $(".profile_images").offset();
    if (profileArea && profileArea.top - winH * 0.4 < scrollTop) {
      $(".profile_wrapper_2").each(function (index) {
        $(this)
          .delay(index * 400)
          .queue(function (next) {
            $(this).addClass("show");
            next();
          });
      });
    }

    // .box の処理
    $(".box").each(function (index) {
      if ($(this).offset().top - winH * 0.7 < scrollTop) {
        $(this)
          .delay(index * 300)
          .queue(function (next) {
            $(this).addClass("ready");
            next();
          });
      }
    });

    // .box の処理
    $(".web_box").each(function (index) {
      if ($(this).offset().top - winH * 0.7 < scrollTop) {
        $(this)
          .delay(index * 300)
          .queue(function (next) {
            $(this).addClass("ready");
            next();
          });
      }
    });
  });
  

  // 初回チェック（ロード時にスクロールイベントを実行）
  $(document).ready(function () {
    $(window).trigger("scroll");
  });
});

