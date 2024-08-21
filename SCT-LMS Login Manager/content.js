document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginbtn");
  
    if (loginButton) {
      loginButton.addEventListener("click", () => {
        chrome.runtime.sendMessage({ action: "startTimer" });
      });
    }
  });
  