CREATE TABLE solution_colors (
  id SERIAL PRIMARY KEY,
  level VARCHAR(255) NOT NULL,
  solution_color VARCHAR(255) NOT NULL
);

CREATE TABLE decoy_colors (
  id SERIAL PRIMARY KEY,
  level VARCHAR(255) NOT NULL,
  decoy_color VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  user_password VARCHAR(255)
);

CREATE TABLE game (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  stage INTEGER NOT NULL,
  level INTEGER NOT NULL,
  score INTEGER NOT NULL,
  level_time INTEGER NOT NULL,
  time_stamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);