var themeSwitcher;

function iconSwitch() {
  themeSwitcher = setInterval(() => {
    const icon = document.getElementById("themeIcon");
    
    if (icon.classList.contains("fa-mug-hot")) {
      icon.classList.replace("fa-mug-hot", "fa-tint");
      icon.classList.replace("mug", "drop");
    } else {
      icon.classList.replace("fa-tint", "fa-mug-hot");
      icon.classList.replace("drop", "mug");
    }
  }, 500)
}

function clearSwitch() {
  console.log("mouse out");
  clearInterval(themeSwitcher);
  const icon = document.getElementById("themeIcon");
  if (icon.classList.contains("fa-tint")) {
    icon.classList.replace("fa-tint", "fa-mug-hot");
    icon.classList.replace("drop", "mug");
  } 
}