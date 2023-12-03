import { Button, OverlayTrigger, Popover, Card } from "react-bootstrap";
import placeholderFox from "../img/placeholder.png";

const DashboardPopover = () => {
    return (
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={
            <Popover id="popover-positioned-bottom center">
              <Popover.Header>
                <div className="profileArea text-center justify-content-md-center">
                  <img src={placeholderFox} className="profileImage"></img>
                  <h2>Username</h2>
                </div>
              </Popover.Header>
              <Popover.Body>
                  <h3>Messages</h3>

                    {/* Map messages belong here */}
                    <div className="messageContainer">
                      <Card>
                        <Card.Body>
                          <h4>Recipient Name</h4>
                          <p>Message Content</p>
                        </Card.Body>
                      </Card>

                      <Card>
                        <Card.Body>
                          <h4>Recipient Name</h4>
                          <p>Message Content</p>
                        </Card.Body>
                      </Card>
                    </div>
              </Popover.Body>
            </Popover>
          }>
          <a href="#">Open menu</a>
        </OverlayTrigger>
    );
}
 
export default DashboardPopover;