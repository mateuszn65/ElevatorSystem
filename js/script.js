import ElevatorSystem from './Elevator/ElevatorSystem.js';

const numElevators = 10;
const floorCount = 3;
const delay = 1000;

document.documentElement.style.setProperty('--floor-count', floorCount);
document.documentElement.style.setProperty('--elevator-count', numElevators);
document.documentElement.style.setProperty('--delay', `${delay/1000}s`);

const elevatorSystem = new ElevatorSystem(numElevators, floorCount, delay);
const elevatorsContainer = [];

function initPickupPanels(){
  const pickupPanelTemplate = document.getElementById('pickup-panel-template');
  const pickupPanelContainer = document.getElementById('pickup-panel-container');
  for (let floor = floorCount - 1; floor >= 0; floor--) {
    const pickupPanel = pickupPanelTemplate.content.cloneNode(true);
    pickupPanel.querySelector('#pickup-floor').textContent = floor;
    pickupPanel.querySelector('#pickup-up').addEventListener('click', () => {
      elevatorSystem.pickup(floor, 'up');
    });
    pickupPanel.querySelector('#pickup-down').addEventListener('click', () => {
      elevatorSystem.pickup(floor, 'down');
    });
    pickupPanelContainer.appendChild(pickupPanel);
  }
}

function initEvelatorShafts(){
  const elevatorShaftTemplate = document.getElementById('elevator-shaft-template');
  const elevatorShaftContainer = document.getElementById('elevators-container');
  for (let elevatorId = 0; elevatorId < numElevators; elevatorId++) {
    const elevatorShaft = elevatorShaftTemplate.content.firstElementChild.cloneNode(true);
    const targetPanel = elevatorShaft.querySelector('#target-panel');

    for (let floor = floorCount - 1; floor >= 0; floor--) {
      const floorBtn = document.createElement('div');
      floorBtn.classList.add('floor-btn');
      floorBtn.textContent = floor;
      
      floorBtn.addEventListener('click', ()=>{
        elevatorSystem.addTargetFloor(elevatorId, floor);
      })
      targetPanel.appendChild(floorBtn);

      const floorIndicator = document.createElement('div');
      floorIndicator.classList.add('floor-indicator');
      elevatorShaft.appendChild(floorIndicator);
    }

    elevatorShaftContainer.appendChild(elevatorShaft);
    elevatorsContainer.push(elevatorShaft);
  }
}

function simulate(){
  elevatorSystem.step();
  const status = elevatorSystem.status();
  for (let elevatorId = 0; elevatorId < numElevators; elevatorId++) {
    const elevator = status[elevatorId];
    const elevatorShaft = elevatorsContainer[elevatorId];
    const elevatorEl = elevatorShaft.querySelector('.elevator');
    elevatorEl.style.setProperty('--current-floor', elevator.currentFloor);
    if (elevator.doorOpen){
      elevatorEl.classList.add('door-open');
    } else {
      elevatorEl.classList.remove('door-open');
    }
  }
  setTimeout(simulate, delay);
}

function init(){
  initPickupPanels();
  initEvelatorShafts();
  simulate();
}

init();

