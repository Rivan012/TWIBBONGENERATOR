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

// GANTI DENGAN TWIBBON RASIO 4:5
frame.src = "twibbon.png";

/* CANVAS WAJIB 4:5 */
canvas.width = 800;
canvas.height = 1000;

let pos = { x: 0, y: 0 };
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let scale = 1;

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
    isDragging = true;
    dragStart.x = e.offsetX - pos.x;
    dragStart.y = e.offsetY - pos.y;
});

canvas.addEventListener("mousemove", e => {
    if (!isDragging) return;
    pos.x = e.offsetX - dragStart.x;
    pos.y = e.offsetY - dragStart.y;
    draw();
});
canvas.addEventListener("mouseup", () => isDragging = false);

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

// DOWNLOAD
downloadBtn.addEventListener("click", () => {
    snapshotFlash();
    setTimeout(() => {
        const a = document.createElement("a");
        a.href = canvas.toDataURL();
        a.download = "twibbon-fix-4x5.png";
        a.click();
    }, 200);
});
