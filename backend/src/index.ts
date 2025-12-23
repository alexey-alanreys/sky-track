import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5174;

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	}),
);

app.use(express.json());

// Test endpoint
app.get('/api', (req, res) => {
	res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT}`);
	console.log(`📡 CORS enabled for http://localhost:${PORT}`);
	console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
	console.log('[GET] /api - Test endpoint');
});
