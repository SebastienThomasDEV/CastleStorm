
export function load(images, callback) {
    let imgLoaded = 0;
    console.log(images);
    const imgToLoad = Object.keys(images).length;
    for (let image in images) {
        images[image].onload = () => {
            imgLoaded++;
            if (imgLoaded === imgToLoad) {
                return callback()
            }
        }
    }
}