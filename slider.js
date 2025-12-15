const slider = document.getElementById("energySlider");
const energyText = document.getElementById("energyText");
const percentageLabel = document.getElementById("percentageLabel");

const activityslider = document.getElementById("activityenergySlider");
const activityenergyText = document.getElementById("activityenergyText");
const activitypercentageLabel = document.getElementById("activitypercentageLabel");

const readonlySlider = document.getElementById("readonlySlider-slider");
const displayValue = document.getElementById("displayValue");


function updateValues(value) {
	// Update text ranges
	if (value < 1) {
		energyText.textContent = "Helt utmattad";
	} else if (value < 10) {
		energyText.textContent = "Extremt Trött";
	} else if (value < 20) {
		energyText.textContent = "Väldigt Trött";
	} else if (value < 30) {
		energyText.textContent = "Ganska Trött";
	} else if (value < 40) {
		energyText.textContent = "Lite Trött";
	} else if (value < 50) {
		energyText.textContent = "Börjar Bli Trött";
	} else if (value < 75) {
		energyText.textContent = "Har Energi";
	} else if (value < 100) {
		energyText.textContent = "Mycket Energi";
	} else {
		energyText.textContent = "Helt Pigg";
	}

	// Update percentage label
	percentageLabel.textContent = value + "%";
};

slider.addEventListener("input", (e) => {
	updateValues(e.target.value);
});

// Initialize on load
updateValues(slider.value);




function updateValues2(value) {
	// Update text ranges
	if (value < 1) {
		activityenergyText.textContent = "Helt utmattad";
	} else if (value < 10) {
		activityenergyText.textContent = "Extremt Trött";
	} else if (value < 20) {
		activityenergyText.textContent = "Väldigt Trött";
	} else if (value < 30) {
		activityenergyText.textContent = "Ganska Trött";
	} else if (value < 40) {
		activityenergyText.textContent = "Lite Trött";
	} else if (value < 50) {
		activityenergyText.textContent = "Börjar Bli Trött";
	} else if (value < 75) {
		activityenergyText.textContent = "Har Energi";
	} else if (value < 100) {
		activityenergyText.textContent = "Mycket Energi";
	} else {
		activityenergyText.textContent = "Helt Pigg";
	}

	// Update percentage label
	activitypercentageLabel.textContent = value + "%";
};

activityslider.addEventListener("input", (e) => {
	updateValues2(e.target.value);
});

// Initialize on load
updateValues2(activityslider.value);






// Format date/time
//const formatDate = (date) => {
//	const year = date.getFullYear();
//	const month = String(date.getMonth() + 1).padStart(2, "0"); // padStart makes the month start with 0 if it's less than 2 numbers
//	const day = String(date.getDate()).padStart(2, "0");
	
//	return `${year}-${month}-${day}`;
//};

// Save button logic
document.querySelector(".energyLogAcceptButton").addEventListener("click", function () {
  const value = document.getElementById("energySlider").value;

  // Retrieve existing logs or create a new empty array
  let energyLogs = JSON.parse(localStorage.getItem("energyLogs")) || [];

  // Add the new slider value
  energyLogs.push(value);

  // Save back to localStorage
  localStorage.setItem("energyLogs", JSON.stringify(energyLogs));
});


const slider4 = document.getElementById("energySlider");

const slider8 = document.getElementById("readonlySlider-slider");


function updateSliderFill() {
  const value = (slider4.value - slider4.min) / (slider4.max - slider4.min) * 100;

  slider4.style.background = `
    linear-gradient(
      to right,
      rgb(187, 169, 233) 0%,
      rgb(187, 169, 233) ${value}%,
      #d3d3d3 ${value}%,
      #d3d3d3 100%
    )
  `;
	
  slider8.style.background = `
    linear-gradient(
      to right,
      rgb(187, 169, 233) 0%,
      rgb(187, 169, 233) ${value}%,
      #d3d3d3 ${value}%,
      #d3d3d3 100%
    )
  `;
}

// Initialize + update on input
slider4.addEventListener("input", updateSliderFill);
updateSliderFill();


const slider6 = document.getElementById("activityenergySlider");

function updateSliderFill2() {
  const value = (slider6.value - slider6.min) / (slider6.max - slider6.min) * 100;

  slider6.style.background = `
    linear-gradient(
      to right,
      rgb(187, 169, 233) 0%,
      rgb(187, 169, 233) ${value}%,
      #d3d3d3 ${value}%,
      #d3d3d3 100%
    )
  `;
}

// Initialize + update on input
slider6.addEventListener("input", updateSliderFill2);
updateSliderFill2();



function syncReadonlySlider(value) {
  readonlySlider.value = value;
  displayValue.textContent = value + "%";
}

energySlider.addEventListener("input", (e) => {
  syncReadonlySlider(e.target.value);
});

// Initialize on load
syncReadonlySlider(energySlider.value);

