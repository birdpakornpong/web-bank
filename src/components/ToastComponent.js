import React from 'react'
import { ToastContainer, Toast } from 'react-bootstrap';
import './ToastComponent.css'

export default function ToastComponent(props) {
    const { show, setShow, events } = props

    return (
        <div
            aria-live="polite"
            aria-atomic="true"
            className="bg-dark toast-i"
            style={{ minHeight: '240px' }}
            >
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShow(false)} show={show} delay={10000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">{events.event}</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>
                         <p>test</p>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
  )
}
