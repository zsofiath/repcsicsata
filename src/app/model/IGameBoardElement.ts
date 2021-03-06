import IGameBoardElementPart from "./IGameBoardElementPart";
import IPlaneDrawer from "./planeDrawer/IPlaneDrawer";
import PlanePart from "./PlanePart";

export default interface IGameBoardElement {
    position;
    drawer: IPlaneDrawer;
    numberOfWholePlane;
    isOverlappingOtherPlane(planes: IGameBoardElement[]): IGameBoardElement;
    getCoordinates(): IGameBoardElementPart[];
    deepCopy()
}