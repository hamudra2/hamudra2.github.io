var nrgmodal = document.getElementById("energyLogModal");

var nrglogbtn = document.getElementById("energyLogButton");

var nrglogclose = document.getElementsByClassName("energyLogCloseButton")[0];

var nrglogaccept = document.getElementsByClassName("energyLogAcceptButton")[0];

var activitymodal = document.getElementById("activityModal");

var activitybtn = document.getElementById("button2");

var activitybtnclose = document.getElementById("activityBtnClose");

function setVH() {
  document.documentElement.style.setProperty(
    '--vh',
    `${window.innerHeight * 0.01}px`
  );
}
setVH();
window.addEventListener('resize', setVH);


nrglogbtn.onclick = function() {
	nrgmodal.style.display = "block";
};

nrglogclose.onclick = function() {
	nrgmodal.style.display = "none";
};

nrglogaccept.onclick = function() {
	nrgmodal.style.display = "none";
};

activitybtn.onclick = function() {
	activitymodal.style.display = "block";
};

activityBtnClose.onclick = function() {
	activitymodal.style.display = "none";
};

//let svg = document.querySelector('buttons-containeragain');
//let text = svg.querySelector('text');
//let bbox = text.getBBox();
//svg.setAttribute('viewBox', [bbox.x, bbox.y, bbox.width, bbox.height].join(' '));

let selectedActivity = null;

document.querySelectorAll(".activityBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".activityBtn").forEach(b =>
      b.classList.remove("selected")
    );

    btn.classList.add("selected");
    selectedActivity = btn.dataset.activity;
  });
});


document.getElementById("activityStartBtn").onclick = () => {
  if (!selectedActivity) {
    alert("Välj en aktivitet");
    return;
  }

  const energyBefore = Number(activityslider.value);
  const now = new Date();

  localStorage.setItem("currentActivity", JSON.stringify({
    startTime: Date.now(),
    startDate: `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`,
    activity: selectedActivity,
    energyBefore: energyBefore
  }));

  window.location.href = "aktivitet.html";
};


const startBtn = document.getElementById("activityStartBtn");
startBtn.disabled = true;

document.querySelectorAll(".activityBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    startBtn.disabled = false;
  });
});

document.getElementById("activityBtnClose").onclick = () => {
  document.getElementById("activityModal").style.display = "none";
};
