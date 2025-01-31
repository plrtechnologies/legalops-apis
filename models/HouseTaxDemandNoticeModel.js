const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createHouseTaxDemandNotice = async (data) => {
    const {
        session_id, DocType, NoticeIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountDue, AmountDueInFavourOf
    } = data;

    const sql = `
    INSERT INTO housetaxdemandnotice ( session_id, DocType, NoticeIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountDue, AmountDueInFavourOf )
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     
     ON CONFLICT ("session_id") 
    DO UPDATE 
    SET 
        DocType = EXCLUDED.DocType,
       NoticeIssuigAuthority = EXCLUDED.NoticeIssuigAuthority,
        DoorNumberOnReceipt = EXCLUDED.DoorNumberOnReceipt,
        AssessmentNumberOnReceipt = EXCLUDED.AssessmentNumberOnReceipt,
         AmountDue = EXCLUDED. AmountDue,
         AmountDueInFavourOf = EXCLUDED.AmountDueInFavourOf
    RETURNING   session_id, DocType, NoticeIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountDue, AmountDueInFavourOf ;
`;
// Pass data as an array
const values = [session_id, DocType, NoticeIssuigAuthority, DoorNumberOnReceipt, AssessmentNumberOnReceipt, AmountDue, AmountDueInFavourOf];
    const result = await pool.query(sql, values);
    return result.rows[0];
};
   

const getHouseTaxDemandNotice = async (session_id) => {
    try {
        // SQL query to fetch loan proposers for a specific session_id
        const sql = `
            SELECT * FROM sessions 
            WHERE "session_id" = $1;
        `;
        const values = [session_id];
        
        const result = await pool.query(sql, values);
        
        // Return the results if any rows are found
        if (result.rows.length > 0) {
            return result.rows;
        } else {
            return [];  
        }
    } catch (err) {
        console.error('Error fetching HouseTaxDemandNotice:', err);
        throw err;
    }
};


module.exports = { createHouseTaxDemandNotice,getHouseTaxDemandNotice};









