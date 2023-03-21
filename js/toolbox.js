class Toolbox{
    constructor(numElevators, floorCount, scale){
        this.toolboxIcon = document.querySelector(".toolbox-icon");
        this.toolboxContent = document.querySelector(".toolbox-content");
        this.sliders = document.querySelectorAll(".slider");
        this.elevatorValue = document.getElementById("elevators-value");
        this.floorsValue = document.getElementById("floors-value");
        this.scaleValue = document.getElementById("scale-value");
        this.#setInitialValues(numElevators, floorCount, scale);
    }

    #setInitialValues(numElevators, floorCount, scale){
        this.elevatorValue.textContent = numElevators;
        this.floorsValue.textContent = floorCount;
        this.scaleValue.textContent = `${scale}%`;

        this.sliders.forEach((slider) => {
            switch (slider.id) {
                case "elevators":
                    slider.value = numElevators;
                    break;
                case "floors":
                    slider.value = floorCount;
                    break;
                case "scale":
                    slider.value = scale;
                    break;
            }
        });
    }

    addEventListeners(callbacks = {}){
        this.toolboxIcon.addEventListener("click", () => {
            this.toolboxContent.classList.toggle("active")
        });
      
        this.sliders.forEach((slider) => {
          slider.addEventListener("input", () => {
            switch (slider.id) {
              case "elevators":
                this.elevatorValue.textContent = slider.value;
                callbacks.elevators(slider.value);
                break;
              case "floors":
                this.floorsValue.textContent = slider.value;
                callbacks.floors(slider.value);
                break;
              case "scale":
                this.scaleValue.textContent = `${slider.value}%`;
                callbacks.scale(slider.value);
                break;
            }
          });
        });
    }
}

export default Toolbox;