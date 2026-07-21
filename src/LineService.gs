// 封裝所有對 LINE API 的呼叫：回覆訊息、群組/多人室退出
function reply(replyToken, text) {
  if (CONFIG.DEBUG) {
    Logger.log("====== Reply ======");
    Logger.log(text);
    Logger.log("==================");
    return;
  }

  try {
    const response = UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', {
      'method': 'post',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN,
      },
      'payload': JSON.stringify({
        'replyToken': replyToken,
        'messages': [{ 'type': 'text', 'text': text }]
      })
    });
    Logger.log(response.getContentText());
  } catch (e) {
    Logger.log("Reply failed: " + e);
  }
}

// --- 退出功能 (支援群組與多人聊天室) ---
function handleLeave(event, message) {

    if (message !== "機器人退出") {
      return false;
    }

    const source = event.source;
    let url = "";
    
    if (source.type === "group") {
      url = `https://api.line.me/v2/bot/group/${source.groupId}/leave`;
    } else if (source.type === "room") {
      url = `https://api.line.me/v2/bot/room/${source.roomId}/leave`;
    }
	
	if (CONFIG.DEBUG) {
		Logger.log("Leave URL = " + url);
		return true;  
	}

    if (url !== "") {
      const response = UrlFetchApp.fetch(url, {
        'method': 'post',
        'headers': { 'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN },
        'muteHttpExceptions': true
      });
      console.log("LINE 伺服器退出回傳: " + response.getContentText());
      reply(event.replyToken, "LINE 伺服器退出回傳: " + response.getContentText());
      return true;
    } else {
      reply(event.replyToken, "一對一聊天無法退出，請直接封鎖我喔！");
      return false;
    }
  return false;
}