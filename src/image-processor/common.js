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
        this.map = {}
        this.mapNodes(location,color);        
    }

    percent() {
        return this.pixels / ((this.right - this.left) *(this.bottom - this.top));
    }

    get pixels() {
        return this.locations.length;
    }

    append(location, color) {
        if (location.x < this.left) (this.left = location.x);
        if (location.x > this.right) (this.right = location.x)
        if (location.y < this.top) (this.top = location.y);
        if (location.y > this.bottom) (this.bottom = location.y);
        this.mapNodes(location,color);
    }

    mapNodes(location,color) {
        this.locations.push(location);
        this.colors.push(color);
        this.map[this.locationKey(location)] = (this.colors.length-1)
    }

    contains(formFactor) {
        return (this.left <= formFactor.left 
        && this.top <= formFactor.top 
        && this.right >= formFactor.right
        && this.bottom >= formFactor.bottom)
    }

    locationKey(location) {
        return ('x'+location.x,' y',+location.y)
    }

    colorForLocation(location) {
        let index = this.map[this.locationKey(location)];
        let color = undefined;
        if (index && (index < this.colors.length)) {
            color = this.colors[index]
        }
        return color;
    }

}
