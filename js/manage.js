function addArmToBase(arm) {
    var base = readBase();
    base["arms"]["next"] = arm;
    newBase = JSON.stringify(base);


    const fs = require("fs");
    fs.writeFile('./db/objects.json', newBase, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}

function readBase() {
  const fs = require("fs");
  fs.readFile("./db/objects.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    return JSON.parse(jsonString);
  });
}
