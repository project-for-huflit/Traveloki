require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3056;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
