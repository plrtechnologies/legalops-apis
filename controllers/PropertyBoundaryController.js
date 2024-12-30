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
        
        res.status(200).send({
            statusCode:200,
            data:propBoundary,
            message:'PropertyBoundary added sucessfully'
        });                                                    
    }
    catch(err){
        console.error('Error adding property Boundary:',err.stack);
        res.status(500).send({
        statusCode:500,
        message:'Error adding Property Boundary',
        error:err.stack
     });
    }
};

const retrivePropertyBoundaries = async(req,res) => {
    try{
           const prop_Boundary = await PropertyBoundaryModel.getPropertyboundaries();
           if(prop_Boundary.length===0){
            return res.status(404).send({
                statusCode:404,
                message:'No properties found'
            });
        }
    
           res.status(200).send({
            statusCode:200,
            message:'Property Boundaries added successfully!',
            data:prop_Boundary
    });
    }
    catch(err){
        console.error('Error retrieving property boundary :' , err.stack);
        res.status(500).send({
            statusCode:500,
            message:'Error retrieving property Boundary',
        error:err.stack
    });

    }
};

module.exports = {
    addPropertyBoundary,
    retrivePropertyBoundaries,
};


