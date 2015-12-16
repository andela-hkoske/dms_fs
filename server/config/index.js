var envVars = {
  port: process.env.PORT || 8080,
  secretKey: process.env.SECRET_KEY,
  db: process.env.DB_URL
};

module.exports = {
  development: envVars,
  staging: envVars,
  production: envVars
};
