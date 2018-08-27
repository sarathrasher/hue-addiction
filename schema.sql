CREATE TABLE mixed_colors (
  id SERIAL PRIMARY KEY,
  mixed_color VARCHAR(255) NOT NULL
);

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