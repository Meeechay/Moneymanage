let monthlyData = []; // เก็บข้อมูลรายรับและรายจ่ายของทุกเดือน

function submitDailyData() {
    let date = document.getElementById("date").value;
    let incomeType = document.getElementById("incomeType").value;
    let incomeAmount = parseFloat(document.getElementById("incomeAmount").value);
    let expenseType = document.getElementById("expenseType").value;
    let expenseAmount = parseFloat(document.getElementById("expenseAmount").value);

    // เพิ่มข้อมูลรายรับและรายจ่ายของวันนี้เข้าไปในอาร์เรย์ monthlyData
    let selectedDate = new Date(date);
    let month = selectedDate.getMonth(); // ได้เลขเดือน (0-11)
    let lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate(); // หาวันสุดท้ายของเดือน
    if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expenses: 0, details: [] };
    }
    monthlyData[month].income += incomeAmount;
    monthlyData[month].expenses += expenseAmount;
    monthlyData[month].details.push({ incomeType, incomeAmount, expenseType, expenseAmount });

    // ถ้าวันที่เท่ากับวันสุดท้ายของเดือน
    if (selectedDate.getDate() === lastDayOfMonth) {
        // แสดงสรุปผลรายรับ-รายจ่ายประจำเดือน
        summarizeMonthlyData();
    }

    // แสดงข้อมูลที่ถูกบันทึกลงไป
    displayDailyData(selectedDate, incomeType, incomeAmount, expenseType, expenseAmount);

    // ล้างข้อมูลในฟอร์ม
    document.getElementById("date").value = "";
    document.getElementById("incomeType").value = "";
    document.getElementById("incomeAmount").value = "";
    document.getElementById("expenseType").value = "";
    document.getElementById("expenseAmount").value = "";
}

function summarizeMonthlyData() {
    let summary = "<h2>สรุปผลรวมรายรับและรายจ่ายประจำเดือน</h2>";
    let table = document.createElement("table");
    let tableHead = document.createElement("thead");
    let tableBody = document.createElement("tbody");
    
    let headRow = tableHead.insertRow();
    headRow.innerHTML = "<th>เดือน</th><th>รายรับ (บาท)</th><th>รายจ่าย (บาท)</th><th>คงเหลือ (บาท)</th>";
    table.appendChild(tableHead);

    for (let i = 0; i < monthlyData.length; i++) {
        if (monthlyData[i]) {
            let income = monthlyData[i].income;
            let expenses = monthlyData[i].expenses;
            let balance = income - expenses;
            let row = tableBody.insertRow();
            row.innerHTML = `<td>${i + 1}</td><td>${income.toFixed(2)}</td><td>${expenses.toFixed(2)}</td><td>${balance.toFixed(2)}</td>`;
        }
    }
    
    table.appendChild(tableBody);
    summary.appendChild(table);
    document.getElementById("monthlySummary").innerHTML = ""; // Clear previous summary
    document.getElementById("monthlySummary").appendChild(summary);
}

function displayDailyData(date, incomeType, incomeAmount, expenseType, expenseAmount) {
    let dataDisplay = document.getElementById("dailyDataDisplay");
    let formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    let html = `<p>วันที่: ${formattedDate}</p>`;
    html += `<p>รายการรายรับ: ${incomeType} (${incomeAmount} บาท)</p>`;
    html += `<p>รายการรายจ่าย: ${expenseType} (${expenseAmount} บาท)</p>`;
    dataDisplay.innerHTML = html;
}
