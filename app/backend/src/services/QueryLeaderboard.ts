const homesTeams = `SELECT t.team_name as name,
SUM(
  CASE
    WHEN home_team_goals > away_team_goals THEN 3
    WHEN home_team_goals = away_team_goals THEN 1
    WHEN home_team_goals < away_team_goals THEN 0
  END
) as totalPoints,
COUNT(DISTINCT matches.id) as totalGames,
SUM(home_team_goals > away_team_goals) as totalVictories,
SUM(home_team_goals = away_team_goals) as totalDraws,
SUM(home_team_goals < away_team_goals) as totalLosses,
SUM(home_team_goals) as goalsFavor,
SUM(away_team_goals) as goalsOwn,
SUM(home_team_goals - away_team_goals) as goalsBalance,
ROUND(SUM(
  CASE
  WHEN home_team_goals > away_team_goals THEN 3
  WHEN home_team_goals = away_team_goals THEN 1
  WHEN home_team_goals < away_team_goals THEN 0
  END
) / (COUNT(DISTINCT matches.id) * 3) * 100, 2) as efficiency
FROM matches
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t
ON home_team = t.id
WHERE in_progress = 0
GROUP BY t.team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

const awayTeams = `SELECT t.team_name as name,
SUM(
  CASE
    WHEN away_team_goals > home_team_goals THEN 3
    WHEN home_team_goals = away_team_goals THEN 1
    WHEN away_team_goals < home_team_goals THEN 0
  END
) as totalPoints,
COUNT(DISTINCT matches.id) as totalGames,
SUM(away_team_goals > home_team_goals) as totalVictories,
SUM(away_team_goals = home_team_goals) as totalDraws,
SUM(away_team_goals < home_team_goals) as totalLosses,
SUM(away_team_goals) as goalsFavor,
SUM(home_team_goals) as goalsOwn,
SUM(away_team_goals - home_team_goals) as goalsBalance,
ROUND(SUM(
  CASE
  WHEN away_team_goals > home_team_goals THEN 3
  WHEN home_team_goals = away_team_goals THEN 1
  WHEN away_team_goals < home_team_goals THEN 0
  END
) / (COUNT(DISTINCT matches.id) * 3) * 100, 2) as efficiency
FROM matches
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams as t
ON away_team = t.id
WHERE in_progress = 0
GROUP BY t.team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

export default { awayTeams, homesTeams };
