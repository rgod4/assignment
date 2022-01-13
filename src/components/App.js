import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
const initial={
  title:"",
  body:""
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
    if(searchkey>0&&searchkey<=100){
      setcurrpost(posts[searchkey-1])
    }
    else{
      console.log(searchkey);
      setcurrpost(initial);
    }
  }, [searchkey])

  const handlechange = (e) => {
    e.preventDefault();

    setkey(Number(e.target.value));
  }

  let searchbox=(
    <div id='searchbox'>
      <input type="Number" value={searchkey} onChange={handlechange} placeholder='Enter Your post number'></input>
    </div>)

  let postbox = (
      <div id='postbox'>
        <h2 id="postTitle">{currpost.title}</h2>
      <p id="postbody">{currpost.body}</p>
      </div>
    )


  if(currpost!==initial)
    return (
    <div className='box'>
    {searchbox}
    {postbox}
    </div>)
  else{
    return (
      <div className='box'>
      {searchbox}
      <div className='message'>Enter PostId in range [1,100] to get a post</div>
      </div>)
  }
}

export default App;
