var theme = localStorage.getItem("theme");

function init() {
  if (theme == "chocolate") {
    document.body.classList.replace("water", "chocolate");
    document.getElementById("themeChanger").classList.replace("fa-mug-hot", "fa-tint");
  }
}

function changeTheme() {
  if (theme == "water") {
    localStorage.setItem("theme", "chocolate");
    document.body.classList.replace("water", "chocolate");
    document.getElementById("themeChanger").classList.replace("fa-mug-hot", "fa-tint");
  } else {
    localStorage.setItem("theme", "water");
    document.body.classList.replace("chocolate", "water");
    document.getElementById("themeChanger").classList.replace("fa-tint", "fa-mug-hot");
  }
  
  theme = localStorage.getItem("theme");
}