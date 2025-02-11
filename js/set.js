// 背景图片 Cookies
function setBgImg(bg_img) {
  if (bg_img) {
    Cookies.set("bg_img", bg_img, {
      expires: 36500,
    });
    return true;
  }
  return false;
}

// 获取背景图片 Cookies
function getBgImg() {
  let bg_img_local = Cookies.get("bg_img");
  if (bg_img_local && bg_img_local!== "{}") {
    return JSON.parse(bg_img_local);
  } else {
    setBgImg({ type: "1" });
    return { type: "1" };
  }
}

let bg_img_preinstall = {
  type: "1", // 1:默认背景 2:上一张 3:下一张 4:随机壁纸
};

// 更改背景图片
function setBgImgInit() {
  let bg_img = getBgImg();
  $("input[name='wallpaper-type'][value=" + bg_img["type"] + "]").click();

  let currentIndex = 1;
  let totalWallpapers = 12;

  switch (bg_img["type"]) {
    case "1":
      currentIndex = 1 + ~~(Math.random() * totalWallpapers);
      $("body").css("background-image", `url('img/background/background (${currentIndex}).jpg')`);
      break;
    case "2":
      // 获取当前显示的壁纸索引
      let currentBackground = $("body").css("background-image");
      let currentIndexMatch = currentBackground.match(/background \((\d+)\)/);
      if (currentIndexMatch) {
        currentIndex = parseInt(currentIndexMatch[1]);
        currentIndex = currentIndex > 1? currentIndex - 1 : totalWallpapers;
      }
      $("body").css("background-image", `url('img/background/background (${currentIndex}).jpg')`);
      break;
    case "3":
      currentBackground = $("body").css("background-image");
      currentIndexMatch = currentBackground.match(/background \((\d+)\)/);
      if (currentIndexMatch) {
        currentIndex = parseInt(currentIndexMatch[1]);
        currentIndex = currentIndex < totalWallpapers? currentIndex + 1 : 1;
      }
      $("body").css("background-image", `url('img/background/background (${currentIndex}).jpg')`);
      break;
    case "4":
      currentIndex = 1 + ~~(Math.random() * totalWallpapers);
      $("body").css("background-image", `url('img/background/background (${currentIndex}).jpg')`);
      break;
  }
}

$(document).ready(function () {
  // 壁纸数据加载
  setBgImgInit();
  // 设置背景图片
  $("#wallpaper").on("click", ".set-wallpaper", function () {
    let type = $(this).val();
    let bg_img = getBgImg();
    bg_img["type"] = type;
    iziToast.show({
      icon: "fa-solid fa-image",
      timeout: 2500,
      message: "壁纸设置成功，刷新后生效",
    });
    setBgImg(bg_img);
  });
});