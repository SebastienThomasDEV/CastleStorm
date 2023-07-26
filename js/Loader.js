export async function loadImages(paths) {
    const images = [];

    for (let i = 0, l = paths.length; i < l; i++) {
        images[i] = await loadImage(paths[i]);
    }

    return images;
}

async function loadImage(path) {
    const image = new Image();
    image.src = path;

    try {
        await image.decode();
    } catch (error) {
        console.log(error);
        return null;
    }

    return image;
}