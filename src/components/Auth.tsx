import React, { useState} from 'react';
import Form from 'react-bootstrap/Form';
import {Button, Col} from "react-bootstrap";

export const Auth = () => {
    return <>
        <Col xs={12} md={6} xl={4} className="offset-xl-4 offset-md-3 text-center">
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    minLength={3}
                    maxLength={50}
                    // defaultValue={}
                    // onChange={}
                    placeholder="Enter email"
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="text"
                    minLength={3}
                    maxLength={50}
                    // defaultValue={}
                    // onChange={}
                    placeholder="Enter password"
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Col>
    </>
};