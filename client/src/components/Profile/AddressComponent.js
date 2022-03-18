import React from 'react'
import {Card} from 'react-bootstrap';

function AddressComponent() {
  return (
	<div className="d-flex justify-content-around">
        <Card style={{ width: '31rem' }}>
          <Card.Body>
            <Card.Title>Address</Card.Title>
            <Card.Text>
              680 ถ. นิตโย Muang สกลนคร 47000
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
  )
}

export default AddressComponent