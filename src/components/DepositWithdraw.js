import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import './DepositWithdraw.css'

export default function DepositWithdraw(props) {
    const [amount, setAmount] = useState(0);

    return (
        <div className='layout-deposit-i'>
            <Form className="mx-5">
                <Form.Group className="mb-3" >
                    <Form.Label>Amount</Form.Label>
                    <Form.Control value={amount} onChange={(e) => setAmount(e.target.value)} type="number" />
                </Form.Group>
                <section className='layout-button'>
                    <Button variant="primary" onClick={() => {}}>
                        Confirm
                    </Button>
                </section>
                                   
            </Form> 
        </div>
    )
}