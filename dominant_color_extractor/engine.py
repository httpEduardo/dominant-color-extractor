import base64
import io
import random

from PIL import Image


def _load_image(data_url):
    header, encoded = data_url.split(",", 1)
    raw = base64.b64decode(encoded)
    return Image.open(io.BytesIO(raw))


def _to_hex(color):
    return "#" + "".join(f"{max(0, min(255, int(c))):02x}" for c in color)


def kmeans(colors, k=5, iterations=8):
    if not colors:
        return []
    random.seed(42)
    centroids = random.sample(colors, min(k, len(colors)))

    for _ in range(iterations):
        clusters = [[] for _ in centroids]
        for color in colors:
            distances = [sum((c - cc) ** 2 for c, cc in zip(color, centroid)) for centroid in centroids]
            idx = distances.index(min(distances))
            clusters[idx].append(color)
        new_centroids = []
        for cluster in clusters:
            if not cluster:
                new_centroids.append(random.choice(colors))
                continue
            avg = [sum(channel) / len(cluster) for channel in zip(*cluster)]
            new_centroids.append(avg)
        centroids = new_centroids
    return centroids


def extract_palette(data_url, k=5):
    image = _load_image(data_url).convert("RGB")
    image = image.resize((120, 120))
    pixels = list(image.getdata())
    sample = random.sample(pixels, min(2000, len(pixels)))
    centroids = kmeans(sample, k=k)
    return [_to_hex(color) for color in centroids]
