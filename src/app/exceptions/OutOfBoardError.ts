import Coordinate from "../model/Coordinate";

export default class OutOfBoardError extends Error {
    coordinates: Coordinate[];

    constructor(coordinates: Coordinate[]) {
        super('Out of board');
        this.coordinates = coordinates;
    }
}