import Coordinate from "../Coordinate";

export default interface IPlaneDrawer {
    drawHead(planeCenter: Coordinate): Coordinate[]
    drawWings(planeCenter: Coordinate): Coordinate[]
    drawBody(planeCenter: Coordinate): Coordinate[]
    drawTail(planeCenter: Coordinate): Coordinate[]
}