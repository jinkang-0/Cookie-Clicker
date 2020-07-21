var themeSwitcher;
var theme = localStorage.getItem("theme");

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

function init() {
  if (theme == "chocolate") {
    document.body.classList.replace("water", "chocolate");
    document.getElementById("themeChanger").classList.replace("fa-mug-hot", "fa-tint");
  }
  if (theme == "null") {
    localStorage.setItem("theme", "water");
    theme = "water";
  }
  
  let useCookies = localStorage.getItem("useCookies");
  if (useCookies == "true") {
    document.getElementById("cookieOverlay").style.display = "none";
  } else {
    document.getElementById("cookieOverlay").style.display = "flex";
  }
}

function changeTheme() {
  if (theme == "water") {
    localStorage.setItem("theme", "chocolate");
    
    document.getElementById("themeChanger").classList.replace("fa-mug-hot", "fa-tint");
    document.body.classList.replace("water", "chocolate");
  } else {
    localStorage.setItem("theme", "water");
    
    document.getElementById("themeChanger").classList.replace("fa-tint", "fa-mug-hot");
    document.body.classList.replace("chocolate", "water");
  }
  
  theme = localStorage.getItem("theme");
}

function acceptCookies() {
  localStorage.setItem("useCookies", true);
  document.getElementById("cookieOverlay").style.display = "none";
}

function declineCookies() {
  localStorage.setItem("useCookies", false);
  document.getElementById("cookieOverlay").style.display = "none";
}