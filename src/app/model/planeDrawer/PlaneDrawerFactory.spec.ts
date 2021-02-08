import { DirectionEnum } from "src/app/constants/DirectionEnum";
import PlaneDrawerDown from "./PlaneDrawerDown";
import PlaneDrawerFactory from "./PlaneDrawerFactory";
import PlaneDrawerLeft from "./PlaneDrawerLeft";
import PlaneDrawerRight from "./PlaneDrawerRight";
import PlaneDrawerUp from "./PlaneDrawerUp";

describe('PlaneDrawerFactory', () => {
    it('should return PlaneDrawerUp when DirectionEnum.Up is given az property property is set', () => {
        let factory = new PlaneDrawerFactory(DirectionEnum.UP);

        expect(factory.get() instanceof PlaneDrawerUp).toBeTruthy();
    });

    it('should return PlaneDrawerDown when DirectionEnum.DOWN is given az property property is set', () => {
        let factory = new PlaneDrawerFactory(DirectionEnum.DOWN);

        expect(factory.get() instanceof PlaneDrawerDown).toBeTruthy();
    });

    it('should return PlaneDrawerRight when DirectionEnum.Right is given az property property is set', () => {
        let factory = new PlaneDrawerFactory(DirectionEnum.RIGHT);

        expect(factory.get() instanceof PlaneDrawerRight).toBeTruthy();
    });

    it('should return PlaneDrawerLeft when DirectionEnum.Left is given az property property is set', () => {
        let factory = new PlaneDrawerFactory(DirectionEnum.LEFT);

        expect(factory.get() instanceof PlaneDrawerLeft).toBeTruthy();
    });
})
