// Function to fetch JSON data and render the resume
async function loadResume() {
  try {
    const response = await fetch("resume.json");
    const data = await response.json();

    // Call function to render the resume
    renderResume(data);
  } catch (error) {
    console.error("Error loading resume data:", error);
  }
}

function renderResume(data) {
  // Get Sections
  const heading = document.getElementById("heading");
  const main = document.getElementById("main");
  const mainLeft = document.getElementById("mainLeft");
  const mainRight = document.getElementById("mainRight");

  // Create Sections
  const headerSection = document.createElement("section");
  const infoSection = document.createElement("section");
  const summarySection = document.createElement("section");
  const skillsSection = document.createElement("section");
  const workHistorySection = document.createElement("section");
  const educationSection = document.createElement("section");
  const certificationsSection = document.createElement("section");
  const accoladesSection = document.createElement("section");
  const homelabSection = document.createElement("section");
  const personalSection = document.createElement("section");

  // Load Info data
  const info = data.info;

  // Build Header section
  headerSection.setAttribute("id", "header");
  headerSection.innerHTML = `
    <h1>
        ${info.name}
    </h1>
    <hr />
        <h2>${info.title}</h2>
    <hr />
    `;

  // Build Info section
  infoSection.setAttribute("id", "info");
  infoSection.innerHTML = `
        <p class="siteLink">
        ${info.sites
          .map(
            (site) =>
              `<i class="${site.icon}"></i>
                <a href="${site.link}" target="_blank" class="siteLink">${site.name}</a>`
          )
          .join(" || ")}
        </p>
    `;

  // Build Summary section
  summarySection.setAttribute("id", "summary");
  summarySection.innerHTML = `<h2>Summary</h2><p>${data.summary}</p>`;

  // Build Skills section
  skillsSection.setAttribute("id", "skills");
  skillsSection.innerHTML = `<h2 class="sub">Skills</h2><ul>${data.skills
    .map((skill) => `<li>${skill}</li>`)
    .join("")}</ul>`;

  // Build Work History section
  workHistorySection.setAttribute("id", "workHistory");
  workHistorySection.innerHTML = `<h2 class="sub">Work History</h2>`;
  data.workHistory.forEach((job) => {
    workHistorySection.innerHTML += `
            <div>
                <h3>${job.title} - ${job.company}</h3>
                <p>${job.location} || ${job.startDate} - ${job.endDate}</p>
                <ul>${job.contributions
                  .map((contribution) => `<li>${contribution}</li>`)
                  .join("")}</ul>
            </div>
        `;
  });

  // Build Education section
  educationSection.setAttribute("id", "education");
  educationSection.innerHTML = `<h2 class="sub">Education</h2>`;
  data.education.forEach((edu) => {
    educationSection.innerHTML += `
            <div>
                <h3>${edu.degree}</h3>
                <p>${edu.institution}, ${edu.location} (${edu.startDate} - ${
      edu.endDate || edu.expectedGraduation
    })</p>
            </div>
        `;
  });

  // Build Certifications section
  certificationsSection.setAttribute("id", "certifications");
  certificationsSection.innerHTML = `<h2 class="sub">Certifications</h2><ul>${data.certifications
    .map((cert) => `<li>${cert.name} (${cert.date})</li>`)
    .join("")}</ul>`;

  // Build Accolades section
  accoladesSection.setAttribute("id", "accolades");
  accoladesSection.innerHTML = `<h2 class="sub">Accolades</h2><ul>${data.accolades
    .map((accolade) => `<li>${accolade.name} (${accolade.date})</li>`)
    .join("")}</ul>`;

  // Build Homelab section
  homelabSection.setAttribute("id", "homelab");
  homelabSection.innerHTML = `<h2 class="sub">Homelab</h2><ul>${data.homelab
    .map((item) => `<li>${item}</li>`)
    .join("")}</ul>`;

  // Build Personal section
  personalSection.setAttribute("id", "personal");
  personalSection.innerHTML = `<h2 class="sub">Personal</h2>`;
  data.personal.forEach((item) => {
    personalSection.innerHTML += `
            <div>
                <h3>${item.title}</h3>
                <p>${item.organization} (${item.startDate} - ${item.endDate})</p>
            </div>
        `;
  });

  // Append sections to Header
  heading.appendChild(headerSection);
  heading.appendChild(infoSection);
  heading.appendChild(summarySection);

  // Append sections to Main
  mainRight.appendChild(skillsSection);
  mainLeft.appendChild(workHistorySection);
  mainRight.appendChild(educationSection);
  mainRight.appendChild(certificationsSection);
  mainRight.appendChild(accoladesSection);
  mainRight.appendChild(homelabSection);
  mainRight.appendChild(personalSection);
}

// Load resume on page load
loadResume();
