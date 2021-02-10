import Coordinate from "./Coordinate";
import IPlaneDrawer from "./planeDrawer/IPlaneDrawer";
import PlaneDrawerFactory from "./planeDrawer/PlaneDrawerFactory";

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

    deepCopy(){
        let position = new Coordinate();
        position.x = this.position.x;
        position.y = this.position.y;
    
        return new Plane(this.drawer, position);
    }

    isOverlappingOtherPlane(planes: Plane[]): Plane{
        let i=0;
        while(i < planes.length && this.isNotOverlappingIthPlane(planes[i])){      
          i++;
        }
    
        return i < planes.length ? planes[i] : null;
      }
    
      private isNotOverlappingIthPlane(otherPlane: Plane){    
        return !(otherPlane.position.x == this.position.x && 
          otherPlane.position.y == this.position.y)
      }

}