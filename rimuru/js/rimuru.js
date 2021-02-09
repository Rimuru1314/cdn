
appendSocial({
    // "icon-github": "https://baidu.com",
    // "icon-gitee-fill-round1": "https://baidu.com",
    // "icon-csdn": "https://baidu.com",
    // "icon-zhihu1": "https://baidu.com",
    // "icon-jianshu": "https://baidu.com",
    "icon-QQ": "https://wpa.qq.com/msgrd?v=3&uin=2225602504&site=qq&menu=yes",
    "icon-weixin": "https://cdn.jsdelivr.net/gh/Rimuru1314/cdn/img/custom/rimuru.png",
    "icon-bilibili": "https://space.bilibili.com/287756715",
    "icon-wangyiyun": "https://music.163.com/#/user/home?id=1702282092",
    "icon-sina": "http://weibo.com/u/7317533751",
  });
footFish();
cheatTitle();
magicCirle();


/**
 * 插入svg社交图标
 * @param {object} obj 传入对象，键为图标id，值为点击后跳转的地址
 * @returns {any}
 */
function appendSocial  (obj) {
  for (var svgId in obj) {
    $(".card-info-social-icons").append(
      '<a class="social-icon" href="' +
        obj[svgId] +
        '" target="_blank"><svg class="icon" aria-hidden="true" style="width: 1em;height: 1em;vertical-align: -0.15em;fill: currentColor;overflow: hidden;"><use xlink:href="#' +
        svgId +
        '"></use></svg></a>'
    );
  }
}

/**
 * 离开时切换标题
 * @param {string} leaveTitle 离开时显示的标题
 * @param {string} backTitle 回来时显示的标题
 * @param {string} leaveIcon 离开时显示的icon
 * @param {string} backIcon 回来时显示的icon
 * @returns {xkTool} this
 */
function cheatTitle (leaveTitle, backTitle, leaveIcon, backIcon) {
  var OriginTitle = document.title;
  var titleTime;
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      $('[rel="icon"]').attr(
        "href",
        leaveIcon
          ? leaveIcon
          : "https://cdn.jsdelivr.net/gh/sviptzk/StaticFile_HEXO@v3.2.7.1/butterfly/img/favicon.ico"
      );
      document.title = leaveTitle ? leaveTitle : "！！这里这里 ◕ ں ◕ ";
      clearTimeout(titleTime);
    } else {
      $('[rel="icon"]').attr(
        "href",
        backIcon
          ? backIcon
          : "https://cdn.jsdelivr.net/gh/sviptzk/StaticFile_HEXO@v3.2.7.1/butterfly/img/favicon.ico"
      );
      document.title = backTitle
        ? backTitle
        : "(ฅ>ω<*ฅ) 欢迎回来哦！爱你哟~" + OriginTitle;
      titleTime = setTimeout(function () {
        document.title = OriginTitle;
      }, 2000);
    }
  });
  return this;
}

/**
 * 页脚养鱼
 * @returns {any}
 */
 function footFish () {
  $("#footer-wrap").css({
    position: "absolute",
    "text-align": "center",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    "z-index": 99,
  });
  $("footer").append(
    `<div class="container" id="jsi-flying-fish-container"></div>`
  );
  $("body").append(
    '<script src="https://cdn.jsdelivr.net/gh/sviptzk/StaticFile_HEXO@master/lib/js/fish.js"></script>'
  );
  return this;
}


/**
 * 魔幻圆圈
 * @date 2020-07-03
 * @param {any} radius 圆圈数量
 * @param {any} densety 密度
 * @param {any} color 颜色，random为随机
 * @param {any} clearOffset 消失偏移
 * @returns {any}
 */
function magicCirle (radius, densety, color, clearOffset) {
  $(".scroll-down").after(
    '<canvas id="canvas" width="1700px" height="470"></canvas>'
  );
  $("");
  $.fn.circleMagic = function (options) {
    let width,
      height,
      largeContainer,
      canvas,
      ctx,
      target,
      animateHeader = true;
    let circles = [];
    // 对象合并
    let settings = $.extend(
      {
        elem: ".header",
        color: "rgba(255,225,225,.4)",
        radius: 20,
        densety: 0.3,
        clearOffset: 0.2,
      },
      options
    );

    initContainer();
    addListeners();

    function initContainer() {
      width = $(window).width();
      height = $(window).height();
      target = { x: 0, y: height };
      largeContainer = document.querySelector(settings.elem);
        if(largeContainer) {
          
          largeContainer.style.height = height + "px";
          initCanvas();
          canvas = document.getElementById("canvas");
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext("2d");
          for (let x = 0; x < width * settings.densety; x++) {
            let c = new Circle();
            circles.push(c);
          }
          animate();
      }
    }

    function initCanvas() {
      let canvasElement = document.createElement("canvas");
      canvasElement.id = "canvas";
      largeContainer.append(canvasElement);
    }

    function addListeners() {
      window.addEventListener("scroll", scrollCheck);
      window.addEventListener("resize", resize);
    }

    function scrollCheck() {
      if (document.body.scrollTop > height) animateHeader = false;
      else animateHeader = true;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if(largeContainer) {
        largeContainer.style.height = height + "px";
        canvas.width = width;
        canvas.height = height;
      }
    }

    function animate() {
      if (animateHeader) {
        ctx.clearRect(0, 0, width, height);
        for (let i in circles) {
          circles[i].draw();
        }
      }
      requestAnimationFrame(animate);
    }

    function randomColor() {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      let alpha = Math.random().toPrecision(2);
      let rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      return rgba;
    }

    function Circle() {
      let self = this;
      (function () {
        self.pos = {};
        init();
      })();
      function init() {
        self.pos.x = Math.random() * width;
        self.pos.y = height + Math.random() * 100;
        self.alpha = 0.1 + Math.random() * settings.clearOffset;
        self.scale = 0.1 + Math.random() * 0.3;
        self.speed = Math.random();
        if (settings.color === "random") {
          self.color = randomColor();
        } else {
          self.color = settings.color;
        }
      }
      this.draw = function () {
        if (self.alpha <= 0) {
          init();
        }
        self.pos.y -= self.speed;
        self.alpha -= 0.0005;
        ctx.beginPath();
        ctx.arc(
          self.pos.x,
          self.pos.y,
          self.scale * settings.radius,
          0,
          2 * Math.PI,
          false
        );
        ctx.fillStyle = self.color;
        ctx.fill();
        ctx.closePath();
      };
    }
  };
  $(".full_page")
    .css({
      overflow: "hidden",
    })
    .circleMagic({
      elem: ".full_page",
      radius: radius ? radius : 18,
      densety: densety ? densety : 0.1,
      color: color ? color : "random",
      // color: 'rgba(255,105,180,.7)',
      clearOffset: clearOffset ? clearOffset : 0.3,
    });
  return this;
}
