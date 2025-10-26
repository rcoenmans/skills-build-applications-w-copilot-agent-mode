import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : '/api/teams/';

  const fetchData = () => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
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
          <h2 className="card-title page-title">Teams</h2>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <button className="btn btn-primary" onClick={fetchData} disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <small className="text-muted">{teams.length} teams</small>
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Universe</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 && (
                  <tr><td colSpan="4" className="text-center text-muted">No teams found</td></tr>
                )}
                {teams.map((t, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{t.name}</td>
                    <td>{t.universe ?? '—'}</td>
                    <td>{t.members ? t.members.length : t.size ?? '—'}</td>
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
export default Teams;
