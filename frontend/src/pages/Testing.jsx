import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Testing() {
  return (
    <Card style={{ width: '18rem' }}>
     
      <Card.Body>
        <Card.Title style={{margin:'0',backgroundColor:'#17a2b8',color:'white'}}>Testing</Card.Title>
        <Card.Text style={{textAlign:"left"}}>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="success" style={{border:"solid 2px #17a2b8"}}>Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default Testing;
