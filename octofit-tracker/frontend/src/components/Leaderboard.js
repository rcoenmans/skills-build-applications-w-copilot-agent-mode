import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/';

  const fetchData = () => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setEntries(results);
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
          <h2 className="card-title page-title">Leaderboard</h2>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <button className="btn btn-primary" onClick={fetchData} disabled={loading}>
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            <small className="text-muted">{entries.length} entries</small>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 && (
                  <tr><td colSpan="3" className="text-center text-muted">No leaderboard entries</td></tr>
                )}
                {entries.map((e, i) => (
                  <tr key={i}>
                    <td>{e.rank ?? i + 1}</td>
                    <td>{e.user ?? e.username ?? '—'}</td>
                    <td>{e.score ?? 0}</td>
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
export default Leaderboard;
