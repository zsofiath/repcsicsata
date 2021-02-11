import { DirectionEnum } from "../constants/DirectionEnum";
import { PlanePartsEnum } from "../constants/PlanePartsEnum";
import OutOfBoardError from "../exceptions/OutOfBoardError";
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

function expectElementsAreKnowingTheirRole(planeCoordinates){
    expect(planeCoordinates[0].part).toEqual(PlanePartsEnum.HEAD);

    expect(planeCoordinates[1].part).toEqual(PlanePartsEnum.WING1);
    expect(planeCoordinates[2].part).toEqual(PlanePartsEnum.WING2);
    expect(planeCoordinates[3].part).toEqual(PlanePartsEnum.WING3);
    expect(planeCoordinates[4].part).toEqual(PlanePartsEnum.WING4);
    expect(planeCoordinates[5].part).toEqual(PlanePartsEnum.WING5);

    expect(planeCoordinates[6].part).toEqual(PlanePartsEnum.BODY);

    expect(planeCoordinates[7].part).toEqual(PlanePartsEnum.TAIL1);
    expect(planeCoordinates[8].part).toEqual(PlanePartsEnum.TAIL2);
    expect(planeCoordinates[9].part).toEqual(PlanePartsEnum.TAIL3);
}

describe('Plane', () => {
    describe('plane parts', () => {
        it('should return parts that knows their role - up', () => {
            let centerPosition = new Coordinate();
            centerPosition.x = 2;
            centerPosition.y = 1;
    
            let drawer = new Plane(new PlaneDrawerUp(), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
            expectElementsAreKnowingTheirRole(planeCoordinates)
            
        });

        it('should return parts that knows their role - down', () => {
            let centerPosition = new Coordinate();
            centerPosition.x = 2;
            centerPosition.y = 3;
    
            let drawer = new Plane(new PlaneDrawerDown(), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
            
            expectElementsAreKnowingTheirRole(planeCoordinates);
        });

        it('should return parts that knows their role - right', () => {
            let centerPosition = new Coordinate();
            centerPosition.x = 2;
            centerPosition.y = 3;
    
            let drawer = new Plane(new PlaneDrawerRight(), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
            
            expectElementsAreKnowingTheirRole(planeCoordinates);
        });

        it('should return parts that knows their role - left', () => {
            let centerPosition = new Coordinate();
            centerPosition.x = 2;
            centerPosition.y = 3;
    
            let drawer = new Plane(new PlaneDrawerLeft(), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
            
            expectElementsAreKnowingTheirRole(planeCoordinates);
        });
        

        it('should return parts that knows their direction - up', () => {
            let centerPosition = new Coordinate();
            centerPosition.x = 2;
            centerPosition.y = 1;
    
            let drawer = new Plane(new PlaneDrawerUp(), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
            
            planeCoordinates.forEach(element => {
                expect(element.direction).toEqual(DirectionEnum.UP);
            });
        });

        it('should return parts that knows their direction - down', () => {
            let centerPosition = new Coordinate();
            centerPosition.x = 2;
            centerPosition.y = 3;
    
            let drawer = new Plane(new PlaneDrawerDown(), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
            
            planeCoordinates.forEach(element => {
                expect(element.direction).toEqual(DirectionEnum.DOWN);
            });
        });

        it('should return parts that knows their direction - left', () => {
            let centerPosition = new Coordinate();
            centerPosition.x = 2;
            centerPosition.y = 3;
    
            let drawer = new Plane(new PlaneDrawerLeft(), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
            
            planeCoordinates.forEach(element => {
                expect(element.direction).toEqual(DirectionEnum.LEFT);
            });
        });

        it('should return parts that knows their direction - right', () => {
            let centerPosition = new Coordinate();
            centerPosition.x = 2;
            centerPosition.y = 3;
    
            let drawer = new Plane(new PlaneDrawerRight(), centerPosition);
             
            let planeCoordinates = drawer.getCoordinates();
            
            planeCoordinates.forEach(element => {
                expect(element.direction).toEqual(DirectionEnum.RIGHT);
            });
        });
    })
    
    

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

        it('should throw error when not the whole plane is drawed, floating out at left', () => {
        
            let centerPosition = new Coordinate();
            centerPosition.x = 0;
            centerPosition.y = 1;
        
            let drawer = new Plane(new PlaneDrawerUp(), centerPosition);
             
            try {
                let planeCoordinates = drawer.getCoordinates();
                fail('Not throwing error.');
            } catch (error) {
                expect(error instanceof OutOfBoardError).toBeTruthy();
                expect(coordinatesToArray(error.coordinates)).toEqual(JSON.stringify([
                    ['x',' ',' ',' ',' '],
                    ['x','x','x',' ',' '],
                    ['x',' ',' ',' ',' '],
                    ['x','x',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                ]));
            }       
        });
        
        
        it('should return its coordinates, out of board top and left', () => {
                
            let centerPosition = new Coordinate();
            centerPosition.x = 0;
            centerPosition.y = 0;
        
            let drawer = new Plane(new PlaneDrawerUp(5), centerPosition);
             
            try {
                let planeCoordinates = drawer.getCoordinates();
                fail('Not throwing error.');
            } catch (error) {
                expect(error instanceof OutOfBoardError).toBeTruthy();
                expect(coordinatesToArray(error.coordinates)).toEqual(JSON.stringify([
                    ['x','x','x',' ',' '],
                    ['x',' ',' ',' ',' '],
                    ['x','x',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                ]));
            } 
        });
        
        it('should return its coordinates, out of board top and left', () => {
                
            let centerPosition = new Coordinate();
            centerPosition.x = 1;
            centerPosition.y = 0;
        
            let drawer = new Plane(new PlaneDrawerUp(5), centerPosition);
             
            try {
                let planeCoordinates = drawer.getCoordinates();
                fail('Not throwing error.');
            } catch (error) {
                expect(error instanceof OutOfBoardError).toBeTruthy();
                expect(coordinatesToArray(error.coordinates)).toEqual(JSON.stringify([
                    ['x','x','x','x',' '],
                    [' ','x',' ',' ',' '],
                    ['x','x','x',' ',' '],
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                ]));
            }
        });
        
        it('should return its coordinates, out of board bottom and right', () => {
                
            let centerPosition = new Coordinate();
            centerPosition.x = 4;
            centerPosition.y = 4;
        
            let drawer = new Plane(new PlaneDrawerUp(5), centerPosition);
             
            try {
                let planeCoordinates = drawer.getCoordinates();
                fail('Not throwing error.');
            } catch (error) {
                expect(error instanceof OutOfBoardError).toBeTruthy();
                expect(coordinatesToArray(error.coordinates)).toEqual(JSON.stringify([
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ','x'],
                    [' ',' ','x','x','x'],
                ]));
            }
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
             
            try {
                let planeCoordinates = drawer.getCoordinates();
                fail('Not throwing error.');
            } catch (error) {
                expect(error instanceof OutOfBoardError).toBeTruthy();
                expect(coordinatesToArray(error.coordinates)).toEqual(JSON.stringify([
                    ['x','x','x',' ',' '],
                    ['x',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                ]));
            }
        });
    
        it('should return its coordinates, direction:down overflows rightbottom', () => {
            
            let centerPosition = new Coordinate();
            centerPosition.x = 4;
            centerPosition.y = 4;
    
            let drawer = new Plane(new PlaneDrawerDown(5), centerPosition);
             
            try {
                let planeCoordinates = drawer.getCoordinates();
                fail('Not throwing error.');
            } catch (error) {
                expect(error instanceof OutOfBoardError).toBeTruthy();
                expect(coordinatesToArray(error.coordinates)).toEqual(JSON.stringify([
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ','x','x'],
                    [' ',' ',' ',' ','x'],
                    [' ',' ','x','x','x'],
                ]));
            }
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
             
            try {
                let planeCoordinates = drawer.getCoordinates();
                fail('Not throwing error.');
            } catch (error) {
                expect(error instanceof OutOfBoardError).toBeTruthy();
                expect(coordinatesToArray(error.coordinates)).toEqual(JSON.stringify([
                    ['x','x',' ',' ',' '],
                    ['x',' ',' ',' ',' '],
                    ['x',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                ]));
            }
        });
    
        it('should return its coordinates, direction:right left top corner 1:1', () => {
            
            let centerPosition = new Coordinate();
            centerPosition.x = 1;
            centerPosition.y = 1;
    
            let drawer = new Plane(new PlaneDrawerRight(5), centerPosition);
             
            try {
                let planeCoordinates = drawer.getCoordinates();
                fail('Not throwing error.');
            } catch (error) {
                expect(error instanceof OutOfBoardError).toBeTruthy();
                expect(coordinatesToArray(error.coordinates)).toEqual(JSON.stringify([
                    [' ','x',' ',' ',' '],
                    ['x','x','x',' ',' '],
                    [' ','x',' ',' ',' '],
                    [' ','x',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                ]));
            }
        });
    
        it('should return its coordinates, direction:right right bottom corner', () => {
            
            let centerPosition = new Coordinate();
            centerPosition.x = 4;
            centerPosition.y = 4;
    
            let drawer = new Plane(new PlaneDrawerRight(5), centerPosition);
             
            try {
                let planeCoordinates = drawer.getCoordinates();
                fail('Not throwing error.');
            } catch (error) {
                expect(error instanceof OutOfBoardError).toBeTruthy();
                expect(coordinatesToArray(error.coordinates)).toEqual(JSON.stringify([
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ','x'],
                    [' ',' ','x',' ','x'],
                    [' ',' ','x','x','x'],
                ]));
            }
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
             
            try {
                let planeCoordinates = drawer.getCoordinates();
                fail('Not throwing error.');
            } catch (error) {
                expect(error instanceof OutOfBoardError).toBeTruthy();
                expect(coordinatesToArray(error.coordinates)).toEqual(JSON.stringify([
                    ['x','x','x',' ',' '],
                    ['x',' ','x',' ',' '],
                    ['x',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                ]));
            }
        });

        it('should return its coordinates, right bottom corner', () => {
        
            let centerPosition = new Coordinate();
            centerPosition.x = 4;
            centerPosition.y = 4;
    
            let drawer = new Plane(new PlaneDrawerLeft(5), centerPosition);
             
            try {
                let planeCoordinates = drawer.getCoordinates();
                fail('Not throwing error.');
            } catch (error) {
                expect(error instanceof OutOfBoardError).toBeTruthy();
                expect(coordinatesToArray(error.coordinates)).toEqual(JSON.stringify([
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ',' '],
                    [' ',' ',' ',' ','x'],
                    [' ',' ',' ',' ','x'],
                    [' ',' ',' ','x','x'],
                ]));
            }
        });
    });
});

