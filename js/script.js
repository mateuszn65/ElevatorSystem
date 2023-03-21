import ElevatorSystem from './Elevator/ElevatorSystem.js';
import Toolbox from './toolbox.js';

const delay = 1000;
let numElevators = 4;
let floorCount = 3;
let scale = 100;

let elevatorSystem = new ElevatorSystem(numElevators, floorCount, delay);
let elevatorsContainer = [];

function initCssVariables(){
  document.documentElement.style.setProperty('--delay', `${delay/1000}s`);
  document.documentElement.style.setProperty('--elevator-count', numElevators);
  document.documentElement.style.setProperty('--floor-count', floorCount);
  document.documentElement.style.setProperty('--scale', scale/100);
}

function initToolbox(){
  const toolbox = new Toolbox(numElevators, floorCount, scale);
  toolbox.addEventListeners({
    elevators: (value) => {
      numElevators = value;
      document.documentElement.style.setProperty('--elevator-count', numElevators);
      elevatorSystem = new ElevatorSystem(numElevators, floorCount, delay);
      createEvelatorShafts();
    },
    floors: (value) => {
      floorCount = value;
      document.documentElement.style.setProperty('--floor-count', floorCount);
      elevatorSystem = new ElevatorSystem(numElevators, floorCount, delay);
      createPickupPanels();
      createEvelatorShafts();
    },
    scale: (value) => {
      scale = value;
      document.documentElement.style.setProperty('--scale', scale/100);
    }
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createPickupPanels(){
  const pickupPanelTemplate = document.getElementById('pickup-panel-template');
  const pickupPanelContainer = document.getElementById('pickup-panel-container');
  removeAllChildNodes(pickupPanelContainer);
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

function createEvelatorShafts(){
  const elevatorShaftTemplate = document.getElementById('elevator-shaft-template');
  const elevatorShaftContainer = document.getElementById('elevators-container');
  removeAllChildNodes(elevatorShaftContainer);
  elevatorsContainer = []
  for (let elevatorId = 0; elevatorId < numElevators; elevatorId++) {
    const elevatorShaft = elevatorShaftTemplate.content.firstElementChild.cloneNode(true);
    const targetPanel = elevatorShaft.querySelector('#target-panel');

    for (let floor = floorCount - 1; floor >= 0; floor--) {
      const floorBtn = document.createElement('div');
      floorBtn.classList.add('floor-btn');
      floorBtn.id = floor;
      floorBtn.textContent = floor;
      
      floorBtn.addEventListener('click', ()=>{
        elevatorSystem.addTargetFloor(elevatorId, floor);
        floorBtn.classList.add('active');
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
    const floorBtns = elevatorShaft.querySelectorAll('.floor-btn');

    floorBtns.forEach(floorBtn => {
      if (!elevator.targetFloors.includes(parseInt(floorBtn.id)))
        floorBtn.classList.remove('active');
    });

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
  initCssVariables()
  initToolbox();
  createPickupPanels();
  createEvelatorShafts();
  simulate();
}

init();

