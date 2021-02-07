import BoardCell from "./BoardCell";
import Coordinate from "./Coordinate";

export default class PlaneDrawer {
    cells: BoardCell[][];
    constructor(c: BoardCell[][]){
        this.cells = c;
    }

    drawToUp(planeCenter: Coordinate): Coordinate[]{
        const planeCoordinates = [];

        this.drawHead(planeCenter, planeCoordinates);
        this.drawWings(planeCenter, planeCoordinates);
        this.drawBody(planeCenter, planeCoordinates);
        this.drawTail(planeCenter, planeCoordinates);

        return planeCoordinates;
    }

    private drawHead(planeCenter, planeCoordinates){
        let c = new Coordinate();
        c.x = planeCenter.x;
        c.y = planeCenter.y-1;
        planeCoordinates.push(c)
    }

    private drawWings(planeCenter, planeCoordinates){
        for (let i = 0; i < 5; i++) {
            let c = new Coordinate();
            c.x = planeCenter.x+i-2;
            c.y = planeCenter.y;
            planeCoordinates.push(c)  
        }
    }

    private drawBody(planeCenter, planeCoordinates){
        let b = new Coordinate();
        b.x = planeCenter.x;
        b.y = planeCenter.y+1;
        planeCoordinates.push(b);
    }

    private drawTail(planeCenter, planeCoordinates){
        for (let i = 0; i < 3; i++) {
            let c = new Coordinate();
            c.x = planeCenter.x+i-1;
            c.y = planeCenter.y+2;
            planeCoordinates.push(c)  
        }
    }

}