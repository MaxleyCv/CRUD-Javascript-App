var displayfilter = false;
var displaysorted = false;

function tickFilter() {
  displayfilter = document.getElementsByName("tick-filter")[0].checked;

  if (document.getElementsByName("tick-filter")[0].checked) {
    document.getElementsByName("maximum-filter")[0].style.display = "none";
    alert("You are a general now!");
    document.getElementsByTagName("header")[0].firstChild.value =
      "You are cool! ";
  } else {
    document.getElementsByName("maximum-filter")[0].style.display = "block";
    alert("Go and wipe your boots, soldier!");
    document.getElementsByTagName("header")[0].firstChild.value =
      "How many soldiers do you have? ";
  }

  displayItems();
}

function sortFilter() {
  displaysorted = document.getElementsByName("sort-filter")[0].checked;
  displayItems();
}

function weaponCounter() {
  var items = allStorage();
  var i = items.length;
  var counter = 0;
  while (--i) {
    if (isNaN(parseInt(JSON.parse(items[i])["countOnBase"], 10))) continue;
    counter += parseInt(JSON.parse(items[i])["countOnBase"], 10);
  }
  document.getElementById("amount").textContent =
    "Total weapon amount: " + counter.toString();
}

function addAnArm() {
  clearItems();
  var newArm = {};
  newArm["name"] = document.getElementsByName("name")[0].value;
  newArm["serialNumber"] = document.getElementsByName("serial")[0].value;
  newArm["countryOfOrigin"] = document.getElementsByName("country")[0].value;
  if (document.getElementsByName("crew")[0].value == "")
    newArm["operationCrew"] = "0";
  else newArm["operationCrew"] = document.getElementsByName("crew")[0].value;
  newArm["countOnBase"] = document.getElementsByName("stack")[0].value;

  localStorage.setItem(newArm["serialNumber"], JSON.stringify(newArm));

  displayItems();

  clearInput();
}

function displayItems() {
  var items = allStorage();
  var i = items.length;
  result = [];

  weaponCounter();

  while (i--) {
    result.push(JSON.parse(items[i]));
  }

  renderFrame(result);
}

//Some magic
function srtfary(list) {
  let lengt = list.length;
  var rngidx = lengt;
  while (lengt--) {
    var nidx = lengt;
    rngidx = lengt;
    var mx = list[lengt];
    while (rngidx--) {
      if (
        parseInt(list[rngidx]["countOnBase"], 10) >
        parseInt(list[nidx]["countOnBase"], 10)
      ) {
        nidx = rngidx;
        mx = list[nidx];
      }
    }
    let bx = list[nidx];
    list[nidx] = list[lengt];
    list[lengt] = bx;
  }
  lengt = list.length;
  while (lengt--) {
    console.log(list[lengt]);
  }
  return list;
}

function clearItems() {
  var listOfItems = document.getElementById("products");
  while (listOfItems.firstChild) {
    listOfItems.removeChild(listOfItems.firstChild);
  }
}

function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;
  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }
  return values;
}

function clearInput() {
  var inputs = document.getElementsByTagName("input");
  var i = inputs.length;
  while (--i) {
    document.getElementsByTagName("input")[i].textContent = "";
  }
}

function clearBase() {
  localStorage.clear();
  clearItems();
}

function searchtime() {
  var items = allStorage();
  var i = items.length;
  let inputBoxName = document.getElementById("nsearch").value;
  let result = [];

  while (i--) {
    if (JSON.parse(items[i])["name"] === inputBoxName) {
      result.push(JSON.parse(items[i]));
    }
  }
  renderFrame(result);
}

function renderFrame(someObj){
    clearItems();
    let listOfItems = document.getElementById("products");
    if (displaysorted){
      someObj = srtfary(someObj);
    }    
    if (displayfilter){
      let i = someObj.length;
      while (--i){
      if (someObj["operationCrew"] > document.getElementsByName("maximum-filter")[0].value){
        someObj.splice(i, 1);
      }
    }
    }
    for (let item of someObj){
      localStorage.getItem(item["serialNumber"]);
      var newElement = document.createElement("LI");
      var new_name = document.createElement("p");
      new_name.textContent = "Name: " + item["name"];
      newElement.appendChild(new_name);
      var new_serial = document.createElement("p");
      new_serial.textContent =
        "Serial number: " + item["serialNumber"];
      newElement.appendChild(new_serial);
      var new_country = document.createElement("p");
      new_country.textContent =
        "Country of origin: " + item["countryOfOrigin"];
      newElement.appendChild(new_country);
      var new_crew = document.createElement("p");
      new_crew.textContent =
        "Operation crew: " + item["operationCrew"] + " persona";
      newElement.appendChild(new_crew);
      var new_count = document.createElement("p");
      new_count.textContent =
        "Count on base: " + item["countOnBase"];
      newElement.appendChild(new_count);
      var new_edit = document.createElement("button");
      new_edit.textContent = "Edit";
      new_edit.onclick = function(event){
        edit(item["serialNumber"]);
      }
      newElement.appendChild(new_edit);
      listOfItems.appendChild(newElement);
    }
}

function edit(id){

  let newArm = JSON.parse(localStorage.getItem(id));

  if (newArm != null) {
  document.getElementsByName("name")[0].value = newArm["name"];
  document.getElementsByName("serial")[0].value = newArm["serialNumber"];
  document.getElementsByName("country")[0].value = newArm["countryOfOrigin"];
  document.getElementsByName("crew")[0].value = newArm["operationCrew"]
  document.getElementsByName("stack")[0].value = newArm["countOnBase"];

  setSave(id);
  }
}

function setSave(id){
  document.getElementById("create").textContent = "Save";
  document.getElementById("create").onclick = function(event){
    saveItem(id);
  }
}

function saveItem(id){
  localStorage.removeItem(id);
  addAnArm();
  document.getElementsByName("name")[0].value = " ";
  document.getElementsByName("serial")[0].value = " ";
  document.getElementsByName("country")[0].value = " ";
  document.getElementsByName("crew")[0].value = " ";
  document.getElementsByName("stack")[0].value = " ";
  document.getElementById("create").textContent = "Create Arm";
}

document.getElementById("form").addEventListener('invalid', (function () {
  return function (e) {
    console.log("Ya idion");
    e.preventDefault();
    var modal = document.getElementById('edit-modal');
    var span = document.getElementsByClassName('close')[0];
    
    modal.style.display = 'block';
    
    span.onclick = function() {
      modal.style.display = 'none';
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    }
  };
})(), true);