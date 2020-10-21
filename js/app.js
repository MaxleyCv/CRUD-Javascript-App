var displayfilter = false;
var displaysorted = false;

function tickFilter(){
  displayfilter = document.getElementsByName("tick-filter")[0].checked;
  
  if(document.getElementsByName("tick-filter")[0].checked){
    document.getElementsByName("maximum-filter")[0].style.display = "none";
    alert("You are a general now!");
    document.getElementsByTagName("header")[0].firstChild.value = "You are cool! ";
  }
  else{
    document.getElementsByName("maximum-filter")[0].style.display = "block";
    alert("Go and wipe your boots, soldier!");
    document.getElementsByTagName("header")[0].firstChild.value = "How many soldiers do you have? ";
  }

  if(displayfilter){ 
    displayItems();
  }
  else if (displaysorted){
    displaySorted();
  }
  else{
    displayFiltered();
  }

}

function sortFilter(){
  displayfilter = document.getElementsByName("sort-filter")[0].checked;
  displaySorted();
}

function weaponCounter(){
  var items = allStorage();
  var i = items.length;
  var counter = 0;
  while (--i){
    if (isNaN(parseInt(JSON.parse(items[i])["countOnBase"], 10))) continue;
    counter += parseInt(JSON.parse(items[i])["countOnBase"], 10);
  }
  document.getElementById("amount").textContent = "Total weapon amount: " + counter.toString();
}

function addAnArm() {
  clearItems();
  var newArm = { name: "" };
  newArm["name"] = document.getElementsByName("name")[0].value;
  newArm["serialNumber"] = document.getElementsByName("serial")[0].value;
  newArm["countryOfOrigin"] = document.getElementsByName("country")[0].value;
  if (document.getElementsByName("crew")[0].value == "") newArm["operationCrew"] = "0";
  else newArm["operationCrew"] = document.getElementsByName("crew")[0].value;
  newArm["countOnBase"] = document.getElementsByName("stack")[0].value;
  // localStorage.clear();
  localStorage.setItem(newArm["name"], JSON.stringify(newArm));
  if(displayfilter){ 
    displayItems();
  }
  else if (displaysorted){
    displaySorted();
  }
  else{
    displayFiltered();
  }

  clearInput();
}

function displayItems() {
  var items = allStorage();
  var listOfItems = document.getElementById("products");
  var i = items.length;

  weaponCounter();
  clearItems();

  while (i--) {
    var newElement = document.createElement("LI");
    var new_name = document.createElement("p");
    new_name.textContent = "Name: " + JSON.parse(items[i])["name"];
    newElement.appendChild(new_name);
    var new_serial = document.createElement("p");
    new_serial.textContent =
      "Serial number: " + JSON.parse(items[i])["serialNumber"];
    newElement.appendChild(new_serial);
    var new_country = document.createElement("p");
    new_country.textContent =
      "Country of origin: " + JSON.parse(items[i])["countryOfOrigin"];
    newElement.appendChild(new_country);
    var new_crew = document.createElement("p");
    new_crew.textContent =
      "Operation crew: " + JSON.parse(items[i])["operationCrew"] + " persona";
    newElement.appendChild(new_crew);
    var new_count = document.createElement("p");
    new_count.textContent =
      "Country of origin: " + JSON.parse(items[i])["countOnBase"];
    newElement.appendChild(new_count);
    listOfItems.appendChild(newElement);
  }
}

//Some magic
function srtfary(list){
  let lengt = list.length;
  var rngidx = lengt;
  while (lengt --){
      var nidx = lengt;
      rngidx = lengt;
      var mx = list[lengt];
      while (rngidx --){
          if (parseInt(JSON.parse(list[rngidx])["countOnBase"], 10) > parseInt(JSON.parse(list[nidx])["countOnBase"], 10) ) {nidx = rngidx; mx = list[nidx];}
      }
      let bx = list[nidx];
      list[nidx] = list[lengt];
      list[lengt] = bx;
  }
  lengt = list.length;
  while (lengt --){
      console.log(list[lengt]);
  }
  return list;
}

function displayFiltered() {
  weaponCounter();
  clearItems();
  var items = allStorage();
  var listOfItems = document.getElementById("products");
  var i = items.length;
  var i = items.length;
  while (i--) {
    if (
      parseInt(JSON.parse(items[i])["operationCrew"], 10) <
      document.getElementsByName("maximum-filter")[0].value
    ) {
      var newElement = document.createElement("LI");
      var new_name = document.createElement("p");
      new_name.textContent = "Name: " + JSON.parse(items[i])["name"];
      newElement.appendChild(new_name);
      var new_serial = document.createElement("p");
      new_serial.textContent =
        "Serial number: " + JSON.parse(items[i])["serialNumber"];
      newElement.appendChild(new_serial);
      var new_country = document.createElement("p");
      new_country.textContent =
        "Country of origin: " + JSON.parse(items[i])["countryOfOrigin"];
      newElement.appendChild(new_country);
      var new_crew = document.createElement("p");
      new_crew.textContent =
        "Operation crew: " + JSON.parse(items[i])["operationCrew"] + " persona";
      newElement.appendChild(new_crew);
      var new_count = document.createElement("p");
      new_count.textContent =
        "Country of origin: " + JSON.parse(items[i])["countOnBase"];
      newElement.appendChild(new_count);
      listOfItems.appendChild(newElement);
    }
  }
}

function arrComp(item1, item2){
  return parseInt(JSON.parse(item1)["countOnBase"], 10) < parseInt(JSON.parse(item2)["countOnBase"], 10);
}

function displaySorted() {
  clearItems();
  var items2 = allStorage();

  const items = srtfary(items2);
  var listOfItems = document.getElementById("products");
  var i = items.length;

  while (i--) {
    console.log(items[i]);
    var newElement = document.createElement("LI");
    var new_name = document.createElement("p");
    new_name.textContent = "Name: " + JSON.parse(items[i])["name"];
    newElement.appendChild(new_name);
    var new_serial = document.createElement("p");
    new_serial.textContent =
      "Serial number: " + JSON.parse(items[i])["serialNumber"];
    newElement.appendChild(new_serial);
    var new_country = document.createElement("p");
    new_country.textContent =
      "Country of origin: " + JSON.parse(items[i])["countryOfOrigin"];
    newElement.appendChild(new_country);
    var new_crew = document.createElement("p");
    new_crew.textContent =
      "Operation crew: " + JSON.parse(items[i])["operationCrew"] + " persona";
    newElement.appendChild(new_crew);
    var new_count = document.createElement("p");
    new_count.textContent =
      "Count on base: " + JSON.parse(items[i])["countOnBase"];
    newElement.appendChild(new_count);
    listOfItems.appendChild(newElement);
  }
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

function clearInput(){
  var inputs = document.getElementsByTagName("input");
  var i = inputs.length;
  while (--i){
    document.getElementsByTagName("input")[i].textContent = "";
  }
}

function clearBase(){
  localStorage.clear();
  clearItems();
}
