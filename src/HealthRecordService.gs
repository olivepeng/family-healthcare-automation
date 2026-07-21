// 拆解多行訊息、逐行呼叫 Parser 解析，並透過傳入的 repository 存檔
function saveHealthRecords(fullMessage, repository) {

    const now = new Date();

    const lines = fullMessage.split("\n");

    const records = [];

    lines.forEach(line => {

        const record = parseHealthRecord(line, now);

        if (!record) {
            return;
        }

        repository.save(record);

        records.push(record);   // 收集起來
    });

    return records;
}