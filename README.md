# PaletteForge

PaletteForge extracts dominant colors from an image using k-means clustering.

## Quick start

```bash
pip install -r requirements.txt
python -m app.server --port 5173
```

Open http://localhost:5173

## API

- POST `/api/palette` `{ "image": "data:image/...", "k": 5 }`

