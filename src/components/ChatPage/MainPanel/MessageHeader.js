import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {FaLock} from 'react-icons/fa';
import {MdFavorite} from 'react-icons/md';
import {AiOutlineSearch} from 'react-icons/ai';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';




function MessageHeader() {
    return (
        <div style={{
            width: '100%',
            height: '170px',
            border: '.2rem solid #ececec',
            borderRadius: '4px',
            padding: '1rem',
            marginBottom: '1rem'
        }}>

        <Container>
        <Row>
            <Col><h2><FaLock />ChatRoomName <MdFavorite /></h2></Col>
            <Col>  
            <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
                <AiOutlineSearch />
            </InputGroup.Text>
            <FormControl
            placeholder="Search Messages"
            aria-label="Search"
            aria-describedby="basic-addon1"
            />
             </InputGroup>
            </Col>
        </Row>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p>
                <Image src="" / >user name
            </p>
        </div>
        <Row>
            <Col>
            <Accordion style={{padding: 0}}>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum.
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>    
            </Col>
            <Col>
            <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header>Accordion Item #1</Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum.
                </Accordion.Body>
            </Accordion.Item>
            </Accordion>    
            </Col>
        </Row>
        </Container>            
        </div>
    )
}

export default MessageHeader
