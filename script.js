let interestData = {
  "skincare": [
    { "name": "Beauty enthusiast", "audience": "1.000.000" },
    { "name": "Skincare routine", "audience": "800.000" }
  ],
  "fitness": [
    { "name": "Gym workout", "audience": "3.000.000" },
    { "name": "Cardio", "audience": "2.000.000" }
  ]
};

function generateInterest() {
  const input = document.getElementById('nicheInput').value.toLowerCase();
  const resultSection = document.getElementById('results');
  const list = document.getElementById('interestList');
  list.innerHTML = "";

  let keywords = input.split(",").map(k => k.trim()).filter(k => k);
  let results = [];

  keywords.forEach(keyword => {
    if (interestData[keyword]) {
      results = results.concat(interestData[keyword]);
    }
  });

  if (results.length > 0) {
    resultSection.classList.remove("hidden");
    results.forEach(item => {
      const div = document.createElement("div");
      div.textContent = item.name + " - " + item.audience;
      list.appendChild(div);
    });
  } else {
    resultSection.classList.remove("hidden");
    list.innerHTML = "<p>Tidak ada interest ditemukan.</p>";
  }
}

function copyInterest() {
  const listItems = document.querySelectorAll("#interestList div");
  const values = Array.from(listItems).map(item => item.textContent.split(" - ")[0]);
  navigator.clipboard.writeText(values.join(", "));
  alert("Interest berhasil disalin!");
}

function exportCSV() {
  const listItems = document.querySelectorAll("#interestList div");
  let csvContent = "data:text/csv;charset=utf-8,Interest,Audience
";
  listItems.forEach(item => {
    const parts = item.textContent.split(" - ");
    csvContent += parts.join(",") + "\n";
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "interest.csv");
  document.body.appendChild(link);
  link.click();
}
