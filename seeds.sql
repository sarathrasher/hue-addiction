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
    
INSERT INTO game(user_id, stage, level, score, level_time)
  VALUES
    ('10', '1', '1', '70', '80'),
    ('10', '1', '2', '0', '0'),
    ('10', '2', '1', '0', '0');

INSERT INTO game(user_id, stage, level, score, level_time)
  VALUES
    ('25', '1', '1', '40', '50'),
    ('25', '1', '2', '25', '60'),
    ('25', '2', '1', '45', '30'),
    ('25', '2', '1', '20', '70');

INSERT INTO solution_colors (level, solution_color)
VALUES
  ('5', '#00ff59'),
  ('5', '#0054ff'),
  ('6', '#ff6d00'),
  ('6', '#ce00ff'),
  ('7', '#4400ff'),
  ('7', '#af00ff'),
  ('8', '#ffc900'),
  ('8', '#ff00c4'),
  ('9', '#090fc6'),
  ('9', '#f79c7e'),
  ('10', '#ff00c4'),
  ('10', '#ff0059');


INSERT INTO decoy_colors (level, decoy_color)
VALUES
  ('5', '#387eed'),
  ('5', '#8ed77'),
  ('6', '#6238ed'),
  ('6', '#ed3838'),
  ('7', '#e51414'),
  ('7', '#093fe2'),
  ('8', '#e22d08'),
  ('8', '#f9e502'),
  ('9', '#5055e5'),
  ('9', '#ef7e58'),
  ('10', '#f41362'),
  ('10', '#f720c5');
