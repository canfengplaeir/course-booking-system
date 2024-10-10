import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { userRoutes } from './routes/userRoutes';
import { courseRoutes } from './routes/courseRoutes';
import { adminRoutes } from './routes/adminRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;