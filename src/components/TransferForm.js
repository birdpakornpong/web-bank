import React, { useState } from "react";
import { useForm, Controller  } from "react-hook-form";
import { numberFormat } from "../utils/util";
import { web3 } from '../utils/interact';
import './DepositWithdrawForm.css'

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
        <div className='layout-deposit-form'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="text-label">Address</label>
                <input  className={errors.amount || errorAddress ? "input-custom-error" : "input-custom"} {...register("address", { required: true })} placeholder="Enter Address"/>
                <span className="error-text"> {errors.address && "Address must request"}</span>
                <span className="error-text"> {errorAddress && "is be Address and not Addess Zero"}</span>
                
                <label className="text-label">Amount</label>
                {/* <input className="input-custom" type="number" {...register("amount", { required: true, min: 1, max: maxAmount})} placeholder="Enter Amount"/> */}
                <input className={errors.amount ? "input-custom-error" : "input-custom"} type="number" {...register("amount", { required: true, min: 1, max: maxAmount})} placeholder="Enter Amount"/>
                <span className="error-text"> {errors.amount && `Amount must more 0 and less ${numberFormat(maxAmount)}`}</span>    
                <div className="layout-button">
                    <input type="submit" className="button-submit"/>
                </div>  
            </form>
        </div>
    );
}