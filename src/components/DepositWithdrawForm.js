import React from "react";
import { useForm } from "react-hook-form";
import { numberFormat } from "../utils/util";

export default function DepositWithdrawForm (props) {
    const { confirmButton, maxAmount } = props

    const { register, formState: { errors }, handleSubmit } = useForm();

    async function confirm(data) {
        confirmButton(data.amount)
    }
    console.log('maxAmount', maxAmount)
    const onSubmit = data => confirm(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <input type="number" {...register("amount", { required: true, min: 0, max: maxAmount})} />
        <span> {errors.amount && `Amount must more 0 and less ${numberFormat(maxAmount)}`}</span>    

        {/* <input {...register("address", { required: true })} />
        <span> {errors.address && "Address must request"}</span> */}

        <input type="submit" />
        </form>
    );
}