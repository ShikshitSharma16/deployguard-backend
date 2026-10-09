const mongoose = require('mongoose');

// Same DNS fix pattern used in SevaSetu/store-api - kept here preemptively
// since Render's environment can hit the same SRV lookup issue.
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDatabase;
