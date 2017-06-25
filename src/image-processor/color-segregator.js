import pixels from 'get-pixels';
import { FormFactor, Location, adjacentPixelLocations } from './common'
import { isMatchingColor, isGradientColor, isOvelappingColor } from './color-comparision'
import { JustNoticableDiff } from './common'

export class ColorSegregator {

    segregate(tImage) {
        return new Promise((resolve, reject) => {
            pixels(tImage, async (err, pixels) => {

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
                    console.log(width, height, width*height);
                    let totalPixels = width* height;
                    for (let y = 0; y < height; y++) {
                        for (let x = 0; x < width; x++) {
                            const displayLog = (x === 127);
                            const dx = x;
                            const dy = y;
                            const indexFromXY = (_x, _y) => {
                                let index = _x + (_y * width);
                                return index;
                            };

                            const adjacentLocations = adjacentPixelLocations(dx, dy, width, height)
                            const cIndex = indexFromXY(dx, dy);
                            const cColor = colorMap[cIndex].color;

                            if(cIndex % 1000 === 0) {
                                console.log( (cIndex/totalPixels)*100+'%');
                            }

                            let variation = [];
                            let adjIndex = 0
                            while (adjIndex < adjacentLocations.length) {
                                const location = adjacentLocations[adjIndex];
                                const adjColor = colorMap[indexFromXY(location.x, location.y)].color;
                                const match = await isMatchingColor(cColor, adjColor, JustNoticableDiff);
                                variation.push(match);
                                if(match == 1) { // if max match is found then exit
                                    break;
                                }

                                adjIndex ++;
                            }

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
                                matchIndex = adjacentLocations[variationIndex]
                            }

                            if (matchIndex != undefined && variation[variationIndex] >= .9) {
                                let i = matchIndex;
                                let dIndex = indexFromXY(matchIndex.x, matchIndex.y);
                                let formFactor = colorMap[dIndex].key;
                                formFactor.append(new Location(dx, dy), cColor);
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