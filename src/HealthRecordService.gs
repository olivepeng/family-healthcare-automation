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