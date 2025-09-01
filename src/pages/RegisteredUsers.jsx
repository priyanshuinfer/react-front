import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function RegisteredUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userType = user?.userType || "";

  // Only admin can access
  useEffect(() => {
    if (userType !== "Admin") {
      navigate("/"); // redirect non-admins to homepage
    }
  }, [userType, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost/php/get_users.php");
        const data = await res.json();

        if (data.success) {
          setUsers(data.users);
        } else {
          setError("Failed to fetch users");
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Network or server error");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div>
      <Navbar />
      <div className="px-8 py-10">
        <h2 className="text-3xl font-bold mb-6">Registered Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">User Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{u.id}</td>
                  <td className="py-2 px-4 border-b">{u.name}</td>
                  <td className="py-2 px-4 border-b">{u.email}</td>
                  <td className="py-2 px-4 border-b">{u.user_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RegisteredUsers;
