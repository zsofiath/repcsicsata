import { DirectionEnum } from "../constants/DirectionEnum";
import Coordinate from "./Coordinate";

export default class Plane {
    private _direction: DirectionEnum;
    private _position: Coordinate;

    constructor(direction: DirectionEnum, position: Coordinate) {
        this._direction = direction;
        this._position = position;
    }

    get direction(){
        return this._direction;
    }

    set direction(value: DirectionEnum){
        this._direction = value;
    }
    
    get position(){
        return this._position;
    }
    
    set position(value: Coordinate){
        this._position = value;
    }

    getCoordinates(): Coordinate[]{
        const planeCoordinates = [];

        this.drawHead(this.position, planeCoordinates);
        this.drawWings(this.position, planeCoordinates);
        this.drawBody(this.position, planeCoordinates);
        this.drawTail(this.position, planeCoordinates);

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