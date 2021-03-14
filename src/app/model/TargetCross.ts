import ElementState from "./helper/ElementState";
import IGameBoardElement from "./IGameBoardElement";
import IGameBoardElementPart from "./IGameBoardElementPart";
import IPlaneDrawer from "./planeDrawer/IPlaneDrawer";
import TargetCrossDrawer from "./planeDrawer/TargetCrossDrawer";

export default class TargetCross implements IGameBoardElement {
    position: any;
    drawer: TargetCrossDrawer;
    numberOfWholePlane: any;

    constructor(drawer, position) {
        this.drawer = drawer;
        this.position = position;
    }


    getCoordinates(): IGameBoardElementPart[] {
        const planeCoordinates = [];

        planeCoordinates.push(...this.drawer.drawHead(this.position));
        planeCoordinates.push(...this.drawer.drawWings(this.position));
        planeCoordinates.push(...this.drawer.drawBody(this.position));
        planeCoordinates.push(...this.drawer.drawTail(this.position));

        return planeCoordinates;
    }

    deepCopy() {
        throw new Error("Method not implemented.");
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