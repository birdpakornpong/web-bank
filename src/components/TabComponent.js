import React, { useEffect, useState } from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TabMainComponent from "./TabMainComponent";

export default function TabComponent(props) {
    const { deposit, withdraw, transfer} = props
    const [key, setKey] = useState('deposit');

    const dataHeader = [
        {
            title: "Deposit",
            eventKey: "deposit"
        },
        {
            title: "Withdraw",
            eventKey: "withdraw"
        },
        {
            title: "Transfer",
            eventKey: "transfer"
        }
    ]
    
    return (
        <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            {dataHeader.map((item, index) => {
                return  <Tab eventKey={item.eventKey} title={item.title} key={index}>
                            <TabMainComponent mainShow={index} deposit={deposit} withdraw={withdraw} transfer={transfer} />
                        </Tab>           
            })}
            
        </Tabs>
    );
}