// 集中管理全域設定與機密憑證（LINE Token 從 Script Properties 讀取，不寫死在程式碼）
const CONFIG = {
  DEBUG: false,
  TIME_ZONE: "GMT+8",
  SOURCE: "LINE Bot"
};

const LINE_ACCESS_TOKEN =
PropertiesService.getScriptProperties()
.getProperty("LINE_ACCESS_TOKEN");

function testConfig() {
  Logger.log(LINE_ACCESS_TOKEN);
}