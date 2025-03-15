
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

  useEffect(() => {
    if (!lsData || lsData.role === "user") {
      navigate("/");
    }
  }, [lsData, navigate]);


  useEffect(() => {
    axios
      .get("https://blog-platform-backend-c19i.onrender.com/admin/users", {
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
  }, [lsData.token]);

  if (loading) return <h2 className="loading-text">Loading users...</h2>;



  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(
        `https://blog-platform-backend-c19i.onrender.com/updaterole/${userId}`,
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

  return (
    <div className="admin-panel">
      <div className="container admin-card ">
        <h2 className="mb-4 text-center text-white">Admin </h2>

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
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

