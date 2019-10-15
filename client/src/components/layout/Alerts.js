import React, { useContext } from 'react';
import { Alert, Container } from 'reactstrap';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  return (
    <Container>
      {alertContext.alerts.length > 0 &&
        alertContext.alerts.map(alert => (
          <Alert
            style={{ marginTop: '1rem' }}
            key={alert.id}
            className={`fade-in alert-${alert.type}`}
          >
            {alert.msg}
          </Alert>
        ))}
    </Container>
  );
};

export default Alerts;
