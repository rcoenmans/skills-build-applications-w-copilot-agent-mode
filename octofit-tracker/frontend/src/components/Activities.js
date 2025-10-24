import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/activities/`
    : '/api/activities/';

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      });
  }, [endpoint]);

  return (
    <div>
      <h2>Activities</h2>
      <ul>
        {activities.map((a, i) => (
          <li key={i}>{a.type} - {a.duration} min ({a.date})</li>
        ))}
      </ul>
    </div>
  );
};
export default Activities;
