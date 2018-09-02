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

SELECT MAX (score), email, stage, level FROM game FULL OUTER JOIN users on users.id = user_id GROUP BY stage, level;

SELECT email, (
  SELECT id, level, stage, MAX (score) FROM game GROUP BY stage, level
) FROM game INNER JOIN users on users.id = user_id;


SELECT DISTINCT b.id, b.level, b.stage, a.max_score FROM (
  SELECT level, stage, MAX (score) AS max_score FROM game GROUP BY level, stage
) a JOIN game b ON a.level = b.level AND a.stage = b.stage AND a.max_score = b.score;