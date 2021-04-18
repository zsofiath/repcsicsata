import OutOfBoardError from "../exceptions/OutOfBoardError";
import Coordinate from "./Coordinate";
import ElementState from "./helper/ElementState";
import IGameBoardElement from "./IGameBoardElement";
import IGameBoardElementPart from "./IGameBoardElementPart";
import IPlaneDrawer from "./planeDrawer/IPlaneDrawer";
import PlanePart from "./PlanePart";

export default class Plane implements IGameBoardElement {
    private _drawer: IPlaneDrawer;
    private _position: Coordinate;
    parts: IGameBoardElementPart[];
    numberOfWholePlane;

    constructor(drawer: IPlaneDrawer, position: Coordinate) {
        this._drawer = drawer;
        this._position = position;
        this.parts = this.getPlaneParts();
        this.numberOfWholePlane = 10;
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
        const planeCoordinates = this.getPlaneParts();
        return planeCoordinates;
    }

    private getPlaneParts() {
        const planeCoordinates = [];

        planeCoordinates.push(...this.drawer.drawHead(this.position));
        planeCoordinates.push(...this.drawer.drawWings(this.position));
        planeCoordinates.push(...this.drawer.drawBody(this.position));
        planeCoordinates.push(...this.drawer.drawTail(this.position));
        
        if (planeCoordinates.length < this.numberOfWholePlane)
            throw new OutOfBoardError(planeCoordinates);
        return planeCoordinates;
    }

    deepCopy(){
        let position = new Coordinate();
        position.x = this.position.x;
        position.y = this.position.y;
    
        return new Plane(this.drawer, position);
    }

    isOverlappingOtherPlane(planes: IGameBoardElement[]): IGameBoardElement{      
        let state = new ElementState(this);
        let i=0;
        while(i < planes.length && state.isNotOverlappingElement(planes[i])){      
          i++;
        }
    
        return i < planes.length ? planes[i] : null;
    }

    setHeadDamaged() {
        this.parts[0].isDamaged = true;
    }

}