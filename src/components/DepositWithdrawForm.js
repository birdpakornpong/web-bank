import React from "react";
import { useForm } from "react-hook-form";
import { numberFormat } from "../utils/util";
import './DepositWithdrawForm.css'

export default function DepositWithdrawForm (props) {
    const { confirmButton, maxAmount } = props

    const { register, formState: { errors }, handleSubmit } = useForm({
        mode: "onChange"
      });

    async function confirm(data) {
        confirmButton(data.amount)
    }

    const onSubmit = data => confirm(data);

    return (
        <div className='layout-deposit-form'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="text-label">Amount</label>
                <input className="input-custom" type="number" {...register("amount", { required: true, min: 1, max: maxAmount})} placeholder="Enter Amount" />
                <span className="error-text"> {errors.amount && `Amount must more 0 and less ${numberFormat(maxAmount)}`}</span>   
                <div className="layout-button">
                    <input type="submit" className="button-submit"/>
                </div>        
            </form>
        </div>
    );
}