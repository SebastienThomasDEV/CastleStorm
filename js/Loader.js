export function loadImages(images, callback) {
    let imgLoaded = 0;
    const imgToLoad = Object.keys(images).length;
    for (let image in images) {
        images[image].onload = () => {
            imgLoaded++;
            if (imgLoaded === imgToLoad) {
                callback();
            }
        }
    }
}