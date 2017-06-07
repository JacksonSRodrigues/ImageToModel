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
    }

    contains = (formFactor) => {
        return (this.left <= formFactor.left 
        && this.top <= formFactor.top 
        && this.right >= formFactor.right
        && this.bottom >= formFactor.bottom)
    }

}
