import Button from "react-bootstrap/Button";
import Card from "../components/Card";
import LabelValue from "../components/LabelValue";
function Payroll() {
  return (
    <div className="card-grid">
      <Card title="Payroll">
        <LabelValue label="Name" value="Jake Gaviola" />
        <LabelValue label="ID Number" value="2020-0105-005" />
        <div className="button-container">
          <Button variant="dark" size="sm" className="w-25 mb-3">
            Ok
          </Button>
          <Button variant="danger" size="sm" className="w-25 mb-3">
            Cancel
          </Button>
        </div>
      </Card>
      <Card title="Info">
        <LabelValue label="Name" value="Jake Gaviola" />
        <LabelValue label="ID Number" value="2020-0105-005" />
        <div className="button-container">
          <Button variant="dark" size="sm" className="w-25 mb-3">
            Ok
          </Button>
          <Button variant="danger" size="sm" className="w-25 mb-3">
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Payroll;
