// import React from 'react';
// import { Button, OverlayTrigger, Popover, Card } from 'react-bootstrap';
// import placeholderFox from '../img/placeholder.png';

// const DashboardPopover = () => {
//   // Example data - replace with your actual data source
//   const messages = [
//     { id: 1, recipient: 'Recipient 1', content: 'Message Content 1' },
//     { id: 2, recipient: 'Recipient 2', content: 'Message Content 2' }
//   ];

//   return (
//     <OverlayTrigger
//       trigger="click"
//       placement="bottom"
//       overlay={
//         <Popover id="popover-positioned-bottom-center">
//           <Popover.Header>
//             <div className="profileArea text-center justify-content-md-center">
//               <img src={placeholderFox} alt="Profile" className="profileImage" />
//               <h2>Username</h2>
//             </div>
//           </Popover.Header>
//           <Popover.Body>
//             <h3>Messages</h3>
//             <div className="messageContainer">
//               {messages.map((message) => (
//                 <Card key={message.id}>
//                   <Card.Body>
//                     <strong>{message.recipient}</strong>
//                     <p>{message.content}</p>
//                   </Card.Body>
//                 </Card>
//               ))}
//             </div>
//           </Popover.Body>
//         </Popover>
//       }>
//      <Button variant="secondary" onClick={(e) => e.preventDefault()}>
//   Open menu
// </Button>

//     </OverlayTrigger>
//   );
// };

// export default DashboardPopover;


import React from 'react';
import { Button, OverlayTrigger, Popover, Card } from 'react-bootstrap';
import placeholderFox from '../img/placeholder.png';

const DashboardPopover = () => {
  // Example data - replace with your actual data source
  const messages = [
    { id: 1, recipient: 'Recipient 1', content: 'Message Content 1' },
    { id: 2, recipient: 'Recipient 2', content: 'Message Content 2' }
  ];

  const handlePopoverClick = (e) => {
    e.stopPropagation(); // Prevents the click from propagating to other elements
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom"
      rootClose
      overlay={
        <Popover id="popover-positioned-bottom-center" onClick={handlePopoverClick}>
          <Popover.Header>
            <div className="profileArea text-center justify-content-md-center">
              <img src={placeholderFox} alt="Profile" className="profileImage" />
              <h2>Username</h2>
            </div>
          </Popover.Header>
          <Popover.Body>
            <h3>Messages</h3>
            <div className="messageContainer">
              {messages.map((message) => (
                <Card key={message.id}>
                  <Card.Body>
                    <strong>{message.recipient}</strong>
                    <p>{message.content}</p>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Popover.Body>
        </Popover>
      }>
      <Button variant="secondary" onClick={(e) => e.preventDefault()}>
  Open menu
   </Button>
    </OverlayTrigger>
  );
};

export default DashboardPopover;
