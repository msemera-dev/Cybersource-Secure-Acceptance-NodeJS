# Cybersource-Secure-Acceptance-NodeJS
A conversion of Cybersource Secure Acceptance Hosted Checkout from PHP to NodeJS

Payment Gateway functions

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Run npm install to get packages

```
npm install
```

### Initializing

A step by step series of examples that tell you how to get a development env running

Set your origin from where you'll access these functions

```
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "POST, GET" 
    })
);
```

Run these functions in you localhost by running this in your VSCODE terminal
```
node index.js
```

### Don't forget to add your SECRET_KEY, ACCESS_KEY, and PROFILE_ID in 'util/constants.js'.


You can use postman to send your request or if you have a dedicated client.  Good luck!