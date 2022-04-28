import React from "react";
import DepositWithdraw from "./DepositWithdraw"
import Transfer from "./Transfer"

export default function TabMainComponent(props) {
    const { mainShow } = props;

    return (
        <>
            {mainShow == 0 && <DepositWithdraw  />}
            {mainShow == 1 && <DepositWithdraw />}
            {mainShow == 2 && <Transfer />}
        </>
    )
}