import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb() {
  return open({
    filename: 'database.sqlite',
    driver: sqlite3.Database
  });
}

export async function initDb() {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phone_number TEXT UNIQUE,
      password TEXT,
      name TEXT,
      profile_picture TEXT,
      bio TEXT,
      role TEXT
    );

    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE
    );

    CREATE TABLE IF NOT EXISTS grades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE
    );

    CREATE TABLE IF NOT EXISTS classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      time TEXT,
      location TEXT,
      total_capacity INTEGER,
      available_spots INTEGER,
      tags TEXT,
      teacher_id INTEGER,
      subject_id INTEGER,
      grade_id INTEGER,
      FOREIGN KEY (teacher_id) REFERENCES users (id),
      FOREIGN KEY (subject_id) REFERENCES subjects (id),
      FOREIGN KEY (grade_id) REFERENCES grades (id)
    );

    CREATE TABLE IF NOT EXISTS enrollments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      class_id INTEGER,
      FOREIGN KEY (student_id) REFERENCES users (id),
      FOREIGN KEY (class_id) REFERENCES classes (id)
    );
  `);

  await db.close();
}

initDb();