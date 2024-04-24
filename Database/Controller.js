import connection from "./Pool.js";

export const pool = await connection();

export const creatDatabase = async () => {
  const result = await pool.query(`CREATE DATABASE museum_qr;`);
};

export const useDatabase = async () => {
  const results = await pool.query(`USE museum_qr;`);
};

export const createTable = async () => {
  const results = await pool.query(
    `CREATE TABLE token(
      id int AUTO_INCREMENT,
      qr_path varchar(100) NOT NULL,
      unique_token varchar(16) NOT NULL,
      PRIMARY KEY (id)
  );`
  );
};

export const storeQrToDB = async (qr_path, unique_token) => {
 
  const results = await pool.query(
    `INSERT INTO token(qr_path, unique_token) VALUES('${qr_path}','${unique_token}')`
  );
};
