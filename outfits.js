const OUTFIT_KEY = "penguinOutfits";

function getOutfits() {
  return JSON.parse(localStorage.getItem(OUTFIT_KEY)) || {};
}

function saveOutfits(outfits) {
  localStorage.setItem(OUTFIT_KEY, JSON.stringify(outfits));
}

function toggleOutfitGroup(button) {
  const outfitIds = button.dataset.outfits.split(",");
  const outfits = getOutfits();

  // Determine current state from FIRST outfit
  const newState = !outfits[outfitIds[0]];

  outfitIds.forEach(id => {
    outfits[id] = newState;
    applyOutfitState(id, newState);
  });

  saveOutfits(outfits);
  button.classList.toggle("active", newState);
}

function applyOutfitState(outfitId, isActive) {
  const outfit = document.getElementById(outfitId);
  if (outfit) {
    outfit.style.display = isActive ? "flex" : "none";
  }
}

/* 🔑 Restore on page load */
document.addEventListener("DOMContentLoaded", () => {
  const outfits = getOutfits();

  document.querySelectorAll(".outfit-container button").forEach(button => {
    const ids = button.dataset.outfits.split(",");
    const active = outfits[ids[0]] === true;

    ids.forEach(id => applyOutfitState(id, active));
    button.classList.toggle("active", active);
  });
});
