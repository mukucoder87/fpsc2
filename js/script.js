/*************************************************************
 * CONFIG: Replace with your GitHub repo info
 *************************************************************/
const GITHUB_REPO = "mukucoder87/fpsc2"; // "username/repository"
const GITHUB_FILE = "data/submissions.json";
const GITHUB_API_TOKEN = "YOUR_PERSONAL_ACCESS_TOKEN"; // e.g. "ghp_xxx..."


// Mapping for answer categories
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
  {
    title: "2. Evacuation Procedures and Safe Route Management",
    questions: [
      "Has the DDMA mapped all primary evacuation routes within the district using up-to-date GIS data?",
      "Is there a documented protocol that triggers evacuation procedures immediately upon receiving a flood warning?",
      "Are the designated evacuation shelters in the district officially approved and marked on local maps?",
      "Does the DDMA have an objective metric (e.g., evacuation completion time) recorded during drills?",
      "Are there specific guidelines for prioritizing evacuations of registered vulnerable households in the district?",
      "Is there a system for regular physical inspections of evacuation routes to ensure they remain passable?",
      "Has the DDMA integrated route management feedback from previous flood events into its evacuation planning?"
    ]
  },
  {
    title: "3. Flood Rescue Operations Standard",
    questions: [
      "Has the district formed a specialized water rescue team with documented training certifications?",
      "Is there an inventory log for rescue equipment (boats, life jackets, etc.) maintained by the DDMA?",
      "Does the district have a clearly defined chain-of-command for deploying rescue operations during floods?",
      "Are rescue protocols formally reviewed and updated by the district on an annual basis?",
      "Is there an established procedure for objectively recording the response time of rescue operations in the district?",
      "Are all water rescue team members required to have distinct first-aid certifications verified by the district?",
      "Does the district conduct a debriefing session after each rescue operation to document unique lessons learned?"
    ]
  },
  {
    title: "4. Emergency Communication Protocol",
    questions: [
      "Has the district DDMA established a dedicated flood communication center with an updated responder contact list?",
      "Is there an objective procedure that ensures all flood-related messages follow a standardized, pre-approved format?",
      "Does the district use multiple communication channels (e.g., radio, SMS, public address) without redundancy overlap?",
      "Is there a documented target response time for relaying critical messages between field teams and the command center?",
      "Are responsibilities for operating communication equipment uniquely assigned to designated district officers?",
      "Does the district have a protocol for testing communication equipment independently at regular intervals?",
      "Is there a written, district-level contingency plan for communication failures that is distinct from other emergency procedures?"
    ]
  },
  {
    title: "5. Relief Camp Setup and Management Standard",
    questions: [
      "Has the DDMA pre-identified a minimum number of safe relief camp sites that meet established criteria?",
      "Is there a unique, documented checklist for setting up relief camps that covers shelter, sanitation, and medical services?",
      "Does the district maintain a standardized registration system for relief camp occupants that records one-time entries only?",
      "Are specific operational roles for relief camp management (e.g., camp in-charge, logistics coordinator) clearly defined in district protocols?",
      "Does the district conduct independent inspections of relief camps to objectively verify adherence to safety standards?",
      "Is there a documented timeline for relief camp setup unique to the district’s response plan?",
      "Has the district established a mechanism for collecting non-overlapping feedback on relief camp operations after each flood event?"
    ]
  },
  {
    title: "6. Immediate Medical Response and Field Triage Standard",
    questions: [
      "Has the district designated a mobile medical unit exclusively for flood emergencies with its own operational guidelines?",
      "Is there a unique, documented triage protocol for field operations that categorizes patients objectively by injury severity?",
      "Does the district mandate a maximum time for medical teams to reach flood-affected areas from the command center?",
      "Are district-level emergency medical drills conducted under a standardized, measurable triage procedure?",
      "Is there a record of certification for each medical response team member maintained by the district?",
      "Does the district have a unique coordination procedure for transferring patients to nearby hospitals during floods?",
      "Is there an objective, district-specific review process that evaluates the performance of field triage after every flood event?"
    ]
  },
  {
    title: "7. Water Supply and Sanitation Emergency Standard",
    questions: [
      "Has the district pre-identified reliable water sources and storage locations for emergency deployment?",
      "Is there a documented plan for the rapid installation of water purification units managed exclusively by the district?",
      "Does the district have a unique protocol for establishing temporary sanitation facilities with measurable quality benchmarks?",
      "Are objective water quality testing procedures implemented at the district level during flood events?",
      "Does the district mandate specific training for local teams in the installation and maintenance of emergency water and sanitation equipment?",
      "Is there a standard measurement defined by the district for safe water supply (e.g., liters per person per day) during floods?",
      "Has the district integrated an independent evaluation process to verify the performance of its water and sanitation measures post-flood?"
    ]
  },
  {
    title: "8. Flood Risk Mapping and Vulnerability Assessment Standard",
    questions: [
      "Has the DDMA produced a detailed, district-specific flood risk map using current field and sensor data?",
      "Is there a documented, standardized methodology used by the district to assess community vulnerability to floods?",
      "Does the district conduct regular, independent surveys to update its flood risk map without duplicating state data?",
      "Are the risk mapping tools used by the district objectively calibrated with locally collected historical flood records?",
      "Is there an objective procedure for validating district vulnerability assessments through periodic field audits?",
      "Does the district have a unique process to incorporate climate change projections into its flood risk mapping?",
      "Are the results of the district’s risk mapping used exclusively to direct resource allocation during flood events?"
    ]
  },
  {
    title: "9. Resource Prepositioning and Distribution Standard",
    questions: [
      "Does the district maintain a centralized inventory system for flood relief supplies updated monthly?",
      "Is there a documented protocol detailing the strategic location of prepositioned resources within the district?",
      "Does the district have an exclusive distribution plan outlining the precise chain of custody for relief supplies?",
      "Are district-level distribution drills conducted to objectively measure resource mobilization speed?",
      "Is there a unique tracking system that records the exact quantity of supplies distributed during each flood event?",
      "Does the district conduct regular, independent audits of its relief supply storage facilities?",
      "Is there an objective post-distribution review process that evaluates the efficiency and transparency of resource allocation in the district?"
    ]
  },
  {
    title: "10. Inter-Agency Coordination and Command Structure Standard",
    questions: [
      "Has the district established a unified command center that integrates all local emergency agencies under a distinct DDMA framework?",
      "Is there a documented, district-specific protocol that assigns unique roles to each agency during flood emergencies?",
      "Does the district conduct regular inter-agency coordination meetings focused solely on flood response readiness?",
      "Is there a unique process for the DDMA to consolidate and review feedback from all participating agencies after a flood?",
      "Does the district employ a standardized decision-making protocol that is independent of state-level guidelines?",
      "Are there clearly defined, measurable performance indicators for inter-agency coordination maintained by the district?",
      "Has the district established an independent post-flood review committee to objectively evaluate the coordination framework?"
    ]
  },
  {
    title: "11. Community Liaison and Vulnerable Group Protection Standard",
    questions: [
      "Has the district appointed dedicated community liaison officers with clear mandates for flood response?",
      "Is there a documented procedure to objectively register and monitor vulnerable households in the district?",
      "Does the district maintain a unique database that categorizes vulnerable groups based on objective criteria?",
      "Is there an exclusive protocol for district DDMA to engage local community leaders in flood response planning?",
      "Are measurable community feedback mechanisms implemented at the district level to capture distinct issues?",
      "Does the district have a documented, targeted assistance plan that addresses the needs of vulnerable groups independently?",
      "Is there a formal, district-specific process for evaluating and updating community liaison activities after flood events?"
    ]
  },
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

      // Dropdown
      const select = document.createElement("select");
      select.name = `${sIndex + 1}.${qIndex + 1}`;
      // Add answer options
      for (let val of ["2","1.5","1","0.5","0"]) {
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

  // Add final submission button at the bottom
  const submitBtn = document.createElement("button");
  submitBtn.type = "button";
  submitBtn.textContent = "Final Submission";
  submitBtn.onclick = finalSubmit;
  form.appendChild(submitBtn);
}

