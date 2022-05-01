import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Card } from 'react-bootstrap';
import { numberFormat } from "../utils/util"
import TabComponent from './TabComponent';
import LoadingComponent from '../utils/loading'
import { connectWallet, getCurrentWalletConnected, checkBalanceOwner, depositAmount, transferAmount, withdrawAmount, checkTotalBalance, bankContract } from '../utils/interact';
import './CardComponent.css'


export default function CardComponent() {

    const [walletAddress, setWalletAddress] = useState("");
    const [balance, setBalance] = useState(0);
    const [statusTransaction, setStatusTransaction] = useState(false);
    const [detailTran, setDetailTran] = useState("")
    const [status, setStatus] = useState("");
    const [totalBalance, setTotalBalance] = useState(0);
    const [loading, setLoading] = useState(false)
    const [loadingTotal, setLoadingTotal] = useState(false)

    useEffect(() => {
        async function fetchWallet() {
          const {address, status} = await getCurrentWalletConnected();
          setWalletAddress(address);
          setStatus(status); 
        }
        fetchWallet();
        checkTotalBank();
        addWalletListener();
    }, []);

    useEffect(() => {
        if (walletAddress) {   
            checkBalance(String(walletAddress));
        }
    }, [walletAddress])

    async function checkBalance(owner) {       
        setLoading(true)
        const balanceRes = await checkBalanceOwner(String(owner));
        setBalance(balanceRes)
        setLoading(false)
    }

    async function checkTotalBank() {
        setLoadingTotal(true)
        const totalBalanceRes = await checkTotalBalance();
        setTotalBalance(totalBalanceRes)
        setLoadingTotal(false)
    }
    
    async function connectWalletPressed () {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWalletAddress(walletResponse.address);
    };

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
                setWalletAddress(accounts[0]);
                setStatus("👆🏽 Write a message in the text-field above.");
            } else {
                setWalletAddress("");
            }
            });
        } else {
            setStatus(
            <p>
                {" "}
                🦊{" "}
                <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
                </a>
            </p>
            );
        }
    }


    function listenEvent(type) {
        bankContract.once(type, (error, result) => {
            if (result && result.returnValues) {
                const { owner } = result.returnValues
                checkBalance(String(owner));
                checkTotalBank()         
            }
        });
    }

    const deposit = async (amount) => {
        setLoading(true)
        setLoadingTotal(true)
        setStatusTransaction(true)
        const { status } = await depositAmount(String(walletAddress), amount);
        setDetailTran(status)
        await listenEvent("Deposit")
        
    }

    const transfer = async (addressTo, amount) => {
        setLoading(true)
        setStatusTransaction(true) 
        const { status } = await transferAmount(String(walletAddress), String(addressTo), amount);
        setDetailTran(status) 
        await listenEvent("Transfer")
    }

    const withdraw = async (amount) => {
        setLoading(true)       
        setLoadingTotal(true)
        setStatusTransaction(true)
        const {status} = await withdrawAmount(String(walletAddress), amount);
        setDetailTran(status)
        await listenEvent("Withdraw")
    }

    const tabComponentStatusTransaction = () => {
        return (
            <>
                {statusTransaction ?
                <>
                    {detailTran}
                    <div>
                        <Button variant="primary" onClick={() => setStatusTransaction(false)}>Transaction Again</Button>
                    </div>
                    
                </> 
                :  <TabComponent deposit={deposit} withdraw={withdraw} transfer={transfer} />} 
            </>
        )
    }

    const cardDetailComponent = () => {
        return (
            <>
                {walletAddress ? 
                    <>
                        <Card.Text>
                            <b>Address :</b> {walletAddress || <span className="text-error-i"> Not Connect</span>}                
                        </Card.Text>
                        {loading ? <article className="loading-position-i"><LoadingComponent/></article> 
                        : <Card.Title><b>Balance : {numberFormat(balance)}</b></Card.Title> }
                       
                        <article className="mt-3">
                            {tabComponentStatusTransaction()}
                        </article>
                    </>
                    :  <article>{status}</article>  
     
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
                            : <Button variant="primary" onClick={connectWalletPressed}>Connect Metamark</Button>}      
                    </Col>                     
                </Row>
            </Card.Header>
            <Card.Body className="py-3">
                {loadingTotal ? <article className="loading-position-i"><LoadingComponent/></article> 
                : <h4>Total Balance Bank : {numberFormat(totalBalance)}</h4>}       
                <br />
                {cardDetailComponent()}    
                {/* <p className="status-box-i">Recent Transaction History</p> */}            
            </Card.Body>
        </Card>
    )
}
