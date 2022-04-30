import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Card } from 'react-bootstrap';
import { numberFormat } from "../utils/util"
import TabComponent from './TabComponent';
import './CardComponent.css'


export default function CardComponent() {

    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState(0);
    const [statusTransaction, setStatusTransaction] = useState(true);


    const tabComponentStatusTransaction = () => {
        return (
            <>
                {statusTransaction ?
                <>
                    <p>status</p>
                    <Button variant="primary" onClick={() => {}}>Again</Button>
                </> 
                : 
                <>
                    <TabComponent />
                </>} 
            </>
        )
    }
    
    const cardDetailComponent = () => {
        return (
            <>
                {walletAddress ? 
                    <>
                        <Card.Title><b>Balance : {numberFormat(balance)}</b></Card.Title> 
                        <article>
                            {tabComponentStatusTransaction()}
                        </article>
                    </>
                    : 
                    <>
                        <article>
                            <span>
                                <p>           
                                    <a target="_blank" href={`https://metamask.io/download.html`}>
                                        You must install Metamask, a virtual Ethereum wallet, in your
                                        browser.
                                    </a>
                                </p>
                            </span>
                        </article>  
                        <article>
                            <p>Connect to Metamask using the top right button.</p>
                        </article>
                    </>        
                }  
            </>
        )
    }
    return (
        <Card style={{ borderRadius: '20px', width: '52em' }}> 
            <Card.Header>
                <Row>
                    <Col xs="7" className="py-1 px-4 mt-1 name-header-i">
                        <h4>Simple Bank Web With Blockchain</h4>
                    </Col>  
                    <Col xs="5" className="mt-2 px-4 card-hearder-i">
                        { walletAddress ? 
                            <Button variant="success">Online</Button>
                            : <Button variant="primary" onClick={() => {}}>Connect Metamark</Button>}      
                    </Col>                     
                </Row>
            </Card.Header>
            <Card.Body className="py-5">
                <Card.Text>
                    <b>Address :</b> {walletAddress || <span className="text-error-i"> Not Connect</span>}                
                </Card.Text>
                <br />
                {cardDetailComponent()}    
                {/* <p className="status-box-i">Recent Transaction History</p> */}                 
            </Card.Body>
        </Card>
    )
}
