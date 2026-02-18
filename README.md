LuminaPay: White Belt Submission
Project Repository: stellar-white-belt-dapp

1. Project Description
LuminaPay is a decentralized application (dApp) built on the Stellar Testnet. It serves as a secure gateway for users to manage their digital assets with a focus on high-precision balance tracking and transparent transaction history. The project was developed to satisfy the Level 1 – White Belt requirements of the Stellar Developer Journey.

2. Key Features
Identity Connection: Seamlessly integrates with the Freighter Wallet to authorize sessions without exposing private keys.

High-Precision Balance: Fetches and displays native XLM balances down to seven decimal places directly from the Horizon server.

Immutable Ledger Log: A custom-built transaction history that records the date, time, recipient, and transaction hash for every successful transfer.

Cyber-Vogue UI: A modern, glassmorphic interface built with React and Tailwind CSS v4, featuring animated mesh gradients and ambient lighting.

3. Tech Stack
Framework: React (Vite)

Styling: Tailwind CSS v4

Blockchain SDK: @stellar/stellar-sdk

Wallet API: @stellar/freighter-api

Network: Stellar Testnet (Horizon)

4. Setup Instructions
To run LuminaPay locally, follow these steps:

Clone the Repository:

Bash
git clone https://github.com/YOUR_USERNAME/stellar-white-belt-dapp.git
cd stellar-white-belt-dapp
Install Dependencies:

Bash
npm install
Launch the Development Server:

Bash
npm run dev
Connect Wallet:

Ensure the Freighter extension is installed in your browser.

Set Freighter to Testnet in the settings menu.

Click "Initialize Connection" in the LuminaPay dashboard.
