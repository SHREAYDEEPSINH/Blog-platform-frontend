import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lsData, setlsData] = useState(
    JSON.parse(localStorage.getItem("loginuser"))
  )
  const [err, setErr] = useState("")


  const fetchData = () => {
    axios.get("https://blog-platform-backend-c19i.onrender.com/getPost")
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

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!title || !content || !image) {
      alert("all fileds are required")
    } else {
      await axios.post("https://blog-platform-backend-c19i.onrender.com/post", { image, title, content },
        { headers: { Authorization: `Bearer ${lsData.token}`, "Content-Type": "multipart/form-data", } }
      );
      setTitle("");
      setContent("");
      setImage("")

      fetchData()
    }
  };

  let deleteHandle = (id) => {
    axios.delete(`https://blog-platform-backend-c19i.onrender.com/deletePost/${id}`, { headers: { Authorization: `Bearer ${lsData.token}` } })
      .then((res) => {
        setPosts(posts.filter((post) => post._id !== id))
        alert("Post deleted successfully!");
      }).catch((error) => {
        alert(error)
      })
  }



  

  return (
    <div className="container mt-4">
      {lsData && (lsData.role === "author" || lsData.role === "admin") && (
        <form className="card p-3 mb-4" onSubmit={handleCreatePost} method="post" encType="multipart/form-data">
          <input type="file" className="form-control mb-2" onChange={(e) => setImage(e.target.files[0])} />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="btn btn-primary" >
            Add Post
          </button>
        </form>
      )}

      {err && <div className="alert alert-danger">{err}</div>}

      <div className="grid-container">
        {posts.map((post) => (
          <div key={post._id} className="card border-0 grid-items" style={{ width: "100%" }}>
            <img src={`https://blog-platform-backend-c19i.onrender.com${post.image}`} className="card-img-top" alt={post.title} />
            <div className="card-body px-0">
              <h5 className="card-title text-secondary">{post.title}</h5>
              <p className="card-text fs-3 fw-bolder lh-1">{post.content.toUpperCase()}</p>
              {lsData && (lsData.role === "author" || lsData.role === "admin") && (
                <button className="btn btn-danger" onClick={() => deleteHandle(post._id)}>Delete</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
