const mask = document.getElementById('mask');
const bigImg = document.getElementById('bigImg');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const smallImages = document.querySelectorAll('.image-card img');

let imgList = [];
let currentIndex = 0;
// 图片缩放倍率
let scaleNum = 1;
// 缩放步长
const step = 0.1;

smallImages.forEach((item, index) => {
    imgList.push(item.src);
    item.onclick = () => {
        currentIndex = index;
        bigImg.src = imgList[currentIndex];
        // 每次打开图片重置缩放大小
        scaleNum = 1;
        bigImg.style.transform = `scale(${scaleNum})`;
        bigImg.style.transform = "scale(0.8)";
        setTimeout(() => {
            bigImg.style.transform = `scale(${scaleNum})`;
        }, 10);
        mask.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
});

function closePreview() {
    mask.style.display = 'none';
    document.body.style.overflow = '';
}

closeBtn.onclick = closePreview;
mask.onclick = (e) => {
    if (e.target === mask) closePreview();
};

prevBtn.onclick = () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = imgList.length - 1;
    bigImg.src = imgList[currentIndex];
    // 切换图片重置缩放
    scaleNum = 1;
    bigImg.style.transform = `scale(${scaleNum})`;
};

nextBtn.onclick = () => {
    currentIndex++;
    if (currentIndex >= imgList.length) currentIndex = 0;
    bigImg.src = imgList[currentIndex];
    scaleNum = 1;
    bigImg.style.transform = `scale(${scaleNum})`;
};

// 键盘 A上一张 D下一张 ESC关闭
document.onkeydown = (e) => {
    if (mask.style.display !== 'flex') return;
    if (e.key === 'Escape') closePreview();
    if (e.key.toLowerCase() === 'a') prevBtn.click();
    if (e.key.toLowerCase() === 'd') nextBtn.click();
};

// 鼠标滚轮放大缩小
bigImg.onwheel = function (e) {
    e.preventDefault();
    if (e.deltaY < 0) {
        // 滚轮向上 放大
        scaleNum += step;
    } else {
        // 滚轮向下 缩小，限制最小0.3倍
        scaleNum -= step;
        if (scaleNum < 0.3) scaleNum = 0.3;
    }
    bigImg.style.transform = `scale(${scaleNum})`;
}