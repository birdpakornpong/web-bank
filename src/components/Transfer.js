import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import './Transfer.css'

export default function Transfer(props) {
    const [addressTo, setAddressTo] = useState("");
    const [amount, setAmountTrans] = useState(0);

    const { confirmButton } = props

    async function confirm () {
        confirmButton(addressTo, amount)
    }

    return (
        <div className='layout-deeposit'>
            <Form className="mx-5">
                <Form.Group className="mb-3" >
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="Enter Address" type="text" value={addressTo} onChange={(e) => setAddressTo(e.target.value)} />                    
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Amount</Form.Label>
                    <Form.Control placeholder="Enter Amount" value={amount} onChange={(e) => setAmountTrans(e.target.value)} type="number" />
                </Form.Group>
                <section className='layout-button'>
                    <Button variant="primary" onClick={confirm}>
                        Confirm
                    </Button>
                </section>
                                   
            </Form> 
        </div>
    )
}
