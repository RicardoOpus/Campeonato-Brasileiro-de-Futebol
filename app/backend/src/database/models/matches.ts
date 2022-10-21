import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './teams';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  inProgress!: number;
  awayTeamGoals!: number;
}

Match.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'Teams',
        key: 'id',
      },
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'Teams',
        key: 'id',
      },
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'matchHome' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'matchAway' });

export default Match;
