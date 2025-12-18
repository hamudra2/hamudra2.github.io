const logContainer = document.getElementByID("logContainer");

// Load logs
const logs = JSON.parse(localStorage.getItem("logs")) || [];

if logs.length === 0) {
	logContainer.innerHTML = "<p>Jag vet inte logs.length === 0, nånting fel.</p>";
} else {
	logs.forEach((log, index) => {
		const div = document.createElement("div");
		div.style.marginBottom = "10px";
		div.innerHTML = `<strong>${index + 1}.</strong> 
			Time: ${log.time}, 
			Slider Value: ${log.slider}`;
		logContainer.appendChild(div);
	});
}
