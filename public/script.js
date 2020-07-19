var cookies = 0;
var cpc = 1;
var cps = 0;
var totalClicks = 0;
var totalTime = 0;
var click = 0;
let upgrades;
let currentClick = "chocolateTouches";

// theme
var theme = localStorage.getItem("theme");

// # of helpers
var Baker = 0;
var Salesman = 0;
var Grandma = 0;
var ProBaker = 0;
var AutoMaker = 0;
var Factory = 0;
var Central = 0;

// # of restarts
var restarts = 0;

function addCookie() {
  cookies += cpc;
  totalClicks++;
  document.getElementById("clickTotal").innerHTML = totalClicks;
  document.getElementById("cookieCount").innerHTML = cookies;
  checkUpgrades();
}

function init() {
  fetch("upgrades.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      upgrades = data;
    })
  
  setInterval(() => {
    totalTime++;
    cookies += cps;
    document.getElementById("timeTotal").innerHTML = `${Math.round(totalTime/60)}:${totalTime%60}`;
    document.getElementById("cookieCount").innerHTML = cookies;
  }, 1000)
  
  if (theme == "chocolate") {
    document.getElementById("themeIcon").classList.replace("fa-mug-hot", "fa-tint");
    document.body.classList.replace("water", "chocolate");
  }
}

function changeTheme() {
  
  if (theme == "chocolate") {
    
    console.log("chocolate > water");
    
    localStorage.setItem("theme", "water");
    document.getElementById("themeIcon").classList.replace("fa-tint", "fa-mug-hot");
    document.body.classList.replace("chocolate", "water");
    
  } else {
    
    console.log("water > chocolate");
    
    localStorage.setItem("theme", "chocolate");
    document.getElementById("themeIcon").classList.replace("fa-mug-hot", "fa-tint");
    document.body.classList.replace("water", "chocolate");
    
  }
  
  theme = localStorage.getItem("theme");
  
}

function hideSidebar() {
  const inner = document.getElementById("innerSidebar");
  const container = document.getElementById("container");
  const sidebar = document.getElementById("sidebar");
  const sbCookie = document.getElementById("sbCookie");
  const count = document.getElementById("cookieCount");
  
  if (inner.style.display == "none") {
    inner.style.display = "block";
    sidebar.style.width = "30%";
    sidebar.style.textAlign = "left";
    container.style.gridTemplateColumns = "5fr 2fr";
    // move cookie count
    sbCookie.style.position = "relative";
    sbCookie.style.right = "unset";
    sbCookie.style.color = "chocolate";
    count.style.position = "relative";
    count.style.right = "unset";
    count.style.color = "white";
  } else {
    inner.style.display = "none";
    sidebar.style.width = "3.8rem";
    sidebar.style.textAlign = "center";
    container.style.gridTemplateColumns = "11fr 1fr";
    // move cookie count
    sbCookie.style.position = "absolute";
    sbCookie.style.right = "4rem";
    sbCookie.style.color = "var(--cookie)";
    count.style.position = "absolute";
    count.style.right = "6.5rem";
    count.style.color = "#EFE2B2";
  }
}

function showModal() {
  document.getElementById("modalOverlay").style.display = "flex";
}

function hideModal() {
  document.getElementById("modalOverlay").style.display = "none";
}

function checkUpgrades() {
  function check(item) {
    if (cookies >= upgrades[item]["price"]) {
      document.getElementById(`buy${item}`).className = "buyUpgr";
    } else {
      document.getElementById(`buy${item}`).className = "buyUpgrDisabled";
    }
  }
  if (cookies >= upgrades[currentClick]["price"]) {
    document.getElementById("buyClick").className = "buyUpgr";
  } else {
    document.getElementById("buyClick").className = "buyUpgrDisabled";
  }
  
  check("Baker");
  
  if (Baker > 0) {
    check("Salesman");
  }
  if (Salesman > 0) {
    check("Grandma");
  }
  if (Grandma > 0) {
    check("ProBaker");
  }
  if (ProBaker > 0) {
    check("AutoMaker");
  }
  if (AutoMaker > 0) {
    check("Factory");
  }
  if (Factory > 0) {
    check("Central");
  }
}

function purchase(btn, item) {
  const btnClass = document.getElementById(btn).className;
  const price = upgrades[`${item}`]["price"]
  
  if (btnClass == "buyUpgr") {
    cookies -= price;
    cps += upgrades[`${item}`]["upgr"];
    upgrades[`${item}`]["price"] += upgrades[`${item}`]["scale"];
    
    window[`${item}`]++;
    const nextItem = upgrades[`${item}`]["next"];
    if (nextItem == "none") {
      
    } else if (window[`${nextItem.charAt(0).toUpperCase()}${nextItem.slice(1)}`] == 0) {
      console.log(`${upgrades[`${item}`]["next"]} is now unlocked`);
      var unlock = document.getElementsByClassName(`${upgrades[item]["next"]}`);
      for (var i = 0; i < unlock.length; i++) {
        unlock[i].style.display = "block";
      }
    }
  } else {
    console.log(`Insufficient cookies for ${item}`);
  }
  
  updateInfo();
  checkUpgrades();
}

