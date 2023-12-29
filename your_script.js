function makeApiCall() {
    var xhr = new XMLHttpRequest();
    var url = "https://xs6t7p7yc8.execute-api.eu-north-1.amazonaws.com/Beta/my-resource";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Parse the JSON response
                var responseData = JSON.parse(xhr.responseText);

                // Display the data in a table on the webpage
                displayDataInTable(responseData);
                
            } else {
                console.error("API request failed with status:", xhr.status);
            }
        }
    };

    // Open and send the request
    xhr.open("GET", url, true);
    xhr.send();
}

// Function to display data in a table
function displayDataInTable(data) {
    var resultDiv = document.getElementById("result");

    // Clear previous content
    resultDiv.innerHTML = "";

    var table = document.createElement("table");
    var tableHeader = table.createTHead();
    var headerRow = tableHeader.insertRow();

    // Headers for the table
    var headers = ["RollNo", "Name", "Timestamp", "Staff ID", "Staff Name", "Subject Code","Location"];
    for (var i = 0; i < headers.length; i++) {
        var th = document.createElement("th");
        th.innerHTML = headers[i];
        headerRow.appendChild(th);
    }

    var tableBody = table.createTBody();

    // Check if data is defined and is an array
    if (data && Array.isArray(data)) {
        // Iterate through the data and create table rows
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            var row = tableBody.insertRow();

            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);
            var cell7 = row.insertCell(6);

            cell1.innerHTML = item.rollno;
            cell2.innerHTML = item.name;
            cell3.innerHTML = item.attendance_timestamp;
            cell4.innerHTML = item.staffId;
            cell5.innerHTML = item.staffName;
            cell6.innerHTML = item.subjectCode;
            cell7.innerHTML = item.location; 
        }
    } else {
        console.error("Invalid or missing data format:", data);
    }

    resultDiv.appendChild(table);

    // Filter/Search function based on date, subjectCode, and staffId
    function filterTable() {
        var dateInput = document.getElementById("datePicker").value;
        var subjectCodeInput = document.getElementById("subjectCodeInput").value.toLowerCase();
        var staffIdInput = document.getElementById("staffIdInput").value.toLowerCase();
        var rows = tableBody.getElementsByTagName("tr");

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var dateCell = row.cells[2]; // Date cell
            var staffIdCell = row.cells[3]; // Staff ID cell
            var subjectCodeCell = row.cells[5]; // Subject Code cell

            if (
                (!dateInput || (dateCell && new Date(dateCell.innerHTML).toDateString() === new Date(dateInput).toDateString())) &&
                (!subjectCodeInput || (subjectCodeCell && subjectCodeCell.innerHTML.toLowerCase().includes(subjectCodeInput))) &&
                (!staffIdInput || (staffIdCell && staffIdCell.innerHTML.toLowerCase().includes(staffIdInput)))
            ) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    }
    
    // Add event listeners for the search inputs
    document.getElementById("datePicker").addEventListener("change", filterTable);
    document.getElementById("subjectCodeInput").addEventListener("keyup", filterTable);
    document.getElementById("staffIdInput").addEventListener("keyup", filterTable);
        
}
  




// Call the function to initiate the API call and display data
makeApiCall();