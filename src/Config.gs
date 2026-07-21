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