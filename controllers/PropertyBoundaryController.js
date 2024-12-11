const PropertyBoundaryModel = require('../models/PropertyBoundaryModel');

const addPropertyBoundary = async(req,res)=>{

    const{session_id,eastBoundrytype,eastBoundryExtent,eastBoundryOwner,westBoundrytype,westBoundryExtent,westBoundryOwner,northBoundrytype,northBoundryExtent,northBoundryOwner,southBoundrytype,southBoundryExtent,southBoundryOwner} = req.body;
    try{
        const propBoundary = await PropertyBoundaryModel.createPropertyboundary([
            session_id,
            eastBoundrytype,
            eastBoundryExtent,
            eastBoundryOwner,
            westBoundrytype,
            westBoundryExtent, 
            westBoundryOwner,
            northBoundrytype,
            northBoundryExtent,
            northBoundryOwner,
            southBoundrytype,
            southBoundryExtent,
            southBoundryOwner
        ]);
        
        res.send({propBoundary,message:'PropertyBoundary added sucessfully'});                                                    
    }
    catch(err){
        console.error('Error adding property Boundary:',err.stack);
        res.status(500).send('Error adding Property Boundary');
    }
};

const retrivePropertyBoundaries = async(req,res) => {
    try{
           const prop_Boundary = await PropertyBoundaryModel.getPropertyboundaries();
           res.send(prop_Boundary);
    }
    catch(err){
        console.error('Error retrieving property boundary :' , err.stack);
        res.status(500).send('Error retrieving property Boundary');
    }
};

module.exports = {
    addPropertyBoundary,
    retrivePropertyBoundaries,
};


