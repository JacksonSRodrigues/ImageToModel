export class Location {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class FormFactor {

    constructor(location, color) {
        this.left = location.x;
        this.right = location.x;
        this.top = location.y;
        this.bottom = location.y;
        this.primaryColor = color;
        this.locations = [];
        this.colors = [];
        this.locations.push(location);
        this.colors.push(color);
    }

    percent() {
        return this.pixels / ((this.right - this.left) *(this.bottom - this.top));
    }

    get pixels() {
        return this.locations.length();
    }

    append(location, color) {
        if (location.x < this.left) (this.left = location.x);
        if (location.x > this.right) (this.right = location.x)
        if (location.y < this.top) (this.top = location.y);
        if (location.y > this.bottom) (this.bottom = location.y);
        this.locations.push(location);
        this.colors.push(color);
    }

    contains(formFactor) {
        return (this.left <= formFactor.left 
        && this.top <= formFactor.top 
        && this.right >= formFactor.right
        && this.bottom >= formFactor.bottom)
    }

}
