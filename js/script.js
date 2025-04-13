/*************************************************************
 * Mapping for answer categories
 *************************************************************/
const categoryLabels = {
  "2": "Completed and Fully Operational",
  "1.5": "Work in Progress",
  "1": "Planning and Review Phase",
  "0.5": "Brainstorming Phase",
  "0": "No Action Taken"
};

/*************************************************************
 * STANDARDS + QUESTIONS (84 in total: 12 × 7)
 *************************************************************/
const standards = [
  {
    title: "1. Early Warning and Alert Dissemination Protocol",
    questions: [
      "Has the district established a dedicated early warning unit that receives alerts from state and national sources?",
      "Is there a documented procedure for the DDMA to verify and relay flood alerts to local communities within a specified timeframe?",
      "Are local sensor data (e.g., rain gauges, river level monitors) incorporated into the district’s warning system?",
      "Does the district use a standardized alert format (e.g., color-coded system) unique to its operational guidelines?",
      "Are district alerts timestamped to measure the response time between state notification and local dissemination?",
      "Is there a procedure for the district to conduct objective audits of the alert dissemination process after each event?",
      "Has the district mandated quarterly drills to test the functionality and accuracy of its early warning system?"
    ]
  },
  // ... [Remaining standards remain unchanged] ...
  {
    title: "12. Post-Event Reporting and Accountability Standard",
    questions: [
      "Has the district DDMA implemented a standardized after-action report template unique to district operations?",
      "Is there an objective requirement for district teams to submit quantifiable data on response times and resource usage post-flood?",
      "Does the district have an independent audit mechanism to objectively verify the accuracy of post-event reports?",
      "Is there a distinct protocol for collecting and analyzing feedback from affected communities at the district level?",
      "Does the district document lessons learned in a structured format unique to its operational context?",
      "Is there a mandated timeline for district-level post-event reporting that ensures objective and timely submission?",
      "Does the district maintain a clear accountability chart that assigns responsibility for each component of the flood response?"
    ]
  }
];

/*************************************************************
 * 1) Generate the dynamic form with 84 questions
 *************************************************************/
function generateForm() {
  const form = document.getElementById("assessmentForm");
  form.innerHTML = "";

  standards.forEach((standard, sIndex) => {
    const sectionDiv = document.createElement("div");
    sectionDiv.className = "standard-section";

    const titleEl = document.createElement("h3");
    titleEl.textContent = standard.title;
    sectionDiv.appendChild(titleEl);

    standard.questions.forEach((questionText, qIndex) => {
      const qDiv = document.createElement("div");
      qDiv.className = "question";

      // Question label
      const p = document.createElement("p");
      p.textContent = `${sIndex + 1}.${qIndex + 1} - ${questionText}`;
      qDiv.appendChild(p);

      // Dropdown element
      const select = document.createElement("select");
      select.name = `${sIndex + 1}.${qIndex + 1}`;
      for (let val of ["2", "1.5", "1", "0.5", "0"]) {
        let opt = document.createElement("option");
        opt.value = val;
        opt.textContent = categoryLabels[val];
        select.appendChild(opt);
      }

      qDiv.appendChild(select);
      sectionDiv.appendChild(qDiv);
    });

    form.appendChild(sectionDiv);
  });

  // Add the final submission button at the bottom
  const submitBtn = document.createElement("button");
  submitBtn.type = "button";
  submitBtn.textContent = "Final Submission";
  submitBtn.onclick = finalSubmit;
  form.appendChild(submitBtn);
}

/*************************************************************
 * 2) Clear form + localStorage
 *************************************************************/
function clearForm() {
  document.getElementById("assessmentForm").reset();
  localStorage.removeItem("assessmentData");
  alert("Form cleared and local storage removed.");
}

/*************************************************************
 * 3) Save form to localStorage (optional)
 *************************************************************/
function saveForm() {
  const formData = collectFormData();
  localStorage.setItem("assessmentData", JSON.stringify(formData));
  alert("Form data saved to local storage.");
}

/*************************************************************
 * 4) Load form from localStorage (optional)
 *************************************************************/
function loadForm() {
  const data = JSON.parse(localStorage.getItem("assessmentData") || "{}");
  if (!data.responses) {
    alert("No saved data found.");
    return;
  }
  // Fill in text fields
  document.getElementById("districtName").value = data.districtName || "";
  document.getElementById("ceoDDMA").value = data.ceoDDMA || "";
  document.getElementById("departmentName").value = data.departmentName || "";
  document.getElementById("officerName").value = data.officerName || "";

  // Fill in dropdowns
  Object.keys(data.responses).forEach(key => {
    let select = document.getElementsByName(key)[0];
    if (select) select.value = data.responses[key];
  });
  alert("Form data loaded from local storage.");
}

/*************************************************************
 * Helper to gather all form data into an object
 *************************************************************/
