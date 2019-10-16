import React, { useState, useContext } from 'react';
import StoreContext from '../../../context/store/storeContext';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const UpdateOrderModal = ({ storeId, order }) => {
  const storeContext = useContext(StoreContext);
  const [modal, setModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    ...order
  });

  const toggle = () => {
    setModal(!modal);
  };

  const onUpdateOrder = e => {
    if (newOrder.deliveryDate !== null && newOrder.status !== null) {
      storeContext.updateOrder(storeId, { updateOrder: newOrder });
      toggle();
    }
  };

  const onChange = e => {
    setNewOrder({
      ...newOrder,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div>
      <Button
        color='dark'
        style={{
          display: 'inline-block',
          fontSize: '1.4rem',
          fontWeight: '800',
          marginRight: '0.25rem',
          padding: '0.15rem 0.5rem'
        }}
        onClick={toggle}
      >
        &#8634;
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Update Order Info</ModalHeader>
        <ModalBody>
          <Form className='my-2'>
            <FormGroup row>
              <Label for='deliveryDate' md={2}>
                Delivery Date
              </Label>
              <Col md={10}>
                <Input
                  type='date'
                  required
                  value={newOrder.deliveryDate}
                  onChange={onChange}
                  // Min date is tomorrow
                  min={
                    new Date().toISOString().slice(0, 9) +
                    (Number(new Date().toISOString().slice(9, 10)) === 9
                      ? 0
                      : Number(new Date().toISOString().slice(9, 10)) + 1)
                  }
                  name='deliveryDate'
                  id='deliveryDate'
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for='status' sm={2}>
                Status
              </Label>
              <Col sm={10}>
                <Input
                  required
                  onChange={onChange}
                  value={newOrder.status}
                  type='select'
                  name='size'
                  id='status'
                >
                  <option value='true'>Active</option>
                  <option value='false'>Inactive</option>
                </Input>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' onClick={onUpdateOrder}>
            Update order info
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateOrderModal;
