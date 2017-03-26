var table = document.getElementById("table");
var tableHTML = '';



for (var i = 1; i < 10; i++) {
  var row = table.insertRow();
    for(var j = 1; j < 10; j++){
        var cell1 = row.insertCell();
        cell1.innerHTML = i * j;
    }

}