function collectFormData() {
  let responses = {};
  document.querySelectorAll("#assessmentForm select").forEach(select => {
    responses[select.name] = select.value;
  });

  return {
    districtName: document.getElementById("districtName").value,
    ceoDDMA: document.getElementById("ceoDDMA").value,
    departmentName: document.getElementById("departmentName").value,
    officerName: document.getElementById("officerName").value,
    responses: responses
  };
}

/*************************************************************
 * 5) Final submission: send data to our backend endpoint
 *************************************************************/
async function finalSubmit() {
  // Gather all form data
  const formData = {
    districtName: document.getElementById("districtName").value,
    ceoDDMA: document.getElementById("ceoDDMA").value,
    departmentName: document.getElementById("departmentName").value,
    officerName: document.getElementById("officerName").value,
    responses: {}
  };

  document.querySelectorAll("#assessmentForm select").forEach(select => {
    formData.responses[select.name] = select.value;
  });

  // Log the submission data for debugging
  console.log("Submitting form data:", JSON.stringify(formData));

  try {
    // Send the form data to your backend server
    const response = await fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      console.log("Submission succeeded", await response.text());
      alert("Form submitted successfully! GitHub Actions will process the update.");
    } else {
      const errorData = await response.text();
      console.error("Server API Error:", errorData);
      alert("Error triggering server dispatch. Check console for details.");
    }
  } catch (error) {
    console.error("Error in finalSubmit:", error);
    alert("Something went wrong while submitting the form!");
  }
}

/*************************************************************
 * 6) Generate a basic report + show charts
 *************************************************************/
function generateReport(latestSubmission, allSubmissions) {
  // Hide form, show report
  document.getElementById("header").style.display = "none";
  document.getElementById("form-container").style.display = "none";
  document.getElementById("reportSection").style.display = "block";

  // Create a basic table for the latest submission
  let html = `
    <table>
      <tr><th>District Name</th><td>${latestSubmission.districtName || "N/A"}</td></tr>
      <tr><th>CEO DDMA</th><td>${latestSubmission.ceoDDMA || "N/A"}</td></tr>
      <tr><th>Department</th><td>${latestSubmission.departmentName || "N/A"}</td></tr>
      <tr><th>Officer</th><td>${latestSubmission.officerName || "N/A"}</td></tr>
    </table>
  `;
  document.getElementById("reportTable").innerHTML = html;

  // Compute scores for the latest submission
  let standardScores = [];
  standards.forEach((std, sIndex) => {
    let sum = 0;
    for (let q = 1; q <= std.questions.length; q++) {
      const key = `${sIndex + 1}.${q}`;
      sum += parseFloat(latestSubmission.responses[key] || "0");
    }
    standardScores.push(sum);
  });

  // Generate a bar chart for standard scores
  const barCtx = document.getElementById("barChart").getContext("2d");
  if (window.myBarChart) window.myBarChart.destroy();
  window.myBarChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: standards.map((_, i) => "Std " + (i + 1)),
      datasets: [{
        label: "Score",
        data: standardScores,
        backgroundColor: "rgba(0, 122, 204, 0.7)"
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: "Score" },
          max: 14
        }
      }
    }
  });

  // Generate a pie chart for answer distribution
  let distributionCounts = { "2": 0, "1.5": 0, "1": 0, "0.5": 0, "0": 0 };
  Object.values(latestSubmission.responses).forEach(val => {
    distributionCounts[val] = (distributionCounts[val] || 0) + 1;
  });
  const pieCtx = document.getElementById("pieChart").getContext("2d");
  if (window.myPieChart) window.myPieChart.destroy();
  window.myPieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: Object.keys(distributionCounts).map(k => categoryLabels[k]),
      datasets: [{
        data: Object.values(distributionCounts),
        backgroundColor: ["#2ecc71", "#f1c40f", "#3498db", "#9b59b6", "#e74c3c"]
      }]
    },
    options: {
      plugins: {
        legend: { position: "bottom" },
        title: { display: true, text: "Overall Answer Distribution" }
      }
    }
  });
}

/*************************************************************
 * 7) PDF Download
 *************************************************************/
function downloadPDF() {
  html2canvas(document.getElementById("reportSection"), { scale: 2 }).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 40;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;
    let position = 20;

    pdf.addImage(imgData, "PNG", 20, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      pdf.addPage();
      position = heightLeft - imgHeight + 20;
      pdf.addImage(imgData, "PNG", 20, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    pdf.save("assessment_report.pdf");
  });
}

/*************************************************************
 * 8) Go back to edit form
 *************************************************************/
function editForm() {
  document.getElementById("header").style.display = "block";
  document.getElementById("form-container").style.display = "block";
  document.getElementById("reportSection").style.display = "none";
  window.scrollTo(0, 0);
}

/*************************************************************
 * On Page Load
 *************************************************************/
document.addEventListener("DOMContentLoaded", () => {
  generateForm();
});
