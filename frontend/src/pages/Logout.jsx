import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Logout = () => {
  return (
    <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title bg="dark">Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary" size="sm">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};

export default Logout;
