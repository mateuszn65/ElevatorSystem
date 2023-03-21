import Elevator  from "./Elevator.js";
import Direction from "./ElevatorDirection.js";

class ElevatorSystem {
    constructor(numElevators, floorCount, delay = 1000) {
        this.floorCount = floorCount;
        this.elevators = [];
        this.pickupRequests = [];
        for (let i = 0; i < numElevators; i++) {
            this.#addElevator(new Elevator(i, floorCount, delay));
        }
    }

    #addElevator(elevator) {
        this.elevators.push(elevator);
    }

    #checkForComingElevator(floor, direction) {
        let bestElevator = null;
        let minDistance = this.floorCount;
        for (const e of this.elevators) {
            if (e.direction === direction) {
                const distance = Math.abs(e.currentFloor - floor);
                if (e.isGoingPassFloor(floor)){
                    if (distance < minDistance) {
                        bestElevator = e;
                        minDistance = distance;
                    }
                }
            }
        }
        return bestElevator;
    }

    #getClosestFreeElevator(floor) {
        let bestElevator = null;
        let minDistance = this.floorCount;
        for (const e of this.elevators) {
            if (e.direction === Direction.IDLE) {
                const distance = e.distanceToFloor(floor);
                if (distance < minDistance) {
                    bestElevator = e;
                    minDistance = distance;
                }
            }
        }
        return bestElevator;
    }
    
    pickup(floor, direction) {
        
        if (floor < 0 || floor > this.floorCount)
            return;
        
        if ([Direction.UP, Direction.DOWN].includes(direction) === false)
            return;
        
        let pickupRequest = this.pickupRequests.find(p => p.floor === floor && p.direction === direction);

        if (pickupRequest !== undefined && pickupRequest.elevatorId !== null)
            return;

        if (pickupRequest === undefined){
            pickupRequest = {floor, direction, elevatorId: null}
            this.pickupRequests.push(pickupRequest);
        }

        let chosenElevator = this.#checkForComingElevator(floor, direction);

        if (chosenElevator === null) {
            chosenElevator = this.#getClosestFreeElevator(floor);
        }

        if (chosenElevator !== null) {
            chosenElevator.addPickupFloor(floor);
            pickupRequest.elevatorId = chosenElevator.id;
            return
        }
    }

    addTargetFloor(elevatorId, floor) {
        const elevator = this.elevators[elevatorId]
        elevator.addTargetFloor(floor);
    }

    step(){
        this.elevators.forEach(e => e.update());
        this.pickupRequests = this.pickupRequests.filter(p => {
            if (p.elevatorId === null){
                this.pickup(p.floor, p.direction);
                return true;
            }
            const elevator = this.elevators[p.elevatorId];
            return elevator.currentFloor !== p.floor || !elevator.doorClosed;
        });
    }

    status(){
        const status = this.elevators.map(e => {
            return {
                id: e.id,
                currentFloor: e.currentFloor,
                direction: e.direction,
                targetFloors: e.targetFloors,
                pickupFloors: e.pickupFloors,
                doorOpen: e.doorOpen
            }
        });
        return status;
    }
}

export default ElevatorSystem;