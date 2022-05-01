import React from "react";
import DepositWithdraw from "./DepositWithdraw"
import DepositWithdrawForm from "./DepositWithdrawForm"
import Transfer from "./Transfer"
import TransferForm from "./TransferForm"

export default function TabMainComponent(props) {
    const { deposit, withdraw, transfer, balance, balanceMetamark} = props
    const { mainShow } = props;

    return (
        <>
            {mainShow == 0 && <><DepositWithdraw  confirmButton={deposit} /><DepositWithdrawForm confirmButton={deposit} maxAmount={balanceMetamark}/></>}
            {mainShow == 1 && <><DepositWithdraw  confirmButton={withdraw} /><DepositWithdrawForm confirmButton={withdraw} maxAmount={balance}/></>}
            {mainShow == 2 && <><Transfer confirmButton={transfer} /><TransferForm confirmButton={transfer} maxAmount={balance}/></>}
        </>
    )
}