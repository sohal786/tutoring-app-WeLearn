import React from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DashboardPopover = () => {
  const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: '#007bff', // Set text color
    fontWeight: 'bold', // Make text bold
    fontSize: '16px', // Set font size
    padding: '10px', // Add padding
    display: 'block', // Make it a block-level element
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      rootClose
      overlay={
        <Popover id="popover-positioned-bottom-center">
          <Popover.Header>
            <Link to="/dashboard" style={linkStyle}>
              Go to Dashboard
            </Link>
          </Popover.Header>
        </Popover>
      }>
      <Button variant="secondary" onClick={(e) => e.preventDefault()}>
        Open Dashboard
      </Button>
    </OverlayTrigger>
  );
};

export default DashboardPopover;