import Direction from "./ElevatorDirection.js";

class Elevator {
    constructor(id, floorCount) {
        this.id = id;
        this.floorCount = floorCount;
        this.currentFloor = 0;
        this.direction = Direction.IDLE;
        this.targetFloors = [];
        this.pickupFloors = [];
    }

    addPickupFloor(floor) {
        if (floor < 0 || floor > this.floorCount)
            return;

        if (this.pickupFloors.includes(floor))
            return;

        this.pickupFloors.push(floor);
        this.pickupFloors.sort((a, b) => a - b);
    }

    removePickupFloor(floor) {
        const index = this.pickupFloors.indexOf(floor);
        if (index >= 0)
            this.pickupFloors.splice(index, 1);
    }

    addTargetFloor(floor) {
        if (floor < 0 || floor > this.floorCount)
            return;

        if (this.targetFloors.includes(floor))
            return;

        this.targetFloors.push(floor);
        this.targetFloors.sort((a, b) => a - b);
    }

    removeTargetFloor(floor) {
        const index = this.targetFloors.indexOf(floor);
        if (index >= 0)
            this.targetFloors.splice(index, 1);
    }

    targetFloorsAbove(floor){
        return this.targetFloors.filter(f => f > floor);
    }

    targetFloorsBelow(floor){
        return this.targetFloors.filter(f => f < floor);
    }

    update() {
        if (this.targetFloors.length === 0) {
            this.direction = Direction.IDLE;
        }

        if (this.targetFloors.includes(this.currentFloor) || this.pickupFloors.includes(this.currentFloor)) {
            this.removeTargetFloor(this.currentFloor);
            this.removePickupFloor(this.currentFloor);
            return;
        }

        if (this.direction === Direction.UP){
            if (this.targetFloorsAbove(this.currentFloor).length !== 0) {
                this.currentFloor += 1;
                return
            }
            this.direction = Direction.DOWN;
        }

        if (this.direction === Direction.DOWN) {
            if (targetFloorsBelow(this.currentFloor).length !== 0) {
                this.currentFloor -= 1;
                return
            }
            this.direction = Direction.UP;
        }
    }

    
}

export default Elevator;