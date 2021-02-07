import Coordinate from "./Coordinate";
import IPlaneDrawer from "./planeDrawer/IPlaneDrawer";

export default class Plane {
    private _drawer: IPlaneDrawer;
    private _position: Coordinate;

    constructor(drawer: IPlaneDrawer, position: Coordinate) {
        this._drawer = drawer;
        this._position = position;
    }

    get drawer(){
        return this._drawer;
    }

    set drawer(value: IPlaneDrawer){
        this._drawer = value;
    }
    
    get position(){
        return this._position;
    }
    
    set position(value: Coordinate){
        this._position = value;
    }

    getCoordinates(): Coordinate[]{
        const planeCoordinates = [];

        planeCoordinates.push(...this.drawer.drawHead(this.position));
        planeCoordinates.push(...this.drawer.drawWings(this.position));
        planeCoordinates.push(...this.drawer.drawBody(this.position));
        planeCoordinates.push(...this.drawer.drawTail(this.position));

        return planeCoordinates;
    }

}