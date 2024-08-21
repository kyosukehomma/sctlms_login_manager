document.addEventListener("DOMContentLoaded", () => {
    const saveBtn = document.getElementById("saveBtn");
    const logoutTimeInput = document.getElementById("logoutTime");
    const errorMessage = document.getElementById("error-message");
    const maxTime = "08:00:00";
  
    // hh:mm:ss形式であるかどうかを検証する正規表現
    const timeFormat = /^([0-7]\d|08):([0-5]\d):([0-5]\d)$/;
  
    // 時間を秒に変換する関数
    function timeToSeconds(time) {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    }
  
    // 指定された位置での入力を制御する関数
    logoutTimeInput.addEventListener("input", (e) => {
      const value = e.target.value;
      const length = value.length;
  
      // エラーメッセージをリセット
      errorMessage.textContent = "";
  
      if (length === 3 || length === 6) {
        // 3,6文字目は半角コロンのみ許可
        if (value[length - 1] !== ":") {
          e.target.value = value.slice(0, -1); // コロン以外を削除
          errorMessage.textContent = "3rd and 6th characters must be ':'";
          console.log("Error: 3rd and 6th characters must be ':'");
        }
      } else {
        // 1,2,4,5,7,8文字目は半角数字のみ許可
        if (!/^\d$/.test(value[length - 1])) {
          e.target.value = value.slice(0, -1); // 数字以外を削除
          errorMessage.textContent = "Only digits are allowed in hh, mm, ss positions.";
          console.log("Error: Only digits are allowed in hh, mm, ss positions.");
        }
      }
    });
  
    // 保存された設定を読み込む
    chrome.storage.sync.get("logoutTime", ({ logoutTime }) => {
      if (logoutTime) {
        logoutTimeInput.value = logoutTime;
      } else {
        logoutTimeInput.value = "08:00:00"; // デフォルトの値
      }
    });
  
    // 保存ボタンがクリックされたときの処理
    saveBtn.addEventListener("click", () => {
      const logoutTime = logoutTimeInput.value;
  
      // 入力値の形式を検証
      if (!timeFormat.test(logoutTime)) {
        errorMessage.textContent = "Please enter a valid time in hh:mm:ss format.";
        console.log("Error: Please enter a valid time in hh:mm:ss format.");
        return;
      }
  
      // 入力された時間と最大値を秒単位で比較
      if (timeToSeconds(logoutTime) > timeToSeconds(maxTime)) {
        errorMessage.textContent = "Please enter a time less than or equal to 08:00:00.";
        console.log("Error: Please enter a time less than or equal to 08:00:00.");
        return;
      }
  
      // 入力が正しい場合に設定を保存し、メッセージを表示してウィンドウを閉じる
      chrome.storage.sync.set({ logoutTime }, () => {
        alert("Settings saved.");
        window.close();
      });
    });
  });
  