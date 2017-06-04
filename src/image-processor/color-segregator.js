import pixels from 'get-pixels';

export class Location {
    x = 0;
    y = 0;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class FormFactor {
    left = undefined;
    right = undefined;
    top = undefined;
    bottom = undefined;
    pixels = 0;
    primaryColor = undefined;

    constructor(location, color) {
        this.left = location.x;
        this.right = location.x;
        this.top = location.y;
        this.bottom = location.y;
        this.primaryColor = color;
    }

    percent = () => {
        return this.pixels / ((this.right - this.left) *(this.bottom - this.top));
    }

    append = (location) => {
        this.pixels++;
        if (location.x < this.left) (this.left = location.x);
        if (location.x > this.right) (this.right = location.x)
        if (location.y < this.top) (this.top = location.y);
        if (location.y > this.bottom) (this.bottom = location.y);

        this.bottomRight = location;
    }

    contains = (formFactor) => {
        return (this.left <= formFactor.left 
        && this.top <= formFactor.top 
        && this.right >= formFactor.right
        && this.bottom >= formFactor.bottom)
    }

}

export class ColorSegregator {

    variation(color1, color2) {
        if (color1[0] === color2[0]
            && color1[1] === color2[1]
            && color1[2] === color2[2]
            && color1[3] === color2[3]) return 1;
        return 0;
    }

    matchingLocations = (x, y, width, height) => {

        let left = (x, y) => {
            if (x <= 0) return undefined;
            return new Location(x - 1, y);
        }

        let topLeft = (x, y) => {
            if (x <= 0 || y <= 0) return undefined;
            return new Location(x - 1, y - 1);
        }

        let top = (x, y) => {
            if (y <= 0) return undefined;
            return new Location(x, y - 1);
        }

        let topRight = (x, y) => {
            if (x >= width || y <= 0) return undefined;
            return new Location(x + 1, y - 1);
        }

        let locations = []

        let d = undefined;
        d = left(x, y);
        d && locations.push(d);

        d = undefined;
        d = topLeft(x, y);
        d && locations.push(d);

        d = undefined;
        d = top(x, y);
        d && locations.push(d);

        d = undefined;
        d = topRight(x, y);
        d && locations.push(d);

        return locations;
    }


    segregate(tImage) {
        return new Promise((resolve, reject) => {

            pixels(tImage, (err, pixels) => {

                if (!err && pixels) {
                    const width = pixels.shape[0];
                    const height = pixels.shape[1];
                    const colorFactor = pixels.shape[2];
                    const data = pixels.data;
                    const length = pixels.data.length;
                    let colorMap = [];
                    for (let index = 0; index < length; index = index + 4) {
                        let pixelMap = { color: [], key: '' }
                        pixelMap.color = data.slice(index, index + 4)
                        colorMap.push(pixelMap)
                    }

                    let components = []
                    console.log(width, height);
                    for (let y = 0; y < height; y++) {
                        for (let x = 0; x < width; x++) {
                            const dx = x;
                            const dy = y;
                            const indexFromXY = (_x, _y) => {
                                let index = _x + (_y * width);
                                return index;
                            };
                            const locations = this.matchingLocations(dx, dy, width, height)
                            const cIndex = indexFromXY(dx, dy);
                            const cColor = colorMap[cIndex].color;
                            const variation = locations.map(location => this.variation(cColor, colorMap[indexFromXY(location.x, location.y)].color))


                            let matchIndex;
                            let variationIndex = undefined;
                            if (variation.length > 0) {
                                let value = variation[0];
                                variationIndex = 0;
                                for (let k = 1; k < variation.length; k++) {
                                    const nextValue = variation[k];
                                    if (value < nextValue) {
                                        value = nextValue;
                                        variationIndex = k;
                                    }
                                }
                                matchIndex = locations[variationIndex]
                            }

                            if (matchIndex != undefined && variation[variationIndex] >= .9) {
                                let i = matchIndex;
                                let dIndex = indexFromXY(matchIndex.x, matchIndex.y);
                                let formFactor = colorMap[dIndex].key;
                                formFactor.append(new Location(dx, dy));
                                colorMap[cIndex].key = formFactor;
                            }
                            else {
                                const formFactor = new FormFactor(new Location(dx, dy), cColor);
                                colorMap[cIndex].key = formFactor;
                                components.push(formFactor);
                            }
                        }
                    }
                    resolve(components);
                }
                else {
                    reject(err);
                }
            })

        });
    }

}