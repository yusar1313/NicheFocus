
const interestData = {
  "skincare": [
    { "name": "Skincare Enthusiast", "audience": "1.200.000", "related": ["Natural skincare", "Skincare routine"] },
    { "name": "Natural skincare", "audience": "880.000", "related": ["Skincare Enthusiast", "Korean skincare"] }
  ],
  "fitness": [
    { "name": "Fitness & weight loss", "audience": "5.300.000", "related": ["Gym workout", "Home workout"] },
    { "name": "Gym workout", "audience": "3.100.000", "related": ["Strength training", "Cardio"] }
  ],
  "dropship": [
    { "name": "Dropshipping", "audience": "3.000.000", "related": ["Shopify", "Reseller"] },
    { "name": "Shopify store owner", "audience": "2.500.000", "related": ["Dropshipping", "Online business"] }
  ]
};

let savedInterests = [];

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById('nicheInput');
  const datalist = document.getElementById('suggestions');

  input.addEventListener("input", () => {
    const val = input.value.toLowerCase();
    datalist.innerHTML = "";
    Object.keys(interestData).forEach(key => {
      if (key.startsWith(val)) {
        const option = document.createElement("option");
        option.value = key;
        datalist.appendChild(option);
      }
    });
  });
});

function generateInterest() {
  const input = document.getElementById('nicheInput').value.toLowerCase();
  const resultSection = document.getElementById('results');
  const list = document.getElementById('interestList');
  list.innerHTML = "";

  const keywords = input.split(",").map(k => k.trim()).filter(k => k);
  let results = [];

  keywords.forEach(keyword => {
    if (interestData[keyword]) {
      results = results.concat(interestData[keyword]);
      interestData[keyword].forEach(item => {
        if (item.related) {
          item.related.forEach(rel => {
            results.push({ name: rel, audience: "Estimasi", related: [] });
          });
        }
      });
    }
  });

  if (results.length > 0) {
    resultSection.classList.remove("hidden");
    results.forEach(item => {
      const div = document.createElement("div");
      const saveBtn = `<button onclick="saveInterest('${item.name}')" class="save-btn">⭐</button>`;
      div.innerHTML = `<strong>${item.name}</strong> - ${item.audience} ${saveBtn}`;
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
  let csvContent = "data:text/csv;charset=utf-8,Interest,Audience\n";
  listItems.forEach(item => {
    const audience = item.parentElement.textContent.split(" - ")[1]?.trim() || "";
    csvContent += item.textContent + "," + audience + "\n";
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "interest.csv");
  document.body.appendChild(link);
  link.click();
}

function saveInterest(name) {
  if (!savedInterests.includes(name)) {
    savedInterests.push(name);
    alert(`Interest "${name}" berhasil disimpan!`);
  } else {
    alert(`Interest "${name}" sudah ada di daftar.`);
  }
}
