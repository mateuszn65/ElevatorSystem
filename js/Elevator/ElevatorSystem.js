import Elevator  from "./Elevator";
import Direction from "./ElevatorDirection.js";

class ElevatorSystem {
    constructor(numElevators, floorCount) {
        this.floorCount = floorCount;
        this.elevators = [];

        for (let i = 0; i < numElevators; i++) {
            this.#addElevator(new Elevator(i, floorCount));
        }
    }

    #addElevator(elevator) {
        this.elevators.push(elevator);
    }

    #findBestElevator(floor, direction) {
        let bestElevator = null;
        let bestScore = 0;

        this.elevators.forEach(e => {
            const score = this.getElevatorScore(e, floor, direction);
            if (score > bestScore) {
                bestElevator = e;
                bestScore = score;
            }
        });

        return bestElevator;
    }

    pickup(floor, direction) {
        if (floor < 0 || floor > this.floorCount)
            return;
        
        if ([Direction.UP, Direction.DOWN].includes(direction) === false)
            return;
        
        let chosenElevator = null;

        for (const e of this.elevators) {
            if (e.direction === direction) {
                if (direction === Direction.UP && floor <= Math.max(e.targetFloorsAbove(e.currentFloor))) {
                    e.addPickupFloor(floor);
                    chosenElevator = e;
                    return;
                }
                if (direction === Direction.DOWN && floor >= Math.min(e.targetFloorsBelow(e.currentFloor))) {
                    e.addPickupFloor(floor);
                    chosenElevator = e;
                    return;
                }
            }
        }

        if (chosenElevator === null) {
            chosenElevator = this.#findBestElevator(floor, direction);
            chosenElevator.addPickupFloor(floor);
        }
    }

    addTargetFloor(elevatorId, floor) {
        const elevator = this.elevators[elevatorId]
        elevator.addTargetFloor(floor);
    }

    step(){
        this.elevators.forEach(e => e.update());
    }

    status(){
        const status = this.elevators.map(e => {
            return {
                id: e.id,
                currentFloor: e.currentFloor,
                direction: e.direction,
                targetFloors: e.targetFloors
            }
        });

        return status;
    }


}