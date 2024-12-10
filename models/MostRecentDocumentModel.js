const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createMostRecentDoc = async (data) => {
    const sql =  `
    INSERT INTO sessions
    ("session_id", "selectDeedType", "dateofRegistration","documentNumber","nameofSubregistrarOffice","locationOfSubregistrarOffice","subregistrarOfficeMandal","subregistrarOfficeDistrict","subregistrarOfficeLocalAuthority") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
                    RETURNING "session_id", 
                    "selectDeedType",
                    "dateofRegistration",
                    "documentNumber",
                    "nameofSubregistrarOffice",
                    "locationOfSubregistrarOffice",
                    "subregistrarOfficeMandal",
                    "subregistrarOfficeDistrict",
                    "subregistrarOfficeLocalAuthority";
                `;
    const result = await pool.query(sql, data);
    return result.rows[0];
};

const getMostRecentDocs= async () => {
    const sql = 'SELECT * FROM sessions';
    const result = await pool.query(sql);
    return result.rows;
};

module.exports = {
createMostRecentDoc,
getMostRecentDocs, 
  
};


