import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : '/api/users/';

  const fetchData = () => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return (
    <div className="app-container">
      <div className="card page-card">
        <div className="card-body">
          <h2 className="card-title page-title">Users</h2>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <button className="btn btn-primary" onClick={fetchData} disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <small className="text-muted">{users.length} users</small>
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr><td colSpan="3" className="text-center text-muted">No users found</td></tr>
                )}
                {users.map((u, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{u.name ?? u.username ?? '—'}</td>
                    <td>{u.email ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Users;
