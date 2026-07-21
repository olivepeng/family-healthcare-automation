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