import React, { useState } from "react";
import { useForm, Controller  } from "react-hook-form";
import { numberFormat } from "../utils/util";
import { web3 } from '../utils/interact';

export default function DepositWithdrawForm (props) {

    const { confirmButton, maxAmount } = props

    const { register, formState: { errors }, handleSubmit } = useForm({
        mode: "onChange"
      });
      
    const [errorAddress, setErrorAddress] = useState(false)

    async function confirm(data) {
        const checkAddress = await (web3.utils.isAddress(data.address) && data.address !== "0x0000000000000000000000000000000000000000");
        if (checkAddress) {
            confirmButton(data.address, data.amount)
        } else {
            setErrorAddress(true)
        }     
    }

    const onSubmit = data => confirm(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("address", { required: true })} />
            <span> {errors.address && "Address must request"}</span>
            <span> {errorAddress && "is be Address and not Addess Zero"}</span>

            <input type="number" {...register("amount", { required: true, min: 0, max: maxAmount})} />
            <span> {errors.amount && `Amount must more 0 and less ${numberFormat(maxAmount)}`}</span>    

            <input type="submit" />
        </form>
    );
}