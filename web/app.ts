const palette = document.getElementById("palette") as HTMLDivElement;
const extractButton = document.getElementById("extractButton") as HTMLButtonElement;
const imageInput = document.getElementById("imageInput") as HTMLInputElement;

function readFile(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function renderPalette(colors: string[]): void {
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
  const k = parseInt((document.getElementById("clusterInput") as HTMLInputElement).value, 10);
  fetch("/api/palette", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ image, k }),
  })
    .then((res) => res.json())
    .then((data) => renderPalette(data.palette || []));
});
