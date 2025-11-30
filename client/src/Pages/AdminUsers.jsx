import { Card, Table, Form, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useMemo, useState } from "react";

const AdminUsers = ({ totalUsers, users = [] }) => {
  const [query, setQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      [u.userName, u.email].some((v) =>
        String(v || "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [users, query]);

  return (
    <Card className="shadow-sm border-0 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">Quản lý người dùng</h4>
      </div>
      <div className="mb-3">
        <div className="input-group">
          <span className="input-group-text">
            <Search />
          </span>
          <Form.Control
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <Table responsive hover>
        <thead className="table-light">
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center text-muted">
                (Không tìm thấy người dùng)
              </td>
            </tr>
          ) : (
            filteredUsers.map((u) => (
              <tr key={u._id}>
                <td>{u.userName}</td>
                <td>{u.email}</td>
                <td>{u.isAdmin ? "Admin" : "User"}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Card>
  );
};

export default AdminUsers;
