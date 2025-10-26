import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : '/api/activities/';

  const fetchData = () => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const openModal = (item) => {
    setSelected(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelected(null);
  };

  return (
    <div className="app-container">
      <div className="card page-card">
        <div className="card-body">
          <h2 className="card-title page-title">Activities</h2>
          <div className="d-flex align-items-center mb-2">
            <button className="btn btn-primary" onClick={fetchData} disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
            <small className="text-muted btn-refresh">{activities.length} records</small>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Duration (min)</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 && (
                  <tr><td colSpan="5" className="text-center text-muted">No activities found</td></tr>
                )}
                {activities.map((a, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{a.type}</td>
                    <td>{a.duration}</td>
                    <td>{a.date}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => openModal(a)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal-backdrop-custom" onClick={closeModal} />
          <div className={`modal d-block`} tabIndex="-1" role="dialog" style={{ zIndex: 1050 }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Activity Details</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  {selected ? (
                    <div>
                      <p><strong>Type:</strong> {selected.type}</p>
                      <p><strong>Duration:</strong> {selected.duration} min</p>
                      <p><strong>Date:</strong> {selected.date}</p>
                      {selected.notes && <p><strong>Notes:</strong> {selected.notes}</p>}
                    </div>
                  ) : (
                    <p className="text-muted">No details</p>
                  )}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Activities;
