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
    describe('facing top', () => {
        it('should return its coordinates', () => {
        
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

        it('should return its coordinates, out of board left', () => {
        
            let centerPosition = new Coordinate();
            centerPosition.x = 0;
            centerPosition.y = 1;
        
            let drawer = new Plane(new PlaneDrawerUp(), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
        
            expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
                ['x',' ',' ',' ',' '],
                ['x','x','x',' ',' '],
                ['x',' ',' ',' ',' '],
                ['x','x',' ',' ',' '],
                [' ',' ',' ',' ',' '],
            ]));
        });
        
        
        it('should return its coordinates, out of board top and left', () => {
                
            let centerPosition = new Coordinate();
            centerPosition.x = 0;
            centerPosition.y = 0;
        
            let drawer = new Plane(new PlaneDrawerUp(5), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
        
            expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
                ['x','x','x',' ',' '],
                ['x',' ',' ',' ',' '],
                ['x','x',' ',' ',' '],
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
            ]));
        });
        
        it('should return its coordinates, out of board top and left', () => {
                
            let centerPosition = new Coordinate();
            centerPosition.x = 1;
            centerPosition.y = 0;
        
            let drawer = new Plane(new PlaneDrawerUp(5), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
        
            expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
                ['x','x','x','x',' '],
                [' ','x',' ',' ',' '],
                ['x','x','x',' ',' '],
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
            ]));
        });
        
        it('should return its coordinates, out of board bottom and right', () => {
                
            let centerPosition = new Coordinate();
            centerPosition.x = 4;
            centerPosition.y = 4;
        
            let drawer = new Plane(new PlaneDrawerUp(5), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
        
            expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ','x'],
                [' ',' ','x','x','x'],
            ]));
        });
    });

    describe('facing down', () => {
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
    
        it('should return its coordinates, direction:down overflows lefttop', () => {
            
            let centerPosition = new Coordinate();
            centerPosition.x = 0;
            centerPosition.y = 0;
    
            let drawer = new Plane(new PlaneDrawerDown(), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
    
            expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
                ['x','x','x',' ',' '],
                ['x',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
            ]));
        });
    
        it('should return its coordinates, direction:down overflows rightbottom', () => {
            
            let centerPosition = new Coordinate();
            centerPosition.x = 4;
            centerPosition.y = 4;
    
            let drawer = new Plane(new PlaneDrawerDown(5), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
    
            expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
                [' ',' ',' ','x','x'],
                [' ',' ',' ',' ','x'],
                [' ',' ','x','x','x'],
            ]));
        });
    });

    describe('facing right', () => {
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
    
        it('should return its coordinates, direction:right left top corner', () => {
            
            let centerPosition = new Coordinate();
            centerPosition.x = 0;
            centerPosition.y = 0;
    
            let drawer = new Plane(new PlaneDrawerRight(5), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
    
            expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
                ['x','x',' ',' ',' '],
                ['x',' ',' ',' ',' '],
                ['x',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
            ]));
        });
    
        it('should return its coordinates, direction:right left top corner 1:1', () => {
            
            let centerPosition = new Coordinate();
            centerPosition.x = 1;
            centerPosition.y = 1;
    
            let drawer = new Plane(new PlaneDrawerRight(5), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
    
            expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
                [' ','x',' ',' ',' '],
                ['x','x','x',' ',' '],
                [' ','x',' ',' ',' '],
                [' ','x',' ',' ',' '],
                [' ',' ',' ',' ',' '],
            ]));
        });
    
        it('should return its coordinates, direction:right right bottom corner', () => {
            
            let centerPosition = new Coordinate();
            centerPosition.x = 4;
            centerPosition.y = 4;
    
            let drawer = new Plane(new PlaneDrawerRight(5), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
            
            expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ','x'],
                [' ',' ','x',' ','x'],
                [' ',' ','x','x','x'],
            ]));
        });
    });

    describe('facing left', () => {
        it('should return its coordinates', () => {
        
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

        it('should return its coordinates, left top corner', () => {
        
            let centerPosition = new Coordinate();
            centerPosition.x = 0;
            centerPosition.y = 0;
    
            let drawer = new Plane(new PlaneDrawerLeft(5), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
    
            expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
                ['x','x','x',' ',' '],
                ['x',' ','x',' ',' '],
                ['x',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
            ]));
        });

        it('should return its coordinates, right bottom corner', () => {
        
            let centerPosition = new Coordinate();
            centerPosition.x = 4;
            centerPosition.y = 4;
    
            let drawer = new Plane(new PlaneDrawerLeft(5), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
    
            expect(coordinatesToArray(planeCoordinates)).toEqual(JSON.stringify([
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ',' '],
                [' ',' ',' ',' ','x'],
                [' ',' ',' ',' ','x'],
                [' ',' ',' ','x','x'],
            ]));
        });
    });
});

