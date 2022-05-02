import React from "react";
import DepositWithdrawForm from "./DepositWithdrawForm"
import TransferForm from "./TransferForm"

export default function TabMainComponent(props) {
    const { deposit, withdraw, transfer, balance, balanceMetamark} = props
    const { mainShow } = props;

    return (
        <>
            {mainShow == 0 && <><DepositWithdrawForm confirmButton={deposit} maxAmount={balanceMetamark}/></>}
            {mainShow == 1 && <><DepositWithdrawForm confirmButton={withdraw} maxAmount={balance}/></>}
            {mainShow == 2 && <><TransferForm confirmButton={transfer} maxAmount={balance}/></>}
        </>
    )
}