
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lsData, setlsData] = useState(
    JSON.parse(localStorage.getItem("loginuser"))
  );

  const [image, setImage] = useState(null)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [err, setErr] = useState("")
  const [posts, setPosts] = useState([]);



  useEffect(() => {
  if (!lsData || lsData.role === "user") {
    navigate("/");
    alert("not accessible")
  }
  }, [lsData, navigate]);


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

  //  user Hendle 
  useEffect(() => {
    axios
      .get("http://localhost:9070/admin/users", {
        headers: { Authorization: `Bearer ${lsData.token}` },
      })
      .then((res) => {
        setUsers(res.data.usersDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });


    fetchData()
  }, [lsData.token]);

  if (loading) return <h2 className="loading-text">Loading users...</h2>;

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(
        `http://localhost:9070/updaterole/${userId}`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${lsData.token}` } }
      );
      setUsers((users) =>
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      alert("Role updated successfully!");
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role.");
    }
  };


  //  Post Handle 
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!title || !content || !image) {
      alert("all fileds are required")
    } else {
      await axios.post("http://localhost:9070/post", { image, title, content },
        { headers: { Authorization: `Bearer ${lsData.token}`, "Content-Type": "multipart/form-data", } }
      );
      alert("Post created successfully")
      setTitle("");
      setContent("");
      setImage("")

      fetchData()
    }
  };

  let deleteHandle = (id) => {
    axios.delete(`http://localhost:9070/deletePost/${id}`, { headers: { Authorization: `Bearer ${lsData.token}` } })
      .then((res) => {
        setPosts(posts.filter((post) => post._id !== id))
        alert("Post deleted successfully!");
        fetchData()
      }).catch((error) => {
        alert(error)
      })
  }

  return (
    <>
      <div className="admin-panel">
        <div className="container admin-card ">
          <h2 className="mb-4 text-white">Users</h2>

          <div className="table-responsive">
            <table className="table table-borderless table-dark table-striped">
              <thead className="">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Change Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.userName}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <select value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="author">Author</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


            <h2 className="text-white">Add Post</h2>
            {lsData && (lsData.role === "author" || lsData.role === "admin") && (
              <form className="card p-3 mb-4 bg-transparent postForm" onSubmit={handleCreatePost} method="post" encType="multipart/form-data">
                <input type="file" className="form-control mb-2 bg-transparent text-white" onChange={(e) => setImage(e.target.files[0])} />
                <input
                  type="text"
                  className="form-control mb-2 bg-transparent text-white"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="form-control mb-2 bg-transparent text-white"
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button className="btn btn-success text-white" >
                  Add Post
                </button>
              </form>
            )}

          </div>


          {err && <div className="alert alert-danger">{err}</div>}

          <div className="grid-container">
            {posts.map((post) => (
              <div key={post._id} className="card border-0 grid-items bg-transparent text-white" style={{ width: "100%" }}>
                <img src={`http://localhost:9070${post.image}`} className="card-img-top" alt={post.title} />
                <div className="card-body px-0">
                  <h5 className="card-title ">{post.title}</h5>
                  <p className="card-text fs-3 fw-bolder lh-1">{post.content.toUpperCase()}</p>
                  {lsData && (lsData.role === "author" || lsData.role === "admin") && (
                    <button className="btn btn-danger" onClick={() => deleteHandle(post._id)}>Delete</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;

