import { DirectionEnum } from "../constants/DirectionEnum";
import BoardCell from "./BoardCell";
import Coordinate from "./Coordinate";
import Plane from "./Plane";
import PlaneDrawer from "./PlaneDrawer";

describe('Plane', () => {

    it('should return its coordinates, direction:up', () => {
        
        let centerPosition = new Coordinate();
        centerPosition.x = 3;
        centerPosition.y = 2;

        let drawer = new Plane(DirectionEnum.UP, centerPosition);
         
        let planeCoordinates = drawer.getCoordinates();

        // head
        expect(planeCoordinates[0].x).toEqual(3);
        expect(planeCoordinates[0].y).toEqual(1);

        // wings
        expect(planeCoordinates[1].x).toEqual(1);
        expect(planeCoordinates[1].y).toEqual(2);
        expect(planeCoordinates[2].x).toEqual(2);
        expect(planeCoordinates[2].y).toEqual(2);
        expect(planeCoordinates[3].x).toEqual(3);
        expect(planeCoordinates[3].y).toEqual(2);
        expect(planeCoordinates[4].x).toEqual(4);
        expect(planeCoordinates[4].y).toEqual(2);
        expect(planeCoordinates[5].x).toEqual(5);
        expect(planeCoordinates[5].y).toEqual(2);

        // body
        expect(planeCoordinates[6].x).toEqual(3);
        expect(planeCoordinates[6].y).toEqual(3);

        //tail
        expect(planeCoordinates[7].x).toEqual(2);
        expect(planeCoordinates[7].y).toEqual(4);
        expect(planeCoordinates[8].x).toEqual(3);
        expect(planeCoordinates[8].y).toEqual(4);
        expect(planeCoordinates[9].x).toEqual(4);
        expect(planeCoordinates[9].y).toEqual(4);
    });

    
});