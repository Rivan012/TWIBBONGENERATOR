const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const zoom = document.getElementById("zoom");
const downloadBtn = document.getElementById("downloadBtn");

let img = new Image();
let frame = new Image();

// GANTI FILE FRAME TWIBBON 4:5 KAMU DI SINI!
frame.src = "twibbon.png";  

// Set rasio 4:5 → 800x1000
canvas.width = 800;
canvas.height = 1000;

let pos = { x: 0, y: 0 };
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let scale = 1;

// Upload gambar
upload.addEventListener("change", (e) => {
    const file = e.target.files[0];
    img = new Image();
    img.onload = draw;
    img.src = URL.createObjectURL(file);
});

// Zoom
zoom.addEventListener("input", () => {
    scale = zoom.value;
    draw();
});

// Drag / geser gambar
canvas.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragStart.x = e.offsetX - pos.x;
    dragStart.y = e.offsetY - pos.y;
});

canvas.addEventListener("mouseup", () => isDragging = false);
canvas.addEventListener("mouseout", () => isDragging = false);

canvas.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    pos.x = e.offsetX - dragStart.x;
    pos.y = e.offsetY - dragStart.y;
    draw();
});

// Render foto + frame
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img.src) {
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        ctx.restore();
    }

    // Render twibbon frame 4:5
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
}

// Download hasil
downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "twibbon-4x5.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});
