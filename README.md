# Family Healthcare Automation

> A serverless healthcare record automation project built with Google Apps Script, LINE Messaging API, and Google Sheets.

I built this project to simplify recording children's health conditions during illness. Instead of manually writing temperatures and medications, family members can send messages through LINE, and the records are automatically organized into Google Sheets.

Users can simply send health records through LINE, and the system automatically parses the message, stores structured data into Google Sheets, and replies with a confirmation message.

![Platform](https://img.shields.io/badge/Platform-Google%20Apps%20Script-34A853?logo=google)
![Language](https://img.shields.io/badge/Language-JavaScript-F7DF1E?logo=javascript&logoColor=black)
![API](https://img.shields.io/badge/API-LINE%20Messaging%20API-00C300?logo=line)
![Storage](https://img.shields.io/badge/Storage-Google%20Sheets-34A853?logo=googlesheets)

---

## Contents

- [Demo](#demo)
- [Highlights](#highlights)
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Testing](#testing)
- [Design Decisions](#design-decisions)
- [Security](#security)
- [Future Improvements](#future-improvements)
- [Technologies](#technologies)
- [What I Learned](#what-i-learned)
- [About the Author](#about-the-author)
- [License](#license)

---

## Demo

### LINE Bot

Users can send one or multiple health records in a single message.

![LINE Demo](images/line-demo.png)

---

### Google Sheets

Every valid record is automatically stored in Google Sheets.

![Google Sheet](images/google-sheet.png)

---

### Google Apps Script Project

Project source code is organized into independent layers for maintainability.

![Apps Script](images/apps-script.png)

---

## Highlights

- LINE Messaging API integration
- Google Apps Script Web App
- Google Sheets integration
- Automatic health record parsing
- Multi-line message support
- Integration testing
- Layered architecture

---

## Overview

Users simply send health records through LINE.

The system automatically:

- Parses each record
- Extracts temperature, medication, and observations
- Stores structured data in Google Sheets
- Replies with a confirmation message

The project is completely serverless and runs on Google Apps Script.

---

## Features

### Health Record Parsing

Supports:

- Temperature
- Medication
- Dosage
- Observation
- Time
- Multiple records

Example:

```text
2:00 38°C 塞劑 剛睡醒
6:30 37.8 依普芬5ml
```

↓

```text
Record 1
Time: 2:00
Temperature: 38
Medicine: 塞劑
Observation: 剛睡醒

Record 2
Time: 6:30
Temperature: 37.8
Medicine: 依普芬5ml
```

---

### LINE Bot

- Receive messages
- Parse records
- Save to Google Sheets
- Reply automatically

---

### Google Sheets

Automatically appends new rows.

Example:

| Time | Temperature | Medicine | Observation |
|------|-------------|-----------|-------------|
|07/21 02:00|38|塞劑|剛睡醒|
|07/21 06:30|37.8|依普芬5ml||

---

## Architecture

```mermaid
flowchart TD

A[LINE User] --> B[LINE Messaging API]
B --> C[Webhook.gs]
C --> D[HealthRecordService.gs]
D --> E[Parser.gs]
D --> F[SheetRepository.gs]
F --> G[(Google Sheets)]
C --> H[LineService.gs]
H --> I[LINE Reply]
```

---

### Project Structure

```text
family-healthcare-automation/
│
├── src/
│   ├── Config.gs
│   ├── Webhook.gs
│   ├── LineService.gs
│   ├── HealthRecordService.gs
│   ├── Parser.gs
│   └── SheetRepository.gs
│
├── tests/
│   └── Debug.gs
│
├── images/
│   ├── line-demo.png
│   ├── google-sheet.png
│   └── apps-script.png
│
├── README.md
├── LICENSE
└── .gitignore
```

---

## Layered Design

```
Presentation Layer
│
├── Webhook.gs
└── LineService.gs

Business Layer
│
└── HealthRecordService.gs

Parsing Layer
│
└── Parser.gs

Data Layer
│
└── SheetRepository.gs

Configuration
│
└── Config.gs
```

Each layer has a single responsibility, making the project easier to maintain and test.

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/olivepeng/family-healthcare-automation.git
```

---

### 2. Open Google Apps Script

Create a new Google Apps Script project.

Copy all `.gs` files from the `src/` directory into your Apps Script project.

If you want to run the provided test utilities, also copy the files under the `tests/` directory.

---

### 3. Configure Script Properties

Create the following Script Property:

| Key | Value |
|------|------|
|LINE_ACCESS_TOKEN|Your LINE Messaging API Channel Access Token|

---

### 4. Deploy Web App

Deploy as:

```
Execute as:
Me

Who has access:
Anyone
```

---

### 5. Configure LINE Webhook

Paste the deployed Web App URL into the LINE Messaging API Webhook URL.

Enable:

- Webhook
- Use Webhook

Disable:

- Auto Reply

---

## Testing

The project includes unit and integration tests, runnable directly from the Apps Script editor:

| Function | Type | Verifies |
|----------|------|----------|
|`testParseHealthRecord()`|Unit|Parser output for known inputs (temperature, medicine, observation-only, noise)|
|`testParser()`|Unit|`parseHealthRecord()` against a range of sample messages|
|`integrationTest()`|Integration|`saveHealthRecords()` end-to-end against a mock repository, across 6 scenarios|
|`integrationTestLeave()`|Integration|`handleLeave()` group-leave behavior|
|`webhookTest()`|Integration|`doPost()` with a mock LINE webhook payload|
|`debugTest()`|Integration|Full webhook flow with a multi-line health record message|

To simulate a full LINE webhook request end-to-end, run:

```javascript
debugTest();
```

The test will:

- Create a mock LINE webhook event
- Execute the webhook handler
- Parse health records
- Save records into Google Sheets
- Verify the end-to-end workflow

---

## Design Decisions

| Decision | Reason |
|----------|--------|
|Layered Architecture|Separate responsibilities|
|Repository Pattern|Decouple storage from business logic|
|Script Properties|Protect API credentials|
|Google Sheets|Simple cloud storage|
|Google Apps Script|Serverless deployment|
|LINE Bot|Easy access for family members|

---

## Security

The repository does **NOT** contain:

- LINE Channel Access Token
- Personal health records
- Environment variables

Sensitive data is stored in:

Google Apps Script → Script Properties

---

## Future Improvements

- [ ] Export CSV
- [ ] Data visualization

---

## Technologies

| Category | Technology |
|-----------|------------|
|Language|JavaScript (ES6)|
|Platform|Google Apps Script|
|Messaging|LINE Messaging API|
|Storage|Google Sheets|
|Version Control|Git|
|Repository|GitHub|

---

## What I Learned

Through this project, I gained experience with:

- REST API integration
- Google Apps Script development
- LINE Messaging API
- Layered architecture
- Repository pattern
- Regular expression parsing
- Integration testing
- Git version control
- Secure configuration management

---

## About the Author

**Olive Peng**

Software Engineer interested in:

- Test Automation
- SDET
- CI/CD
- Android Development
- Software Quality

---

## License

This project is licensed under the MIT License.
