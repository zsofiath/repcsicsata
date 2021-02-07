import { DirectionEnum } from "src/app/constants/DirectionEnum";
import IPlaneDrawer from "./IPlaneDrawer";
import PlaneDrawerUp from "./PlaneDrawerUp";

export default class PlaneDrawerFactory {
    drawer: IPlaneDrawer;
    constructor(direction: DirectionEnum) {
        
        switch (direction) {
            case DirectionEnum.UP:
                this.drawer = new PlaneDrawerUp();
                break;
            case DirectionEnum.DOWN:
                
                break;
            case DirectionEnum.RIGHT:
                
                break;
            case DirectionEnum.LEFT:
                
                break;
        }
    }

    get(): IPlaneDrawer{
        return this.drawer;
    }
}