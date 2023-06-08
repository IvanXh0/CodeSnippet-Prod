import * as cron from 'node-cron';
import * as http from 'http';

// Schedule the task to run every 13 minutes
cron.schedule('*/13 * * * *', () => {
  // Send a request to the '/ping' endpoint
  http.get('https://codesnippet-prod.onrender.com/api/snippets', (res) => {
    // Do nothing with the response
  });
});
