const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,  // Bypass cert validation for self-signed certs
    },
  });

const createOrUpdateLinkDocument = async (data) => {
    const {
        session_id, selectDeedType,
        ecDocType, ecIssuingAuthority, ecStatementNumber,
        fromDate, toDate, giftDocType, donorName, doneeName,
        giftRegistrationDate, giftDocNumber, giftIssuingAuthority,
        noticeDocType, noticeIssuingAuthority, noticeDoorNumberOnReceipt,
        noticeAssessmentNumberOnReceipt, amountDue, amountDueInFavourOf,
        receiptDocType, receiptIssuingAuthority, receiptDoorNumberOnReceipt,
        receiptAssessmentNumberOnReceipt, amountPaid, amountPaidInFavourOf,
        mortgageDocType, mortgagorName, mortgageeName, mortgageRegistrationDate,
        mortgageDocNumber, mortgageIssuingAuthority,
        partitionDocType, partitionerName, partitionRecipientName,
        partitionRegistrationDate, partitionDocNumber, partitionIssuingAuthority,
        relinquishDocType, relinquisherName, relinquishRecipientName,
        relinquishRegistrationDate, relinquishDocNumber, relinquishIssuingAuthority,
        saleDocType, sellerName, buyerName, saleRegistrationDate,
        saleDocNumber, saleIssuingAuthority,
        willDocType, testatorName, beneficiaryName,
        willRegistrationDate, willDocNumber, willIssuingAuthority,
        user_id
    } = data;

    const sql = `
        INSERT INTO link_documents (
        "session_id", "selectDeedType",
        "ecDocType", "ecIssuingAuthority", "ecStatementNumber",
        "fromDate", "toDate", "giftDocType", "donorName", "doneeName",
        "giftRegistrationDate", "giftDocNumber", "giftIssuingAuthority",
        "noticeDocType", "noticeIssuingAuthority", "noticeDoorNumberOnReceipt",
        "noticeAssessmentNumberOnReceipt", "amountDue", "amountDueInFavourOf",
        "receiptDocType", "receiptIssuingAuthority", "receiptDoorNumberOnReceipt",
        "receiptAssessmentNumberOnReceipt", "amountPaid", "amountPaidInFavourOf",
        "mortgageDocType", "mortgagorName", "mortgageeName", "mortgageRegistrationDate",
        "mortgageDocNumber", "mortgageIssuingAuthority",
        "partitionDocType", "partitionerName", "partitionRecipientName",
        "partitionRegistrationDate", "partitionDocNumber", "partitionIssuingAuthority",
        "relinquishDocType", "relinquisherName", "relinquishRecipientName",
        "relinquishRegistrationDate", "relinquishDocNumber", "relinquishIssuingAuthority",
        "saleDocType", "sellerName", "buyerName", "saleRegistrationDate",
        "saleDocNumber", "saleIssuingAuthority",
        "willDocType", "testatorName", "beneficiaryName",
        "willRegistrationDate", "willDocNumber", "willIssuingAuthority", "user_id"
        ) VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13,
            $14, $15, $16,
            $17, $18, $19,
            $20, $21, $22,
            $23, $24, $25,
            $26, $27, $28, $29,
            $30, $31,
            $32, $33, $34,
            $35, $36, $37,
            $38, $39, $40,
            $41, $42, $43, $44,
            $45, $46,
            $47, $48, $49,
            $50, $51, $52, $53, $54, $55, $56
        )
        ON CONFLICT (session_id) DO UPDATE SET
            "selectDeedType" = EXCLUDED."selectDeedType",

            "ecDocType" = EXCLUDED."ecDocType",
            "ecIssuingAuthority" = EXCLUDED."ecIssuingAuthority",
            "ecStatementNumber" = EXCLUDED."ecStatementNumber",
            "fromDate" = EXCLUDED."fromDate",
            "toDate" = EXCLUDED."toDate",
            "giftDocType" = EXCLUDED."giftDocType",
            "donorName" = EXCLUDED."donorName",
            "doneeName" = EXCLUDED."doneeName",
            "giftRegistrationDate" = EXCLUDED."giftRegistrationDate",
            "giftDocNumber" = EXCLUDED."giftDocNumber",
            "giftIssuingAuthority" = EXCLUDED."giftIssuingAuthority",
            "noticeDocType" = EXCLUDED."noticeDocType",
            "noticeIssuingAuthority" = EXCLUDED."noticeIssuingAuthority",
            "noticeDoorNumberOnReceipt" = EXCLUDED."noticeDoorNumberOnReceipt",
            "noticeAssessmentNumberOnReceipt" = EXCLUDED."noticeAssessmentNumberOnReceipt",
            "amountDue" = EXCLUDED."amountDue",
            "amountDueInFavourOf" = EXCLUDED."amountDueInFavourOf",
            "receiptDocType" = EXCLUDED."receiptDocType",
            "receiptIssuingAuthority" = EXCLUDED."receiptIssuingAuthority",
            "receiptDoorNumberOnReceipt" = EXCLUDED."receiptDoorNumberOnReceipt",
            "receiptAssessmentNumberOnReceipt" = EXCLUDED."receiptAssessmentNumberOnReceipt",
            "amountPaid" = EXCLUDED."amountPaid",
            "amountPaidInFavourOf" = EXCLUDED."amountPaidInFavourOf",
            "mortgageDocType" = EXCLUDED."mortgageDocType",
            "mortgagorName" = EXCLUDED."mortgagorName",
            "mortgageeName" = EXCLUDED."mortgageeName",
            "mortgageRegistrationDate" = EXCLUDED."mortgageRegistrationDate",
            "mortgageDocNumber" = EXCLUDED."mortgageDocNumber",
            "mortgageIssuingAuthority" = EXCLUDED."mortgageIssuingAuthority",
            "partitionDocType" = EXCLUDED."partitionDocType",
            "partitionerName" = EXCLUDED."partitionerName",
            "partitionRecipientName" = EXCLUDED."partitionRecipientName",
            "partitionRegistrationDate" = EXCLUDED."partitionRegistrationDate",
            "partitionDocNumber" = EXCLUDED."partitionDocNumber",
            "partitionIssuingAuthority" = EXCLUDED."partitionIssuingAuthority",
            "relinquishDocType" = EXCLUDED."relinquishDocType",
            "relinquisherName" = EXCLUDED."relinquisherName",
            "relinquishRecipientName" = EXCLUDED."relinquishRecipientName",
            "relinquishRegistrationDate" = EXCLUDED."relinquishRegistrationDate",
            "relinquishDocNumber" = EXCLUDED."relinquishDocNumber",
            "relinquishIssuingAuthority" = EXCLUDED."relinquishIssuingAuthority",
            "saleDocType" = EXCLUDED."saleDocType",
            "sellerName" = EXCLUDED."sellerName",
            "buyerName" = EXCLUDED."buyerName",
            "saleRegistrationDate" = EXCLUDED."saleRegistrationDate",
            "saleDocNumber" = EXCLUDED."saleDocNumber",
            "saleIssuingAuthority" = EXCLUDED."saleIssuingAuthority",
            "willDocType" = EXCLUDED."willDocType",
            "testatorName" = EXCLUDED."testatorName",
            "beneficiaryName" = EXCLUDED."beneficiaryName",
            "willRegistrationDate" = EXCLUDED."willRegistrationDate",
            "willDocNumber" = EXCLUDED."willDocNumber",
            "willIssuingAuthority" = EXCLUDED."willIssuingAuthority",
             "user_id" = EXCLUDED."user_id"
        RETURNING *;
    `;

    const values = [
        session_id, selectDeedType,
        ecDocType, ecIssuingAuthority, ecStatementNumber,
        fromDate, toDate, giftDocType, donorName, doneeName,
        giftRegistrationDate, giftDocNumber, giftIssuingAuthority,
        noticeDocType, noticeIssuingAuthority, noticeDoorNumberOnReceipt,
        noticeAssessmentNumberOnReceipt, amountDue, amountDueInFavourOf,
        receiptDocType, receiptIssuingAuthority, receiptDoorNumberOnReceipt,
        receiptAssessmentNumberOnReceipt, amountPaid, amountPaidInFavourOf,
        mortgageDocType, mortgagorName, mortgageeName, mortgageRegistrationDate,
        mortgageDocNumber, mortgageIssuingAuthority,
        partitionDocType, partitionerName, partitionRecipientName,
        partitionRegistrationDate, partitionDocNumber, partitionIssuingAuthority,
        relinquishDocType, relinquisherName, relinquishRecipientName,
        relinquishRegistrationDate, relinquishDocNumber, relinquishIssuingAuthority,
        saleDocType, sellerName, buyerName, saleRegistrationDate,
        saleDocNumber, saleIssuingAuthority,
        willDocType, testatorName, beneficiaryName,
        willRegistrationDate, willDocNumber, willIssuingAuthority, user_id
    ];

    const result = await pool.query(sql, values);
    return result.rows[0];
};

const getLinkDocumentsBySessionId = async (session_id) => {
    const result = await pool.query('SELECT * FROM link_documents WHERE session_id = $1;', [session_id]);
    return result.rows[0] || null;
};

const getLinkDocumentsByUserId = async (user_id) => {
  const result = await pool.query(
    'SELECT * FROM link_documents WHERE user_id = $1',
    [user_id]
  );
  return result.rows;
};

  const getLinkDocumentsByName = async (loanProposerName) => {
    const sql = `
      SELECT ld.*
      FROM link_documents ld
      INNER JOIN sessions s ON ld.session_id = s.session_id
      WHERE s."loanProposerName" ILIKE $1
      ORDER BY ld.session_id DESC;
    `;
    const values = [`%${loanProposerName}%`];
    const result = await pool.query(sql, values);
    return result.rows;
  };
    
  
  module.exports = {
    createOrUpdateLinkDocument,
    getLinkDocumentsBySessionId,
    getLinkDocumentsByUserId,
    getLinkDocumentsByName,
  };

