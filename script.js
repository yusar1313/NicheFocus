
let interestData = {};
let suggestionData = [];

fetch('interest.json')
  .then(response => response.json())
  .then(data => {
    interestData = data;
  });

fetch('interest-suggestions-full.json')
  .then(response => response.json())
  .then(data => {
    suggestionData = data;
    const datalist = document.getElementById('suggestions');
    data.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item;
      datalist.appendChild(opt);
    });
  });

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
      div.innerHTML = `<strong>${item.name}</strong> - ${item.audience}`;
      list.appendChild(div);
    });
  } else {
    resultSection.classList.remove("hidden");
    list.innerHTML = "<p>Tidak ada interest ditemukan.</p>";
  }
}

function copyInterest() {
  const listItems = document.querySelectorAll("#interestList strong");
  const values = Array.from(listItems).map(item => item.textContent);
  navigator.clipboard.writeText(values.join(", "));
  alert("Interest berhasil disalin!");
}

function exportCSV() {
  const listItems = document.querySelectorAll("#interestList strong");
  let csvContent = "data:text/csv;charset=utf-8,Interest
";
  listItems.forEach(item => {
    csvContent += item.textContent + "\n";
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "interest.csv");
  document.body.appendChild(link);
  link.click();
}
