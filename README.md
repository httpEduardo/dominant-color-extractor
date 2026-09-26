# Dominant Color Extractor

![Python](https://img.shields.io/badge/Python-3.x-3776AB?logo=python&logoColor=white)

Dominant Color Extractor extracts dominant colors from an image using k-means clustering.

## Quick start

```bash
pip install -r requirements.txt
python -m dominant_color_extractor.server --port 5173
```

Open http://localhost:5173

## API

- POST `/api/palette` `{ "image": "data:image/...", "k": 5 }`

