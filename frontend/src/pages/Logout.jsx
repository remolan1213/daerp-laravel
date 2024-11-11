import Button from "react-bootstrap/Button";
import Card from "../components/Card";

const Logout = () => {
  return (
    <Card title={"Logout"}>
      <p>Are you sure you want to logout?</p>
      <div className="button-container">
        <Button variant="dark" size="sm" className="w-25 mb-3">
          Ok
        </Button>
        <Button variant="danger" size="sm" className="w-25 mb-3">
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default Logout;
