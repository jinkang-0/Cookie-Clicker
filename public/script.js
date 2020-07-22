var cookies = 0;
var cpc = 1;
var cps = 0;
var totalClicks = 0;
var totalTime = 0;
var click = 0;
let upgrades;
let currentClick = "chocolateTouches";

// theme & cookie use
var theme = localStorage.getItem("theme");
var useCookies = localStorage.getItem("useCookies");

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
    document.getElementById("timeTotal").innerHTML = `${Math.floor(totalTime/60)}:${totalTime%60}`;
    if (totalTime%60 < 10) document.getElementById("timeTotal").innerHTML = `${Math.floor(totalTime/60)}:0${totalTime%60}`;
    document.getElementById("cookieCount").innerHTML = cookies;
    checkUpgrades();
  }, 1000)
  
  // change user preference theme
  if (theme == "chocolate") {
    document.getElementById("themeIcon").classList.replace("fa-mug-hot", "fa-tint");
    document.body.classList.replace("water", "chocolate");
  }
  
  if (useCookies == "true") {
    // load the game
    loadGame();
    updateInfo();
    checkUpgrades();
   
    // autosave every minute
    setInterval(saveGame, 60000);
  } else {
    // remove save button
    document.getElementById("saveBtn").style.display = "none";
  }
}

function saveGame() {
  console.log("saved game");
  
  var info = {
    'cpc': cpc,
    'cps': cps,
    'totalClicks': totalClicks,
    'totalTime': totalTime,
    'click': click,
    'currentClick': currentClick,
    'restarts': restarts
  };
 
  var helpers = {
    'Baker': Baker,
    'Salesman': Salesman,
    'Grandma': Grandma,
    'ProBaker': ProBaker,
    'AutoMaker': AutoMaker,
    'Factory': Factory,
    'Central': Central
  };
  
  console.log(JSON.stringify(info));
  console.log(JSON.stringify(helpers));
  
  document.cookie = `cookies=${cookies}`;
  document.cookie = `info=${JSON.stringify(info)}`;
  document.cookie = `upgrades=${JSON.stringify(upgrades)}`;
  document.cookie = `helpers=${JSON.stringify(helpers)}`;
  
  document.getElementById("saving").style.display = "block";
  setTimeout(() => {
    document.getElementById("saving").style.display = "none";
  }, 3000);
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function loadGame() {
  console.log("loaded game");
  
  // get cookie data
  upgrades = JSON.parse(getCookie("upgrades"));
  cookies = parseInt(getCookie("cookies"));
  let info = JSON.parse(getCookie("info"));
  let helpers = JSON.parse(getCookie("helpers"));
  
  // load info data
  if (info["cpc"] > 0) cpc = parseInt(info["cpc"]);
  if (info["cps"] > 0) cps = parseInt(info["cps"]);
  if (info["totalClicks"] > 0) totalClicks = parseInt(info["totalClicks"]);
  if (info["totalTime"] > 0) totalTime = parseInt(info["totalTime"]);
  if (info["click"] > 0) click = parseInt(info["click"]);
  if (info["currentClick"] != null) currentClick = info["currentClick"];
  if (info["restarts"] > 0) restarts = parseInt(info["restarts"]);
  
  // load helpers data
  if (helpers["Baker"] > 0) Baker = parseInt(helpers["Baker"]);
  if (helpers["Salesman"] > 0) Salesman = parseInt(helpers["Salesman"]);
  if (helpers["Grandma"]) Grandma = parseInt(helpers["Grandma"]);
  if (helpers["ProBaker"]) ProBaker = parseInt(helpers["ProBaker"]);
  if (helpers["AutoMaker"]) AutoMaker = parseInt(helpers["AutoMaker"]);
  if (helpers["Factory"]) Factory = parseInt(helpers["Factory"]);
  if (helpers["Central"]) Central = parseInt(helpers["Central"]);
  
  // re-unlock upgrades
  let cc = currentClick;
  changeCU(currentClick);
  currentClick = cc;
  
  function test(item) {
    if (window[item] > 0) {
      console.log(`unlocked ${upgrades[item]["next"]}`);
      var unlock = document.getElementsByClassName(`${upgrades[item]["next"]}`);
      for (var i = 0; i < unlock.length; i++) {
        unlock[i].style.display = "block";
      }
    }
  }
  
  test("Baker");
  test("Salesman");
  test("Grandma");
  test("ProBaker");
  test("AutoMaker");
  test("Factory");
  test("Central");
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
  const sidebar = document.getElementById("sidebar");
  const sbCookie = document.getElementById("sbCookie");
  const count = document.getElementById("cookieCount");
  const bigCookie = document.getElementById("cookieDiv");
  
  if (inner.className == "hidden") {
    inner.classList.remove("hidden");
    sidebar.classList.replace("sbClosed", "sbOpen");
    sbCookie.classList.replace("c-icon-c", "c-icon");
    count.classList.replace("c-count-c", "c-count");
    bigCookie.classList.remove("moveCookie");
  } else {
    inner.classList.add("hidden");
    sidebar.classList.replace("sbOpen", "sbClosed");
    sbCookie.classList.replace("c-icon", "c-icon-c");
    count.classList.replace("c-count", "c-count-c");
    bigCookie.classList.add("moveCookie");
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

  totalTime = 0;
  totalClicks = 0;
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
  
  if (useCookies == "true") {
    saveGame();
  }
}