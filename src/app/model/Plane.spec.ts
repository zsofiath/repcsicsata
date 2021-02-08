import { DirectionEnum } from "../constants/DirectionEnum";
import Coordinate from "./Coordinate";
import Plane from "./Plane";
import PlaneDrawerDown from "./planeDrawer/PlaneDrawerDown";
import PlaneDrawerLeft from "./planeDrawer/PlaneDrawerLeft";
import PlaneDrawerRight from "./planeDrawer/PlaneDrawerRight";
import PlaneDrawerUp from "./planeDrawer/PlaneDrawerUp";

function coordinatesToArray(coordinates){
    let board = [
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' '],
        [' ',' ',' ',' ',' '],
    ];

    coordinates.forEach(element => {
        board[element.y][element.x] = 'x';
    });

    return JSON.stringify(board);
}

describe('Plane', () => {

    it('should return its coordinates, direction:up', () => {
        
        let centerPosition = new Coordinate();
        centerPosition.x = 2;
        centerPosition.y = 1;

        let drawer = new Plane(new PlaneDrawerUp(), centerPosition);
         
        let planeCoordinates = drawer.getCoordinates();


        expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
            [' ',' ','x',' ',' '],
            ['x','x','x','x','x'],
            [' ',' ','x',' ',' '],
            [' ','x','x','x',' '],
            [' ',' ',' ',' ',' '],
        ]));
    });

    it('should return its coordinates, direction:down', () => {
        
        let centerPosition = new Coordinate();
        centerPosition.x = 2;
        centerPosition.y = 2;

        let drawer = new Plane(new PlaneDrawerDown(), centerPosition);
         
        let planeCoordinates = drawer.getCoordinates();

        expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
            [' ','x','x','x',' '],
            [' ',' ','x',' ',' '],
            ['x','x','x','x','x'],
            [' ',' ','x',' ',' '],
            [' ',' ',' ',' ',' '],
        ]));
    });

    it('should return its coordinates, direction:right', () => {
        
        let centerPosition = new Coordinate();
        centerPosition.x = 2;
        centerPosition.y = 2;

        let drawer = new Plane(new PlaneDrawerRight(), centerPosition);
         
        let planeCoordinates = drawer.getCoordinates();

        expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
            [' ',' ','x',' ',' '],
            ['x',' ','x',' ',' '],
            ['x','x','x','x',' '],
            ['x',' ','x',' ',' '],
            [' ',' ','x',' ',' '],
        ]));
    });

    it('should return its coordinates, direction:left', () => {
        
        let centerPosition = new Coordinate();
        centerPosition.x = 1;
        centerPosition.y = 2;

        let drawer = new Plane(new PlaneDrawerLeft(), centerPosition);
         
        let planeCoordinates = drawer.getCoordinates();

        expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
            [' ','x',' ',' ',' '],
            [' ','x',' ','x',' '],
            ['x','x','x','x',' '],
            [' ','x',' ','x',' '],
            [' ','x',' ',' ',' '],
        ]));
    });
    
}); 

it('should return its coordinates, direction:up - out of board', () => {
        
    let centerPosition = new Coordinate();
    centerPosition.x = 0;
    centerPosition.y = 1;

    let drawer = new Plane(new PlaneDrawerUp(), centerPosition);
     
    let planeCoordinates = drawer.getCoordinates();

    console.log(coordinatesToArray(planeCoordinates));
    expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
        ['x',' ',' ',' ',' '],
        ['x','x','x',' ',' '],
        ['x',' ',' ',' ',' '],
        ['x','x',' ',' ',' '],
        [' ',' ',' ',' ',' '],
    ]));
});




