INSERT INTO solution_colors(level, solution_color)
VALUES 
  ('1', '#f5ff00'),
  ('1', '#0ab3ff'),
  ('2', '#ff3202'),
  ('2', '#f7ff00'),
  ('3', '#ff00b5'),
  ('3', '#05ffd4'),
  ('4', '#00a0ff'),
  ('4', '#8cff00');

INSERT INTO decoy_colors(level, decoy_color)
VALUES 
  ('1', '#ed1a40'),
  ('1', '#90f503'),
  ('2', '#4250f4'),
  ('2', '#f44a41'),
  ('3', '#4167f4'),
  ('3', '#ff1e05'),
  ('4', '#c300ff'),
  ('4', '#0043ff');

INSERT INTO game(user_id, stage, level, score, level_time)
  VALUES
    ('8', '1', '1', '50', '50'),
    ('8', '1', '2', '80', '70'),
    ('8', '2', '1', '80', '80'),
    ('9', '1', '1', '50', '50'),
    ('9', '1', '2', '80', '70'),
    ('9', '2', '1', '80', '80');