import React from "react";
import DepositWithdraw from "./DepositWithdraw"
import Transfer from "./Transfer"

export default function TabMainComponent(props) {
    const { deposit, withdraw, transfer} = props
    const { mainShow } = props;

    return (
        <>
            {mainShow == 0 && <DepositWithdraw  confirmButton={deposit} />}
            {mainShow == 1 && <DepositWithdraw confirmButton={withdraw} />}
            {mainShow == 2 && <Transfer confirmButton={transfer} />}
        </>
    )
}