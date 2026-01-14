export default {
  client: "sqlite3",
  connection: {
    filename: "./src/database/database.db",
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./src/database/migrations",
    extensions: "ts",
  },
  seeds: {
    extensions: "ts",
    directory: "./src/database/seeds",
  },
  pool: {
    afterCreate: (connection: any, done: any) => {
      connection.run("PRAGMA foreign_keys = ON");
      done();
    },
  },
};
