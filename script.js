const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const zoomSlider = document.getElementById("zoom");
const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const downloadBtn = document.getElementById("downloadBtn");
const loader = document.getElementById("loader");
const flash = document.getElementById("flash");

let img = new Image();
let frame = new Image();

<<<<<<< HEAD
// GANTI DENGAN TWIBBON RASIO 4:5
frame.src = "twibbon.png";

/* CANVAS WAJIB 4:5 */
=======
// Ganti twibbon 4:5 kamu di sini
frame.src = "twibbon.png";  

>>>>>>> e4cdc111197dffaa47fc187d5d082e72951fed10
canvas.width = 800;
canvas.height = 1000;

let pos = { x: 0, y: 0 };
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let scale = 1;

<<<<<<< HEAD
// UPLOAD
upload.addEventListener("change", e => {
    loader.classList.remove("hidden");

    setTimeout(() => {
        const file = e.target.files[0];
        img = new Image();
        img.onload = () => {
            loader.classList.add("hidden");
            snapshotFlash(); 
            draw();
        };
        img.src = URL.createObjectURL(file);
    }, 600);
});

// SNAPSHOT EFFECT
function snapshotFlash() {
    flash.style.opacity = 1;
    setTimeout(() => flash.style.opacity = 0, 200);
}

// ZOOM SLIDER
zoomSlider.addEventListener("input", () => {
    scale = zoomSlider.value;
    draw();
});

// ZOOM BUTTONS
zoomInBtn.onclick = () => {
    scale = Math.min(scale + 0.1, 3);
    zoomSlider.value = scale;
    draw();
};
zoomOutBtn.onclick = () => {
    scale = Math.max(scale - 0.1, 0.5);
    zoomSlider.value = scale;
    draw();
};

// DRAG MOUSE
canvas.addEventListener("mousedown", e => {
=======
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
>>>>>>> e4cdc111197dffaa47fc187d5d082e72951fed10
    isDragging = true;
    dragStart.x = e.offsetX - pos.x;
    dragStart.y = e.offsetY - pos.y;
});

<<<<<<< HEAD
canvas.addEventListener("mousemove", e => {
=======
canvas.addEventListener("mousemove", (e) => {
>>>>>>> e4cdc111197dffaa47fc187d5d082e72951fed10
    if (!isDragging) return;
    pos.x = e.offsetX - dragStart.x;
    pos.y = e.offsetY - dragStart.y;
    draw();
});
canvas.addEventListener("mouseup", () => isDragging = false);

<<<<<<< HEAD
// DRAG TOUCH
canvas.addEventListener("touchstart", e => {
    let t = e.touches[0];
    isDragging = true;

    let rect = canvas.getBoundingClientRect();
    dragStart.x = t.clientX - rect.left - pos.x;
    dragStart.y = t.clientY - rect.top - pos.y;
});

canvas.addEventListener("touchmove", e => {
    if (!isDragging) return;
    let t = e.touches[0];

    let rect = canvas.getBoundingClientRect();
    pos.x = t.clientX - rect.left - dragStart.x;
    pos.y = t.clientY - rect.top - dragStart.y;

    draw();
});
canvas.addEventListener("touchend", () => isDragging = false);

// DRAW
=======
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
>>>>>>> e4cdc111197dffaa47fc187d5d082e72951fed10
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

<<<<<<< HEAD
// DOWNLOAD
downloadBtn.addEventListener("click", () => {
    snapshotFlash();
    setTimeout(() => {
        const a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = "twibbon-fix-4x5.png";
        a.click();
    }, 200);
=======
// =======================================
// DOWNLOAD
// =======================================
downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "twibbon-4x5.png";
    link.href = canvas.toDataURL();
    link.click();
>>>>>>> e4cdc111197dffaa47fc187d5d082e72951fed10
});
