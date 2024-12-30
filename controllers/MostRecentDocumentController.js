const MostRecentDocumentModel = require('../models/MostRecentDocumentModel');

const addMostRecentDocument = async(req,res)=>{
    const{"session_id":session_id,
        "selectDeedType":selectDeedType, 
        "dateofRegistration":dateofRegistration, 
        "documentNumber":documentNumber, 
        "nameofSubregistrarOffice":nameofSubregistrarOffice, 
        "locationOfSubregistrarOffice":locationOfSubregistrarOffice, 
        "subregistrarOfficeMandal":subregistrarOfficeMandal, 
        "subregistrarOfficeDistrict":subregistrarOfficeDistrict, 
        "subregistrarOfficeLocalAuthority":subregistrarOfficeLocalAuthority} = req.body;
    
      
          
    const validselectdeedtype = ["SaleDeed", "GiftDeed", "WillDeed", "RelinquishmentDeed", "MortgageDeed", "PartitionDeed"];  
    if (!validselectdeedtype.includes(selectDeedType)) {
        return res.status(400).send({
            statusCode:400,
            message:`Invalid Deed Type. Valid options are: ${validselectdeedtype.join(", ")}`
    });
    }
    try{
        const MRDocument= await MostRecentDocumentModel.createMostRecentDoc([session_id,selectDeedType, dateofRegistration, documentNumber, nameofSubregistrarOffice, locationOfSubregistrarOffice, subregistrarOfficeMandal, subregistrarOfficeDistrict, subregistrarOfficeLocalAuthority
]);
        res.status(200).send({
            statusCode:200,
            data:MRDocument,
            message:' MostRecentDocument added sucessfully'
        });                                                    
    }
    catch(err){
        console.error('Error adding MostRecentDocument:',err.stack);
        res.status(500).send({
            statusCode:500,
            message:'Error adding MostRecentDocument',
            error:err.stack
    });

    }
};

const retriveMostRecentDocuments= async(req,res) => {
    try{
           const M_S_Document= await MostRecentDocumentModel. getMostRecentDocs();

           res.status(200).send({
            statusCode:200,
            data:M_S_Document,
            message:'Most Recent Documents added successfully!'
    });
    }
    catch(err){
        console.error('Error retrieving MostRecentDocument:' , err.stack);
        res.status(500).send({
            statusCode:500,
            message:'Error retrieving MostRecentDocument',
            error:err.stack
    });

    }
};

module.exports = {
    addMostRecentDocument,
    retriveMostRecentDocuments,
};




