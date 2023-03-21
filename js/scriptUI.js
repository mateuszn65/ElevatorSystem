import ElevatorSystem from './Elevator/ElevatorSystem.js';

const elevatorSystem = new ElevatorSystem(2, 4);
const output = document.getElementById('output');

const pickupButton = document.getElementById('pickup-btn');
const updateButton = document.getElementById('update-btn');
const stepButton = document.getElementById('step-btn');
const statusButton = document.getElementById('status-btn');

pickupButton.addEventListener('click', pickup);
updateButton.addEventListener('click', update);
stepButton.addEventListener('click', step);
statusButton.addEventListener('click', getStatus);

function pickup() {
  const floor = parseInt(document.getElementById('pickup-floor').value);
  const direction = document.getElementById('pickup-direction').value;
  console.log(floor, direction);
  elevatorSystem.pickup(floor, direction);
  output.textContent = `Pickup request at floor ${floor} with direction ${direction}`;
}

function update() {
  const elevatorId = parseInt(document.getElementById('update-elevator').value);
  const currentFloor = parseInt(document.getElementById('update-floor').value);
  const targetFloor = parseInt(document.getElementById('update-target').value);
  elevatorSystem.update(elevatorId, currentFloor, targetFloor);
  output.textContent = `Update elevator ${elevatorId} to current floor ${currentFloor} and target floor ${targetFloor}`;
}

function step() {
  elevatorSystem.step();
  output.textContent = 'Step performed';
}

function getStatus() {
  const status = elevatorSystem.status();
  output.textContent = 'Elevator status:\n' + JSON.stringify(status, null, 2);
}