function doPost(e) {
  const json = JSON.parse(e.postData.contents);
  const event = json.events[0];
  
  if (event.type !== 'message' || event.message.type !== 'text') return;
  
  const fullMessage = event.message.text.trim();

  // --- 退出功能 (支援群組與多人聊天室) ---
  if (handleLeave(event, fullMessage)) {
    return;
  }
  
  const result = saveHealthRecords(fullMessage,SheetRepository);
  
  // 統一回傳一次結果
  if (result.length > 0) {
    reply(event.replyToken, buildReplyMessage(result));
  }
}

function buildReplyMessage(records) {

    let summary = "";

    records.forEach(record => {
        summary +=
            `\n• ${record.dateTime} / ${record.temperature}°C / ${record.medicine}`;
    });

    return `✅ 已成功紀錄 ${records.length} 筆資料：${summary}`;
}

function webhookTest() {

  const event = {
    postData: {
      contents: JSON.stringify({
        events: [{
          type: "message",
          replyToken: "TEST_REPLY_TOKEN",
          message: {
            type: "text",
            text: "38.5 安佳熱6ml"
          }
        }]
      })
    }
  };

  doPost(event);
}