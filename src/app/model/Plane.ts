import OutOfBoardError from "../exceptions/OutOfBoardError";
import Coordinate from "./Coordinate";
import IGameBoardElement from "./IGameBoardElement";
import IPlaneDrawer from "./planeDrawer/IPlaneDrawer";
import PlaneDrawerFactory from "./planeDrawer/PlaneDrawerFactory";
import PlanePart from "./PlanePart";

export default class Plane implements IGameBoardElement {
    private _drawer: IPlaneDrawer;
    private _position: Coordinate;

    numberOfWholePlane = 10;

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

    getCoordinates(): PlanePart[]{
        const planeCoordinates = [];

        planeCoordinates.push(...this.drawer.drawHead(this.position));
        planeCoordinates.push(...this.drawer.drawWings(this.position));
        planeCoordinates.push(...this.drawer.drawBody(this.position));
        planeCoordinates.push(...this.drawer.drawTail(this.position));

        if(planeCoordinates.length < this.numberOfWholePlane) throw new OutOfBoardError(planeCoordinates);

        return planeCoordinates;
    }

    deepCopy(){
        let position = new Coordinate();
        position.x = this.position.x;
        position.y = this.position.y;
    
        return new Plane(this.drawer, position);
    }

    isOverlappingOtherPlane(planes: IGameBoardElement[]): IGameBoardElement{
        let i=0;
        while(i < planes.length && this.isNotOverlappingIthPlane(planes[i])){      
          i++;
        }
    
        return i < planes.length ? planes[i] : null;
      }
    
      private isNotOverlappingIthPlane(otherPlane: IGameBoardElement){
          
        let current = this.getCoordinates();
        let other = (otherPlane as Plane).getCoordinates();

        

        let i = 0;
        let found = false;
        while(i < current.length && !found){
            let j = 0;
            while(j < other.length && !(current[i].x == other[j].x && current[i].y == other[j].y)){
                j++;
            }
            if(j < other.length) found = true;
            i++;
        }

        
        return !found;
      }

}