import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}`);
});

