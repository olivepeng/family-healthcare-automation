// 負責把單筆健康紀錄寫入 Google Sheets，是 saveHealthRecords 預設的 repository 實作
const SheetRepository = {

  save(record) {

    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getActiveSheet();

    sheet.appendRow([
      record.dateTime,
      record.temperature,
      record.medicine,
      record.observation
    ]);

  }

};