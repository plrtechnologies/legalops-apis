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
        return res.status(400).send(`Invalid Deed Type. Valid options are: ${validselectdeedtype.join(", ")}`);
    }
    try{
        const MRDocument= await MostRecentDocumentModel.createMostRecentDoc([session_id,selectDeedType, dateofRegistration, documentNumber, nameofSubregistrarOffice, locationOfSubregistrarOffice, subregistrarOfficeMandal, subregistrarOfficeDistrict, subregistrarOfficeLocalAuthority
]);
        res.send({MRDocument,message:' MostRecentDocument added sucessfully'});                                                    
    }
    catch(err){
        console.error('Error adding MostRecentDocument:',err.stack);
        res.status(500).send('Error adding MostRecentDocument');
    }
};

const retriveMostRecentDocuments= async(req,res) => {
    try{
           const M_S_Document= await MostRecentDocumentModel. getMostRecentDocs();
           res.send(M_S_Document);
    }
    catch(err){
        console.error('Error retrieving MostRecentDocument:' , err.stack);
        res.status(500).send('Error retrieving MostRecentDocument ');
    }
};

module.exports = {
    addMostRecentDocument,
    retriveMostRecentDocuments,
};




