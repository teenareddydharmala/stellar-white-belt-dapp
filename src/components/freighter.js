import { isConnected, requestAccess, getAddress, signTransaction } from "@stellar/freighter-api";
import * as StellarSdk from "@stellar/stellar-sdk";

const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");
const networkPassphrase = StellarSdk.Networks.TESTNET;

export const checkConnection = async () => {
  const result = await isConnected();
  return result.isConnected; // freighter-api returns a boolean or object depending on version
};

export const retrievePublicKey = async () => {
  const accessObj = await requestAccess();
  if (accessObj.error) throw new Error(accessObj.error.message);
  return accessObj.address;
};

export const getPreciseData = async () => {
  const addressObj = await getAddress();
  if (addressObj.error) throw new Error(addressObj.error);
  
  const account = await server.loadAccount(addressObj.address);
  const xlmBalance = account.balances.find((b) => b.asset_type === "native");
  
  // Fetch History for your "Special Log"
  const payments = await server.payments()
    .forAccount(addressObj.address)
    .limit(10)
    .order("desc")
    .call();

  return {
    balance: xlmBalance ? xlmBalance.balance : "0.0000000",
    history: payments.records
  };
};

export const sendXLM = async (destination, amount) => {
  const addressObj = await getAddress();
  if (addressObj.error) throw new Error(addressObj.error.message);
  
  const sourcePublicKey = addressObj.address;
  const sourceAccount = await server.loadAccount(sourcePublicKey);
  
  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase,
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: destination,
        asset: StellarSdk.Asset.native(),
        amount: amount.toString(),
      })
    )
    .setTimeout(30)
    .build();

  const signedResult = await signTransaction(transaction.toXDR(), { networkPassphrase });
  if (signedResult.error) throw new Error(signedResult.error.message);

  // This step is crucial: Re-read the transaction from the signed XDR
  const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(signedResult.signedTxXdr, networkPassphrase);
  const res = await server.submitTransaction(signedTransaction);
  return res;
};