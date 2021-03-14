import IGameBoardElement from "../IGameBoardElement";

export default class ElementState {
    currentElement;
    constructor(currentElement) {
        this.currentElement = currentElement
        
    }

    isNotOverlappingElement(otherPlane: IGameBoardElement){
          
        let current = this.currentElement.getCoordinates();
        let other = otherPlane.getCoordinates();

        

        let i = 0;
        let found = false;
        while(i < current.length && !found){
            let j = 0;
            while(j < other.length && !(current[i].x == other[j].x && current[i].y == other[j].y)){
                j++;
            }
            if(j < other.length) found = true;
            i++;
        }

        
        return !found;
      }
}