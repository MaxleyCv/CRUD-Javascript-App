var displayfilter = false;
var displaysorted = false;

displayItems();

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

async function weaponCounter() {
  var items = await allStorage();
  var i = items.length + 1;
  var counter = 0;
  while (--i) {
    console.log(items[i]);
    if (isNaN(JSON.parse(items[i - 1])["countOnBase"])) continue;
    counter += JSON.parse(items[i - 1])["countOnBase"];
  }
  document.getElementById("amount").textContent =
    "Total weapon amount: " + counter.toString();
}

document.getElementById("shit").addEventListener("click", (event) => {
  event.preventDefault();})

async function addAnArm() {
  clearItems();
  var newArm = {};
  // newArm["name"] = document.getElementsByName("name")[0].value;
  newArm["serial_number"] = document.getElementsByName("serial")[0].value;
  newArm["country_of_origin"] = document.getElementsByName("country")[0].value;
  if (document.getElementsByName("crew")[0].value == "")
    newArm["operation_crew_count"] = "0";
  else newArm["operation_crew_count"] = document.getElementsByName("crew")[0].value;
  newArm["count_in_stack"] = document.getElementsByName("stack")[0].value;

  console.log(JSON.stringify(newArm));

  document.getElementById("shit").click();

  fetch("http://127.0.0.1:5000/arm", {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newArm)
  }).then(res => {
    console.log("Request complete! response:", res);
  }).catch((error) => console.log(error));

  displayItems();

  clearInput();
}

async function displayItems() {
  var items = await allStorage();
  var i = items.length;
  result = [];

  weaponCounter();

  while (i--) {
    result.push(JSON.parse(items[i]));
  }

  renderFrame(result);
}


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

async function allStorage() {
  var values = [];
  var keya = [];

  const res = await fetch("http://127.0.0.1:5000/arms");
  const data = await res.json();
  values = data;
  console.log(data);
  
  console.log(values);

  let i = values.length;

  while (i--) {
    let newArm = {}
    newArm["name"] =values[i]["id"];
    newArm["serialNumber"] = values[i]["_serial_number"];
    newArm["countryOfOrigin"] = values[i]["_country_of_origin"];
    newArm["operationCrew"] = values[i]["_operation_crew_count"];
    newArm["countOnBase"] = values[i]["_count_in_stack"];
    let someArm = JSON.stringify(newArm);
    keya.push(someArm);
    console.log(someArm);
  }

  return keya;
}

function clearInput() {
  var inputs = document.getElementsByTagName("input");
  var i = inputs.length;
  while (i--) {
    document.getElementsByTagName("input")[i].textContent = "";
  }
}

async function clearBase() {
  var items = await allStorage();
  var i = items.length;
  while (i--){
    await fetch("http://127.0.0.1:5000/arm/" + JSON.parse(items[i])["name"], {
      method: "DELETE", 
    }).then(res => {
      console.log("Request complete! response:", res);
    }).catch((error) => console.log(error));
  }
  displayItems();
}

async function searchtime() {
  var items = await allStorage();
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
      while (i--){
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

async function edit(id){
  const res = await fetch("http://127.0.0.1:5000/arms");
  const data = await res.json();

  let newArm2 = {}
    newArm2["name"] =data[0]["id"];
    newArm2["serialNumber"] = data[0]["_serial_number"];
    newArm2["countryOfOrigin"] = data[0]["_country_of_origin"];
    newArm2["operationCrew"] = data[0]["_operation_crew_count"];
    newArm2["countOnBase"] = data[0]["_count_in_stack"];

  if (newArm2 != null) {
  document.getElementsByName("name")[0].value = newArm2["name"];
  document.getElementsByName("serial")[0].value = newArm2["serialNumber"];
  document.getElementsByName("country")[0].value = newArm2["countryOfOrigin"];
  document.getElementsByName("crew")[0].value = newArm2["operationCrew"]
  document.getElementsByName("stack")[0].value = newArm2["countOnBase"];

  setSave(newArm2["name"]);
  }
}

function setSave(id){
  document.getElementById("create").textContent = "Save";
  document.getElementById("create").onclick = function(event){
    saveItem(id);
  }
}

function saveItem(id){
  let newArm = {};
  newArm["serial_number"] = document.getElementsByName("serial")[0].value;
  newArm["country_of_origin"] = document.getElementsByName("country")[0].value;
  if (document.getElementsByName("crew")[0].value == "")
    newArm["operation_crew_count"] = "0";
  else newArm["operation_crew_count"] = document.getElementsByName("crew")[0].value;
  newArm["count_in_stack"] = document.getElementsByName("stack")[0].value;
  fetch("http://127.0.0.1:5000/arm/" + id.toString(), {
    method: "PUT", 
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newArm)
  }).then(res => {
    console.log("Request complete! response:", res);
  }).catch((error) => console.log(error));
  document.getElementsByName("name")[0].value = " ";
  document.getElementsByName("serial")[0].value = " ";
  document.getElementsByName("country")[0].value = " ";
  document.getElementsByName("crew")[0].value = " ";
  document.getElementsByName("stack")[0].value = " ";
  document.getElementById("create").textContent = "Create Arm";

  document.getElementById("shit").click();

  displayItems();
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