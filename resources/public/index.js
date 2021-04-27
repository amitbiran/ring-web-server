function createTable(names_array) {
    let div = document.createElement("div");
    names_array.forEach(name => {
        let p = document.createElement("p");
        p.innerHTML = "buyakasha " + name
        div.appendChild(p);
    })
    let body = document.getElementsByTagName("BODY")[0];
    body.appendChild(div);
}

function helloWorld(){
    console.log("I am groot");
}

function appendRow(person){
    row = document.createElement("tr");
    age = document.createElement("td");
    firstName = document.createElement("td");
    lastName = document.createElement("td");
    age.innerHTML = person["age"];
    firstName.innerHTML = person["firstName"];
    lastName.innerHTML = person["lastName"];
    row.append(firstName);
    row.append(lastName);
    row.append(age);
    table = document.getElementById("users-table");
    table.appendChild(row);
}

function getTableData(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = (resp => {
        if (resp.target.readyState == 4 && resp.target.status == 200) {
            dataStr = resp.target.responseText;
            data = JSON.parse(dataStr);
            data.forEach(person => appendRow(person));
        }
    })
    xhttp.open("GET", "/table-data");
    xhttp.send();
}