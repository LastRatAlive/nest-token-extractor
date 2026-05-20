document.addEventListener("DOMContentLoaded", () => {
  const extractBtn = document.getElementById("extract_btn");
  const envSelect = document.getElementById("env_select");
  const statusArea = document.getElementById("status_area");
  const closeWarning = document.getElementById("close_warning");

  const chromeWarning = document.getElementById("chrome_warning");
  const firefoxWarning = document.getElementById("firefox_warning");

  const googleSection = document.getElementById("google_section");
  const issueTokenField = document.getElementById("issue_token");
  const cookiesField = document.getElementById("cookies");

  const legacySection = document.getElementById("legacy_section");
  const accessTokenField = document.getElementById("access_token");

  let pollInterval = null;

  // Browser detection for warnings
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes("firefox")) {
    if (firefoxWarning) firefoxWarning.style.display = "block";
  } else if (userAgent.includes("chrome") || userAgent.includes("chromium") || userAgent.includes("edg")) {
    if (chromeWarning) chromeWarning.style.display = "block";
  }

  function setStatus(msg, type) {
    statusArea.innerHTML = `<div class="status ${type}">${msg}</div>`;
  }

  function startPolling() {
    stopPolling();
    pollInterval = setInterval(() => {
      chrome.runtime.sendMessage({ action: "getStatus" }, (r) => {
        if (r) updateUI(r);
      });
    }, 1000);
  }

  function stopPolling() {
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  }

  function updateUI(data) {
    let foundSomething = false;

    // Display Google data if available
    if (data.issueToken || data.cookies) {
      googleSection.style.display = "block";
      issueTokenField.value = data.issueToken || "";
      cookiesField.value = data.cookies || "";
      foundSomething = true;
    }

    // Display Legacy data if available
    if (data.accessToken) {
      legacySection.style.display = "block";
      accessTokenField.value = data.accessToken;
      foundSomething = true;
    }

    if (foundSomething) {
      extractBtn.disabled = false;
      extractBtn.textContent = "Restart Extraction";
      envSelect.disabled = false;
      closeWarning.style.display = "block";
      setStatus("Credentials captured! Copy the needed fields below.", "success");
    } else if (data.listening) {
      extractBtn.disabled = true;
      envSelect.disabled = true;
      extractBtn.textContent = "Waiting for login...";
      setStatus("Waiting for credentials... Please sign in on the opened Nest tab.", "info");
    }
  }

  // Check state on popup load
  chrome.runtime.sendMessage({ action: "getStatus" }, (r) => {
    if (r && (r.issueToken || r.cookies || r.accessToken)) {
      updateUI(r);
    } else if (r && r.listening) {
      updateUI(r);
      startPolling();
    }
  });

  // Start Extractor
  extractBtn.addEventListener("click", () => {
    extractBtn.disabled = true;
    envSelect.disabled = true;
    extractBtn.textContent = "Starting...";
    
    googleSection.style.display = "none";
    legacySection.style.display = "none";
    closeWarning.style.display = "none";
    issueTokenField.value = "";
    cookiesField.value = "";
    accessTokenField.value = "";

    const env = envSelect.value;
    const domainName = env === "ft" ? "home.ft.nest.com" : "home.nest.com";

    chrome.runtime.sendMessage({ action: "reset" }, () => {
      chrome.runtime.sendMessage({ action: "startCapture", env: env }, () => {
        setStatus(`Opening ${domainName}... Sign in if needed. Extraction runs automatically.`, "info");
        startPolling();
      });
    });
  });

  // Setup generic copy buttons
  document.querySelectorAll(".btn-copy").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const targetId = e.target.getAttribute("data-target");
      const el = document.getElementById(targetId);
      if (el && el.value) {
        navigator.clipboard.writeText(el.value).then(() => {
          const originalText = e.target.textContent;
          e.target.textContent = "Copied!";
          setTimeout(() => {
            e.target.textContent = originalText;
          }, 2000);
        });
      }
    });
  });
});
