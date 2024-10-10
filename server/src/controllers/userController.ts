import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { openDb } from '../models/db';
import { AuthRequest } from '../middleware/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const register = async (req: Request, res: Response) => {
  const { phoneNumber, password, name, role } = req.body;

  try {
    const db = await openDb();
    const existingUser = await db.get('SELECT * FROM users WHERE phone_number = ?', phoneNumber);

    if (existingUser) {
      return res.status(400).json({ error: '该手机号已被注册' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run(
      'INSERT INTO users (phone_number, password, name, role) VALUES (?, ?, ?, ?)',
      [phoneNumber, hashedPassword, name, role]
    );

    const user = {
      id: result.lastID,
      phoneNumber,
      name,
      role,
    };

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '服务器错误' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { phoneNumber, password } = req.body;

  try {
    const db = await openDb();
    const user = await db.get('SELECT * FROM users WHERE phone_number = ?', phoneNumber);

    if (!user) {
      return res.status(400).json({ error: '用户不存在' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: '密码错误' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);

    res.json({
      user: {
        id: user.id,
        phoneNumber: user.phone_number,
        name: user.name,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '服务器错误' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const { name, bio, phoneNumber } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: '未授权' });
  }

  try {
    const db = await openDb();
    await db.run(
      'UPDATE users SET name = ?, bio = ?, phone_number = ? WHERE id = ?',
      [name, bio, phoneNumber, userId]
    );

    const updatedUser = await db.get('SELECT * FROM users WHERE id = ?', userId);

    res.json({
      user: {
        id: updatedUser.id,
        phoneNumber: updatedUser.phone_number,
        name: updatedUser.name,
        bio: updatedUser.bio,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '服务器错误' });
  }
};