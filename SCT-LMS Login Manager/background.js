let logoutTimer; // ログアウトのタイマーを格納する変数
let startTime;   // 計測開始時刻を格納する変数

// ログインページがロードされたときにタイマーを設定
chrome.webNavigation.onCompleted.addListener((details) => {
  if (details.url.includes("/login/index.php")) {
    chrome.scripting.executeScript({
      target: {tabId: details.tabId},
      func: startTimerOnLoginClick
    });
  }
}, {url: [{hostContains: 'sct-lms.com'}]}); // URLフィルタリングを追加

// ログインボタンがクリックされたときにタイマーを開始
function startTimerOnLoginClick() {
  document.getElementById("loginbtn").addEventListener("click", () => {
    chrome.storage.sync.get("logoutTime", ({ logoutTime }) => {
      const [hours, minutes, seconds] = logoutTime.split(":").map(Number);
      const logoutTimeInSeconds = (hours * 3600 + minutes * 60 + seconds) - 1; // 1秒前にログアウト

      // 現在の時刻を取得し、タイマー開始時刻を記録
      startTime = new Date().getTime();
      
      // 現在の時刻をalertで表示
      alert(`SCT-LMS Login Manager started at: ${new Date(startTime).toLocaleString()}`);

      chrome.runtime.sendMessage({action: "startTimer", time: logoutTimeInSeconds});
    });
  });
}

// メッセージを受け取ってタイマーを開始
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTimer") {
    clearTimeout(logoutTimer); // 既存のタイマーがあればクリア

    // タイマーの待機時間が負の場合は即座に実行
    const timeoutDuration = Math.max(0, message.time * 1000);

    logoutTimer = setTimeout(() => {
      // タイマー開始時刻と経過時間をログに出力（デバッグ用）
      // console.log(`Start Time: ${new Date(startTime).toISOString()}`);
      // console.log(`Current Time: ${new Date().toISOString()}`);
      
      // ログアウト処理を開始
      handleLogoutAndContinue();
    }, timeoutDuration);
  }
});

// ログアウト処理とボタンクリックを管理
function handleLogoutAndContinue() {
  chrome.tabs.query({url: "https://sct-lms.com/*"}, (tabs) => {
    // タブをリロード
    tabs.forEach(tab => chrome.tabs.reload(tab.id));

    // 既存のタブでログアウトページに遷移
    chrome.tabs.query({url: "https://sct-lms.com/login/logout.php*sesskey=xeYaFHbFlo"}, (existingTabs) => {
      if (existingTabs.length > 0) {
        // 既に開いているタブがあれば、そのタブを使用
        const existingTab = existingTabs[0];
        chrome.tabs.update(existingTab.id, { url: "https://sct-lms.com/login/logout.php?sesskey=xeYaFHbFlo" }, () => {
          // ログアウトページが開かれてから0.5秒後にボタンクリックを実行
          setTimeout(() => clickContinueButton(existingTab.id), 500); // 0.5秒の遅延
        });
      } else {
        // 既存のタブがない場合は、新しいタブを開く
        chrome.tabs.create({url: "https://sct-lms.com/login/logout.php?sesskey=xeYaFHbFlo"}, (newTab) => {
          // ログアウトページが開かれてから0.5秒後にボタンクリックを実行
          setTimeout(() => clickContinueButton(newTab.id), 500); // 0.5秒の遅延
        });
      }
    });
  });
}

// 「続ける」ボタンをクリックしてタブを閉じる処理
function clickContinueButton(tabId) {
  chrome.scripting.executeScript({
    target: {tabId: tabId},
    func: () => {
      const buttons = document.querySelectorAll('button');
      for (const button of buttons) {
        if (button.textContent.includes("続ける")) {
          button.click();
          // ボタンをクリックしたら0.5秒後にタブを閉じる
          setTimeout(() => chrome.tabs.remove(tabId), 500);
          return;
        }
      }
      console.log("Button with text '続ける' not found");
    }
  });
}

// ウィンドウやタブが閉じられたときにタイマーをクリア
chrome.windows.onRemoved.addListener(() => {
  clearTimeout(logoutTimer);
});

chrome.tabs.onRemoved.addListener(() => {
  clearTimeout(logoutTimer);
});
