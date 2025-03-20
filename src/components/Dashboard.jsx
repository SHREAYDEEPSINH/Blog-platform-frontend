import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [lsData, setlsData] = useState(
    JSON.parse(localStorage.getItem("loginuser"))
  )
  const [err, setErr] = useState("")

  const fetchData = () => {
    axios.get("http://localhost:9070/getPost")
      .then((res) => {
        setPosts(res.data.postDetails)
        setErr("")
        console.log(res.data)
      }).catch((error) => {
        setErr(error.message)
      })
  }

  useEffect(() => {
    fetchData()
  }, []);

  
  return (
    <div className="container mt-4">
   
      {err && <div className="alert alert-danger">{err}</div>}

      <div className="grid-container">
        {posts.map((post) => (
          <div key={post._id} className="card border-0 grid-items" style={{ width: "100%" }}>
            <img src={`http://localhost:9070${post.image}`} className="card-img-top" alt={post.title} />
            <div className="card-body px-0">
              <h5 className="card-title text-secondary">{post.title}</h5>
              <p className="card-text fs-3 fw-bolder lh-1">{post.content.toUpperCase()}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
