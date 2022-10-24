import User from '../../database/models/users';

export const userDefaultMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
} as User;

export const loginMock = {
  email: 'admin@admin.com',
  password: 'secret_admin'
};

export const loginInvalidEmail = {
  email: 'adminadmin.com',
  password: 'secret'
};

export const loginInvalidPassword = {
  email: 'admina@dmin.com',
  password: 'secret'
}