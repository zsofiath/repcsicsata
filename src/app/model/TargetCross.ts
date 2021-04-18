import Coordinate from "./Coordinate";
import ElementState from "./helper/ElementState";
import IGameBoardElement from "./IGameBoardElement";
import IGameBoardElementPart from "./IGameBoardElementPart";
import TargetCrossDrawer from "./planeDrawer/TargetCrossDrawer";
import TargetCrossPart from "./TargetCrossPart";

export default class TargetCross implements IGameBoardElement {
    position: any;
    drawer: TargetCrossDrawer;
    numberOfWholePlane: any;
    parts: IGameBoardElementPart;


    constructor(drawer, position) {
        this.drawer = drawer;
        this.position = position;
    }


    getCoordinates(): IGameBoardElementPart[] {
        let target = new TargetCrossPart();
        target.x = this.position.x;
        target.y = this.position.y;
        return [target];
    }

    deepCopy() {
        let position = new Coordinate();
        position.x = this.position.x;
        position.y = this.position.y;
    
        return new TargetCross(this.drawer, position);
    }

    isOverlappingOtherPlane(planes: IGameBoardElement[]): IGameBoardElement{
        let state = new ElementState(this);
        let i=0;
        while(i < planes.length && state.isNotOverlappingElement(planes[i])){      
          i++;
        }
    
        return i < planes.length ? planes[i] : null;
    }

}