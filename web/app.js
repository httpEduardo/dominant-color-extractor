"use strict";
const palette = document.getElementById("palette");
const extractButton = document.getElementById("extractButton");
const imageInput = document.getElementById("imageInput");
function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}
function renderPalette(colors) {
    palette.innerHTML = "";
    if (!colors.length) {
        palette.innerHTML = "<p>No palette yet.</p>";
        return;
    }
    colors.forEach((color) => {
        const swatch = document.createElement("div");
        swatch.className = "swatch";
        swatch.style.background = color;
        swatch.innerHTML = `<span>${color}</span><span>rgb</span>`;
        palette.appendChild(swatch);
    });
}
extractButton.addEventListener("click", async () => {
    const file = imageInput.files?.[0];
    if (!file) {
        renderPalette([]);
        return;
    }
    const image = await readFile(file);
    const k = parseInt(document.getElementById("clusterInput").value, 10);
    fetch("/api/palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image, k }),
    })
        .then((res) => res.json())
        .then((data) => renderPalette(data.palette || []));
});
