const imagesList = {};

export const ImageManager = {
    image(name){
        return imagesList[name];
    },
    load({name, src}){
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                imagesList[name] = {
                    name,
                    width: image.width,
                    height: image.height,
                    src,
                    element: image
                }
                resolve(imagesList[name]);
            }
            image.src = src;
        })
    },
    loadAll(images){
        return Promise.all(
            images.map(image => ImageManager.load(image))
        )
    }
}