// 用正則表達式從單行文字中拆解出體溫、藥物、時間、備註
// --- 定義正則表達式 ---
  const tempRegex = /([34]\d(\.\d)?)(?=\s*度|°C|(\s|$))/;
  // 這樣改：只有出現 ml、cc、塞劑、或是特定「退燒/感冒藥」的完整詞彙才會觸發
  const medRegex = /([^\s,，、]+?(\d+(ml|cc))|[^\s,，、]*塞劑|[^\s,，、]*(退燒藥|藥水|藥粉|感冒藥|依普芬|安佳熱))/i; 
  const timeRegex = /(\d{1,2}:\d{2})/;

function parseHealthRecord(userMessage, now) {

    userMessage = userMessage.trim();
    if (userMessage === "") return;

    // 【嚴格過濾邏輯】
    const hasValidTemp = tempRegex.test(userMessage.replace(timeRegex, "")); 
    const hasValidMed = medRegex.test(userMessage);
    const isManualRecord = userMessage.startsWith("紀錄");

    // 如果沒有體溫、沒有上述特定藥物/劑量，且也不是開頭寫「紀錄」 -> 直接跳過
    if (!hasValidTemp && !hasValidMed && !isManualRecord) {
      console.log(`已自動過濾純聊天訊息: ${userMessage}`);
      return null; 
    }

    if (isManualRecord) {
      userMessage = userMessage.replace(/^紀錄\s*/, "");
    }

    // 1. 時間解析
    let dateTime = Utilities.formatDate(now, "GMT+8", "MM/dd HH:mm");
    if (timeRegex.test(userMessage)) {
      const manualTime = userMessage.match(timeRegex)[1];
      const monthDay = Utilities.formatDate(now, "GMT+8", "MM/dd");
      dateTime = monthDay + " " + manualTime;
    }

    // 2. 內容解析
    let temperature = "-";
    let medicine = "無";
    let observation = userMessage;

    // 體溫抓取 (排除時間數字干擾)
    let tempProcessStr = userMessage.replace(timeRegex, "");
    if (tempRegex.test(tempProcessStr)) {
      const match = tempProcessStr.match(tempRegex);
      temperature = match[1];
      observation = observation.replace(match[0], "").replace(/度|°C/g, "").trim();
    } 

    // 藥物抓取
    if (medRegex.test(userMessage)) {
      const match = userMessage.match(medRegex);
      medicine = match[1];
      observation = observation.replace(match[1], "").trim();
    }

    // 3. 清理備註
    observation = observation.replace(/(\d{1,2}\/\d{1,2})/, "").replace(timeRegex, "").trim();
    //if (observation === "") observation = "無特別狀況";

    return {

        dateTime,

        temperature,

        medicine,

        observation

    };

}

function testParser() {

    const now = new Date();

    const tests = [

        "38.5 安佳熱6ml 剛睡醒",

        "37.2",

        "01:00 塞劑",

        "哥哥今天精神很好",

        "紀錄 哥哥開始流鼻水"

    ];

    tests.forEach(msg => {

        Logger.log("----------------");

        Logger.log(msg);

        Logger.log(parseHealthRecord(msg, now));

    });

}