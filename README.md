# 🥋 LuminaPay: Stellar White Belt dApp

**LuminaPay** is a high-precision decentralized application (dApp) built on the Stellar Testnet. Developed as part of the Stellar Level 1 challenge.



## 🌟 Key Features
* **Secure Identity Connection:** Seamlessly integrates with the **Freighter Wallet** API to authorize user sessions without exposing private keys.
* **High-Precision Asset Tracking:** Fetches and displays native XLM balances with full 7-decimal precision directly from the Horizon server, ensuring zero rounding errors.
* **Immutable Ledger History:** A custom transaction log ("Special Log") that records time, date, recipient, and transaction hash for every confirmed transfer.
* ** UI/UX:** A modern glassmorphic dashboard built with **React** and **Tailwind CSS v4**, featuring animated mesh gradients and high-fashion typography.

## 🛠️ Tech Stack
* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS v4
* **Blockchain Bridge:** `@stellar/stellar-sdk`
* **Wallet Integration:** `@stellar/freighter-api`
* **Network:** Stellar Testnet



## 🚀 Setup & Installation
Follow these steps to run LuminaPay in your local development environment:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/teenareddydharmala/stellar-white-belt-dapp.git](https://github.com/teenareddydharmala/stellar-white-belt-dapp.git)
    cd stellar-white-belt-dapp
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Launch Development Server:**
    ```bash
    npm run dev
    ```
4.  **Configure Wallet:**
    * Install the [Freighter Extension](https://www.freighter.app/).
    * Open Freighter Settings (gear icon) and toggle the network to **Testnet**.
    * Fund your account using the [Stellar Laboratory Friendbot](https://laboratory.stellar.org/#account-creator?network=testnet).

## 📸 Screenshots
*(Include your captures here to satisfy the submission checklist)*
* **Wallet Connected State:** Showing the authorized public key.
* **Balance Display:** Showing the high-precision, non-rounded XLM count.
* **Transaction Result:** Showing the "Protocol Confirmed" status and the Immutable Ledger History log.

## 📝 Development Journey Log
This project documents the transition from basic scripting to a full-stack dApp architecture. Key technical milestones included:
* **Horizon Sync:** Establishing a real-time data bridge for high-precision balance fetching.
* **Protocol Alignment:** Resolving `TypeError` and "2015 Public Network" warnings by implementing modern **Operation.payment** syntax and explicit **Testnet Passphrases**.


---
With love 💜 Teena