function clickUpgrade() {
  if (currentClick == "portal") {
    showModal();
  } else {
    const btnClass = document.getElementById("buyClick").className;
    
    if (btnClass == "buyUpgr") {
      cookies -= upgrades[currentClick]["price"];
      cpc += upgrades[currentClick]["upgr"];
      
      if (click == 0) {
        changeCU("refinedDough");
      } else if (click == 1) {
        changeCU("candyToppings");
      } else if (click == 2) {
        changeCU("cookieSandwiches");
      } else if (click == 3) {
        changeCU("iceCreamSandwiches");
      } else if (click == 4) {
        changeCU("wholeWheat");
      } else if (click == 5) {
        changeCU("darkChocolate");
      } else if (click == 6) {
        changeCU("cream");
      } else if (click == 7) {
        changeCU("goldenCookie");
      } else {
        changeCU("portal");
        document.getElementById("buyClick").innerText = "RESTART";
      }
      
      click++;
    } else {
      console.log(`Not enough cookies to upgrade click`);
    }
    
    updateInfo();
    checkUpgrades();
  }
}

function changeCU(upgrName) {
  // change click upgrade
  currentClick = upgrades[currentClick]["next"];
  document.getElementById("clickImg").src = upgrades[upgrName]["img"];
  document.getElementById("priceClick").innerHTML = upgrades[upgrName]["price"];
  document.getElementById("clickName").innerHTML = upgrades[upgrName]["name"];
  document.getElementById("clickDesc").innerHTML = upgrades[upgrName]["desc"];
  document.getElementById("clickUpgr").innerHTML = `+${upgrades[upgrName]["upgr"]}cpc`;
  if (upgrName == "portal") {
    document.getElementById("clickUpgr").innerHTML = `-${upgrades[upgrName]["down"]}cpc`;
  }
}

function updateInfo() {
  document.getElementById("cookieCount").innerHTML = cookies;
  document.getElementById("clickTotal").innerHTML = totalClicks;
  document.getElementById("cpc").innerHTML = cpc;
  document.getElementById("cps").innerHTML = cps;
  
  // helpers prices
  document.getElementById("priceBaker").innerHTML = upgrades["Baker"]["price"];
  document.getElementById("priceSalesman").innerHTML = upgrades["Salesman"]["price"];
  document.getElementById("priceGrandma").innerHTML = upgrades["Grandma"]["price"];
  document.getElementById("priceProBaker").innerHTML = upgrades["ProBaker"]["price"];
  document.getElementById("priceAutoMaker").innerHTML = upgrades["AutoMaker"]["price"];
  document.getElementById("priceFactory").innerHTML = upgrades["Factory"]["price"];
  document.getElementById("priceCentral").innerHTML = upgrades["Central"]["price"];
  
  // helpers
  document.getElementById("bakers").innerHTML = Baker;
  document.getElementById("salesmen").innerHTML = Salesman;
  document.getElementById("grandmas").innerHTML = Grandma;
  document.getElementById("proBakers").innerHTML = ProBaker;
  document.getElementById("autoMakers").innerHTML = AutoMaker;
  document.getElementById("factories").innerHTML = Factory;
  document.getElementById("centrals").innerHTML = Central;
}

function changeTabs(tabBtn) {
  let tab = document.getElementById(tabBtn);
  let rmTab;
  
  if (tabBtn == "upgrTabBtn") {
    rmTab = document.getElementById("infoTabBtn");
    tab.style.marginLeft = "0";
    rmTab.style.marginLeft = "1rem";
    rmTab.className = "infoBtn";
    
    // change tab content
    document.getElementById("upgrades").style.display = "block";
    document.getElementById("info").style.display = "none";
  } else {
    rmTab = document.getElementById("upgrTabBtn");
    tab.style.marginLeft = "1.5rem";
    rmTab.style.marginLeft = "1rem";
    rmTab.className = "upgrBtn";
    
     // change tab content
     document.getElementById("info").style.display = "block";
     document.getElementById("upgrades").style.display = "none";
  }
  
  // add active style to tab
  tab.className = "tabBtnActive";
  tab.style.cursor = "default";
  tab.marginBottom = "0.2rem";
  
  // remove active style from tab
  rmTab.style.cursor = "pointer";
  rmTab.style.color = " ";
}

function restart() {
  hideModal();
  changeCU("chocolateTouches");
  document.getElementById("buyClick").innerText = "UPGRADE";
  
  cookies = 0;
  cpc = 1;
  cps = 0;
  click = 0;
  upgrades;
  currentClick = "chocolateTouches";

  Baker = 0;
  Salesman = 0;
  Grandma = 0;
  ProBaker = 0;
  AutoMaker = 0;
  Factory = 0;
  Central = 0;
  
  // reset obj
  fetch("upgrades.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      upgrades = data;
    })
  
  // hide elements
  function hideElements(name) {
    var hidden = document.getElementsByClassName(name);
    for (var i = 0; i < hidden.length; i++) {
      hidden[i].style.display = "none";
    }
  }
  hideElements("salesman");
  hideElements("grandma");
  hideElements("proBaker");
  hideElements("autoMaker");
  hideElements("factory");
  hideElements("central");
  
  updateInfo();
  checkUpgrades();
  restarts++;
}