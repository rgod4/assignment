import { useState, useEffect } from 'react';
import './App.css';
import {Form,Alert,Card } from 'react-bootstrap';
import axios from 'axios';
const initial = {
  title: "",
  body: ""
};

function App() {
  const [searchkey, setkey] = useState(0);
  const [posts, setposts] = useState([]);
  const [currpost, setcurrpost] = useState(initial);


  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setposts(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    if (searchkey > 0 && searchkey <= 100) {
      setcurrpost(posts[searchkey - 1])
    }
    else {
      console.log(searchkey);
      setcurrpost(initial);
    }
  }, [searchkey])

  const handlechange = (e) => {
    e.preventDefault();

    setkey(Number(e.target.value));
  }

  let searchbox = (
    <Form>
      <Form.Group className='mb3' controlId='formGroupSearch'>
        <Form.Control type="Number" onChange={handlechange} placeholder="Search" />
      </Form.Group>
    </Form>
  )

  let postbox = (
    <Card
      bg="primary"
      text={'white'}
      style={{ width: '18rem' }}
      className="mb-2"
    >
      <Card.Header>Header</Card.Header>
      <Card.Body>
        <Card.Title>{currpost.title}</Card.Title>
        <Card.Text>
          {currpost.body}
        </Card.Text>
      </Card.Body>
    </Card>
  )


  if (currpost !== initial)
    return (
      <>
      <div className='box'>
        {searchbox}
      </div>
      <div className='box'>
        {postbox}
      </div>
      </>
        )
  else {
    return (
      <>
      <div className='box'>
        {searchbox}
      </div>
      <div className='box'>
        <Alert variant="danger">
          <p>
            Enter PostId in range [1,100] to see a post!
          </p>
        </Alert>
      </div>
      </>)
  }
}

export default App;
