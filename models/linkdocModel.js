const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const createOrUpdateLinkDocument = async (data) => {
    const {
        session_id, ecdoctype, ecissuingauthority, ecstatementnumber,
        fromdate, todate, giftdoctype, donorname, doneename,
        giftregistrationdate, giftdocnumber, giftissuingauthority,
        noticedoctype, noticeissuigauthority, noticedoornumberonreceipt,
        noticeassessmentnumberonreceipt, amountdue, amountdueinfavourof,
        receiptdoctype, receiptissuingauthority, receiptdoornumberonreceipt,
        receiptassessmentnumberonreceipt, amountpaid, amountpaidinfavourof,
        mortgagedoctype, mortgagorname, mortgageename, mortgageregistrationdate,
        mortgagedocnumber, mortgageissuingauthority,
        partitiondoctype, partitionername, partitionrecipientname,
        partitionregistrationdate, partitiondocnumber, partitionissuingauthority,
        relinquishdoctype, relinquishername, relinquishrecipientname,
        relinquishregistrationdate, relinquishdocnumber, relinquishissuingauthority,
        saledoctype, sellername, buyername, saleregistrationdate,
        saledocnumber, saleissuingauthority,
        willdoctype, testatorname, beneficiaryname,
        willregistrationdate, willdocnumber, willissuingauthority
    } = data;

    const sql = `
        INSERT INTO link_documents (
            session_id, ecdoctype, ecissuingauthority, ecstatementnumber,
            fromdate, todate, giftdoctype, donorname, doneename,
            giftregistrationdate, giftdocnumber, giftissuingauthority,
            noticedoctype, noticeissuingauthority, noticedoornumberonreceipt,
            noticeassessmentnumberonreceipt, amountdue, amountdueinfavourof,
            receiptdoctype, receiptissuingauthority, receiptdoornumberonreceipt,
            receiptassessmentnumberonreceipt, amountpaid, amountpaidinfavourof,
            mortgagedoctype, mortgagorname, mortgageename, mortgageregistrationdate,
            mortgagedocnumber, mortgageissuingauthority,
            partitiondoctype, partitionername, partitionrecipientname,
            partitionregistrationdate, partitiondocnumber, partitionissuingauthority,
            relinquishdoctype, relinquishername, relinquishrecipientname,
            relinquishregistrationdate, relinquishdocnumber, relinquishissuingauthority,
            saledoctype, sellername, buyername, saleregistrationdate,
            saledocnumber, saleissuingauthority,
            willdoctype, testatorname, beneficiaryname,
            willregistrationdate, willdocnumber, willissuingauthority
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
            $50, $51, $52, $53, $54
        )
        ON CONFLICT (session_id) DO UPDATE SET
            ecdoctype = EXCLUDED.ecdoctype,
            ecissuingauthority = EXCLUDED.ecissuingauthority,
            ecstatementnumber = EXCLUDED.ecstatementnumber,
            fromdate = EXCLUDED.fromdate,
            todate = EXCLUDED.todate,
            giftdoctype = EXCLUDED.giftdoctype,
            donorname = EXCLUDED.donorname,
            doneename = EXCLUDED.doneename,
            giftregistrationdate = EXCLUDED.giftregistrationdate,
            giftdocnumber = EXCLUDED.giftdocnumber,
            giftissuingauthority = EXCLUDED.giftissuingauthority,
            noticedoctype = EXCLUDED.noticedoctype,
            noticeissuingauthority = EXCLUDED.noticeissuingauthority,
            noticedoornumberonreceipt = EXCLUDED.noticedoornumberonreceipt,
            noticeassessmentnumberonreceipt = EXCLUDED.noticeassessmentnumberonreceipt,
            amountdue = EXCLUDED.amountdue,
            amountdueinfavourof = EXCLUDED.amountdueinfavourof,
            receiptdoctype = EXCLUDED.receiptdoctype,
            receiptissuingauthority = EXCLUDED.receiptissuingauthority,
            receiptdoornumberonreceipt = EXCLUDED.receiptdoornumberonreceipt,
            receiptassessmentnumberonreceipt = EXCLUDED.receiptassessmentnumberonreceipt,
            amountpaid = EXCLUDED.amountpaid,
            amountpaidinfavourof = EXCLUDED.amountpaidinfavourof,
            mortgagedoctype = EXCLUDED.mortgagedoctype,
            mortgagorname = EXCLUDED.mortgagorname,
            mortgageename = EXCLUDED.mortgageename,
            mortgageregistrationdate = EXCLUDED.mortgageregistrationdate,
            mortgagedocnumber = EXCLUDED.mortgagedocnumber,
            mortgageissuingauthority = EXCLUDED.mortgageissuingauthority,
            partitiondoctype = EXCLUDED.partitiondoctype,
            partitionername = EXCLUDED.partitionername,
            partitionrecipientname = EXCLUDED.partitionrecipientname,
            partitionregistrationdate = EXCLUDED.partitionregistrationdate,
            partitiondocnumber = EXCLUDED.partitiondocnumber,
            partitionissuingauthority = EXCLUDED.partitionissuingauthority,
            relinquishdoctype = EXCLUDED.relinquishdoctype,
            relinquishername = EXCLUDED.relinquishername,
            relinquishrecipientname = EXCLUDED.relinquishrecipientname,
            relinquishregistrationdate = EXCLUDED.relinquishregistrationdate,
            relinquishdocnumber = EXCLUDED.relinquishdocnumber,
            relinquishissuingauthority = EXCLUDED.relinquishissuingauthority,
            saledoctype = EXCLUDED.saledoctype,
            sellername = EXCLUDED.sellername,
            buyername = EXCLUDED.buyername,
            saleregistrationdate = EXCLUDED.saleregistrationdate,
            saledocnumber = EXCLUDED.saledocnumber,
            saleissuingauthority = EXCLUDED.saleissuingauthority,
            willdoctype = EXCLUDED.willdoctype,
            testatorname = EXCLUDED.testatorname,
            beneficiaryname = EXCLUDED.beneficiaryname,
            willregistrationdate = EXCLUDED.willregistrationdate,
            willdocnumber = EXCLUDED.willdocnumber,
            willissuingauthority = EXCLUDED.willissuingauthority
        RETURNING *;
    `;

    const values = [
        session_id, ecdoctype, ecissuingauthority, ecstatementnumber,
        fromdate, todate, giftdoctype, donorname, doneename,
        giftregistrationdate, giftdocnumber, giftissuingauthority,
        noticedoctype, noticeissuigauthority, noticedoornumberonreceipt,
        noticeassessmentnumberonreceipt, amountdue, amountdueinfavourof,
        receiptdoctype, receiptissuingauthority, receiptdoornumberonreceipt,
        receiptassessmentnumberonreceipt, amountpaid, amountpaidinfavourof,
        mortgagedoctype, mortgagorname, mortgageename, mortgageregistrationdate,
        mortgagedocnumber, mortgageissuingauthority,
        partitiondoctype, partitionername, partitionrecipientname,
        partitionregistrationdate, partitiondocnumber, partitionissuingauthority,
        relinquishdoctype, relinquishername, relinquishrecipientname,
        relinquishregistrationdate, relinquishdocnumber, relinquishissuingauthority,
        saledoctype, sellername, buyername, saleregistrationdate,
        saledocnumber, saleissuingauthority,
        willdoctype, testatorname, beneficiaryname,
        willregistrationdate, willdocnumber, willissuingauthority
    ];

    const result = await pool.query(sql, values);
    return result.rows[0];
};

const getLinkDocumentBySessionId = async (session_id) => {
    const result = await pool.query('SELECT * FROM link_documents WHERE session_id = $1;', [session_id]);
    return result.rows[0] || null;
};

module.exports = {
    createOrUpdateLinkDocument,
    getLinkDocumentBySessionId,
};
