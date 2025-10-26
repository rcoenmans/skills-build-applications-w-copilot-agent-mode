import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/workouts/`
    : '/api/workouts/';

  const fetchData = () => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
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
          <h2 className="card-title page-title">Workouts</h2>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <button className="btn btn-primary" onClick={fetchData} disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <small className="text-muted">{workouts.length} workouts</small>
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Difficulty</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {workouts.length === 0 && (
                  <tr><td colSpan="4" className="text-center text-muted">No workouts found</td></tr>
                )}
                {workouts.map((w, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{w.name}</td>
                    <td>{w.difficulty ?? '—'}</td>
                    <td>{w.duration ?? '—'}</td>
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
export default Workouts;
