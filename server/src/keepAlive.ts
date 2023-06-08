import * as cron from 'node-cron';
import * as http from 'http';

// Schedule the task to run every 10 minutes
cron.schedule('*/10 * * * *', () => {
  // Send a request to the '/api/snippets' endpoint
  http.get('https://codesnippet-prod.onrender.com/api/snippets', (res) => {
    let data = '';

    // Receive the response data
    res.on('data', (chunk) => {
      data += chunk;
    });

    // Process the complete response
    res.on('end', () => {
      // Do something with the response data
      console.log('Response:', data);
    });
  });
});
