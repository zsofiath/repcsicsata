import { DirectionEnum } from "src/app/constants/DirectionEnum";
import IPlaneDrawer from "./IPlaneDrawer";
import PlaneDrawerDown from "./PlaneDrawerDown";
import PlaneDrawerLeft from "./PlaneDrawerLeft";
import PlaneDrawerRight from "./PlaneDrawerRight";
import PlaneDrawerUp from "./PlaneDrawerUp";

export default class PlaneDrawerFactory {
    drawer: IPlaneDrawer;
    constructor(direction: DirectionEnum) {
        
        switch (direction) {
            case DirectionEnum.UP:
                this.drawer = new PlaneDrawerUp();
                break;
            case DirectionEnum.DOWN:
                this.drawer = new PlaneDrawerDown();
                break;
            case DirectionEnum.RIGHT:
                this.drawer = new PlaneDrawerRight();
                break;
            case DirectionEnum.LEFT:
                this.drawer = new PlaneDrawerLeft();
                break;
        }
    }

    get(): IPlaneDrawer{
        return this.drawer;
    }
}