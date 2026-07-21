// 這是專門用來測試的「模擬功能」
function debugTest() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        events: [{
          type: 'message',
          replyToken: 'test-token',
          message: { 
            type: 'text', 
            text: `38.5 安佳熱6ml 剛睡醒\n
37.8 依普芬5ml` // 這裡可以改你想測試的文字
          },
          source: { userId: 'user-123' }
        }]
      })
    }
  };
  
  // 執行主程式
  doPost(mockEvent);
}


function testParseHealthRecord() {

  const now = new Date();

  const cases = [
    {
      input: "38.5 安佳熱6ml 剛睡醒",
      expected: {
        temperature: "38.5",
        medicine: "安佳熱6ml"
      }
    },
    {
      input: "哥哥今天精神很好",
      expected: null
    },
    {
      input: "紀錄 哥哥開始流鼻水",
      expected: {
        observation: "哥哥開始流鼻水"
      }
    }
  ];

  cases.forEach(testCase => {

    const result = parseHealthRecord(testCase.input, now);

    if (testCase.expected == null) {

      if (result != null) {
        throw new Error("❌ Expected null");
      }

      Logger.log("✅ PASS : " + testCase.input);
      return;
    }

    Object.keys(testCase.expected).forEach(key => {

      if (result[key] !== testCase.expected[key]) {

        throw new Error(
          "❌ FAIL\n" +
          "Input : " + testCase.input +
          "\nField : " + key +
          "\nExpected : " + testCase.expected[key] +
          "\nActual : " + result[key]
        );

      }

    });

    Logger.log("✅ PASS : " + testCase.input);

  });

}


function createMockEvent(message) {

  return {
    postData: {
      contents: JSON.stringify({
        events: [{
          type: "message",
          replyToken: "debug-token",
          message: {
            type: "text",
            text: message
          },
          source: {
            type: "user",
            userId: "U123"
          }
        }]
      })
    }
  };

}


function integrationTest() {

  const cases = [

    {
      name: "單筆體溫",
      input: "38.5",
      expectedCount: 1,
      verify(records) {
        return records[0].temperature === "38.5";
      }
    },

    {
      name: "體溫+藥物",
      input: "38.5 安佳熱6ml",
      expectedCount: 1,
      verify(records) {
        return records[0].temperature === "38.5"
            && records[0].medicine === "安佳熱6ml";
      }
    },

    {
      name: "多筆",
      input: "38.5\n37.8",
      expectedCount: 2,
      verify(records) {
        return records.length === 2;
      }
    },

    {
      name: "Observation",
      input: "紀錄 哥哥流鼻水",
      expectedCount: 1,
      verify(records) {
        return records[0].observation === "哥哥流鼻水";
      }
    },

    {
      name: "Noise",
      input: "哥哥今天很好",
      expectedCount: 0,
      verify(records) {
        return records.length === 0;
      }
    },

    {
      name: "空白行",
      input: "\n\n38.5",
      expectedCount: 1,
      verify(records) {
        return records.length === 1;
      }
    }

  ];

  const MockRepository = {

    records: [],

    save(record) {
      this.records.push(record);
    },

    clear() {
      this.records = [];
    }

  };

  Logger.log("==============================");

  cases.forEach(testCase => {
    MockRepository.clear();

    const records = saveHealthRecords(testCase.input, MockRepository);

    const pass =
      records.length === testCase.expectedCount
      && testCase.verify(records);

    Logger.log(
      `${pass ? "✅ PASS" : "❌ FAIL"} ${testCase.name}`
    );

    if (!pass) {

      Logger.log("Input:");
      Logger.log(testCase.input);

      Logger.log("Actual:");
      Logger.log(JSON.stringify(records));

    }

  });

  Logger.log("==============================");
}

function integrationTestLeave() {

    const event = {
        source: {
            type: "group",
            groupId: "123"
        }
    };

    const result =
        handleLeave(event, "機器人退出");

    if(result){

        Logger.log("✅ PASS Leave");

    }else{

        Logger.log("❌ FAIL Leave");

    }

}

