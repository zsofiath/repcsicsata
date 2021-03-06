import Coordinate from "src/app/model/Coordinate";
import Plane from "src/app/model/Plane";
import FakePlaneDrawer from "src/app/model/planeDrawer/FakePlaneDrawer";

export default class FakePlane extends Plane {
  
    constructor() {
      super(new FakePlaneDrawer(), {x:0, y:0});
      this.numberOfWholePlane = 1;   
    }
  
    deepCopy(){
      let position = new Coordinate();
      position.x = this.position.x;
      position.y = this.position.y;
      let newobj = new FakePlane();
      newobj.position = position;
      newobj.drawer = this.drawer;
  
      return newobj;
  }
  }