const mongoose = require('mongoose');
const dns = require('dns');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

dns.setServers(['8.8.8.8', '8.8.4.4']);

async function update() {
  await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
  const db = mongoose.connection.db;

  const r1 = await db.collection('games').updateMany(
    { stock: { $exists: false } },
    { $set: { stock: 100, sold: 0 } }
  );
  const r2 = await db.collection('games').updateMany(
    { sold: { $exists: false } },
    { $set: { sold: 0 } }
  );
  console.log('Updated stock:', r1.modifiedCount, '| Updated sold:', r2.modifiedCount);

  const games = await db.collection('games').find({}).toArray();
  const clean = games.map(({ _id, ...rest }) => rest);
  fs.writeFileSync(
    path.join(__dirname, '../../data.json'),
    JSON.stringify({ games: clean }, null, 2),
    'utf8'
  );
  console.log('Exported', clean.length, 'games to data.json');

  await mongoose.disconnect();
}
update().catch(e => { console.error(e); process.exit(1); });
