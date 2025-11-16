const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const zoom = document.getElementById("zoom");
const downloadBtn = document.getElementById("downloadBtn");

let img = new Image();
let frame = new Image();

// Ganti twibbon 4:5 kamu di sini
frame.src = "twibbon.png";  

canvas.width = 800;
canvas.height = 1000;

let pos = { x: 0, y: 0 };
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let scale = 1;

// =======================================
// UPLOAD FOTO
// =======================================
upload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    img = new Image();
    img.onload = draw;
    img.src = URL.createObjectURL(file);
});

// =======================================
// ZOOM SLIDER
// =======================================
zoom.addEventListener("input", () => {
    scale = zoom.value;
    draw();
});

// =======================================
// DRAG — PC (mouse)
// =======================================
canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragStart.x = e.offsetX - pos.x;
    dragStart.y = e.offsetY - pos.y;
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    pos.x = e.offsetX - dragStart.x;
    pos.y = e.offsetY - dragStart.y;
    draw();
});

canvas.addEventListener("mouseup", () => (isDragging = false));
canvas.addEventListener("mouseleave", () => (isDragging = false));

// =======================================
// DRAG — HP (TOUCH EVENTS)
// =======================================
canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
    let touch = e.touches[0];
    isDragging = true;
    dragStart.x = touch.clientX - canvas.getBoundingClientRect().left - pos.x;
    dragStart.y = touch.clientY - canvas.getBoundingClientRect().top - pos.y;
});

canvas.addEventListener("touchmove", function (e) {
    if (!isDragging) return;
    e.preventDefault();

    let touch = e.touches[0];
    let x = touch.clientX - canvas.getBoundingClientRect().left;
    let y = touch.clientY - canvas.getBoundingClientRect().top;

    pos.x = x - dragStart.x;
    pos.y = y - dragStart.y;

    draw();
});

canvas.addEventListener("touchend", () => (isDragging = false));

// =======================================
// RENDER FOTO + FRAME
// =======================================
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img.src) {
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        ctx.restore();
    }

    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
}

// =======================================
// DOWNLOAD
// =======================================
downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "twibbon-4x5.png";
    link.href = canvas.toDataURL();
    link.click();
});