// 2) Clear form + localStorage
function clearForm() {
  document.getElementById("assessmentForm").reset();
  localStorage.removeItem("assessmentData");
  alert("Form cleared and local storage removed.");
}

// 3) Save form to localStorage (optional)
function saveForm() {
  const formData = collectFormData();
  localStorage.setItem("assessmentData", JSON.stringify(formData));
  alert("Form data saved to local storage.");
}

// 4) Load form from localStorage (optional)
function loadForm() {
  const data = JSON.parse(localStorage.getItem("assessmentData") || "{}");
  if (!data.responses) {
    alert("No saved data found.");
    return;
  }
  // Fill in the text fields
  document.getElementById("districtName").value = data.districtName || "";
  document.getElementById("ceoDDMA").value = data.ceoDDMA || "";
  document.getElementById("departmentName").value = data.departmentName || "";
  document.getElementById("officerName").value = data.officerName || "";

  // Fill in the dropdowns
  Object.keys(data.responses).forEach(key => {
    let select = document.getElementsByName(key)[0];
    if (select) select.value = data.responses[key];
  });
  alert("Form data loaded from local storage.");
}

// Helper to gather all form data into an object
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
 * 5) Final submission: store data in GitHub (JSON file)
 *************************************************************/
async function finalSubmit() {
    const formData = {
        districtName: document.getElementById("districtName").value,
        ceoDDMA: document.getElementById("ceoDDMA").value,
        departmentName: document.getElementById("departmentName").value,
        officerName: document.getElementById("officerName").value,
        responses: {}
    };

    document.querySelectorAll("select").forEach(select => {
        formData.responses[select.name] = select.value;
    });

    try {
        const response = await fetch(`https://api.github.com/repos/mukucoder87/fpsc2/actions/workflows/main.yml/dispatches`, {
            method: "POST",
            headers: {
                "Authorization": `token SCORE_CARD_MASTER`,  // Using the GitHub Secret
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ref: "main",
                inputs: {
                    submission: JSON.stringify(formData)
                }
            })
        });

        if (response.ok) {
            alert("Form submitted! GitHub Actions will process the update.");
        } else {
            const errorData = await response.json();
            console.error("GitHub API Error:", errorData);
            alert("Error triggering GitHub Actions.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
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

  // Simple table for the latest submission
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
  let index = 0;
  standards.forEach((std, sIndex) => {
    let sum = 0;
    for (let q = 1; q <= std.questions.length; q++) {
      const key = `${sIndex + 1}.${q}`;
      sum += parseFloat(latestSubmission.responses[key] || "0");
      index++;
    }
    standardScores.push(sum);
  });

  // Create a bar chart for standard scores
  const barCtx = document.getElementById("barChart").getContext("2d");
  if (window.myBarChart) window.myBarChart.destroy();
  window.myBarChart = new Chart(barCtx, {
    type: "bar",
    data: {
      labels: standards.map((s, i) => "Std " + (i + 1)),
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
          // Max possible per standard is 7 questions × 2 = 14
          max: 14
        }
      }
    }
  });

  // Overall distribution (pie chart)
  let distributionCounts = { "2":0, "1.5":0, "1":0, "0.5":0, "0":0 };
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
        backgroundColor: ["#2ecc71","#f1c40f","#3498db","#9b59b6","#e74c3c"]
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
  html2canvas(document.getElementById("reportSection"), {scale: 2}).then(canvas => {
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
