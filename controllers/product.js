const models = require("../models");
const cloudinary = require('cloudinary');

exports.create = (req,res) => {
    body = req.body;
    cloudinary.uploader.upload(req.files.cover.path, function(result) { 
        let p = new models.product({
            code:body.code.toLowerCase(),
            price:body.price.toLowerCase(),
            transa:body.transa.toLowerCase(),
            type:body.type.toLowerCase(),
            region:body.region.toLowerCase(),
            comuna:body.comuna.toLowerCase(),
            title:body.title.toLowerCase(),
            cover:result.secure_url,
            images:[],
            dormitorios:parseInt(body.dormitorios),
            banos:parseInt(body.banos),
            meters:parseInt(body.meters),
            metersUtils:parseInt(body.metersUtils),
            destacado:Boolean(body.destacado),
            description:body.description,
            estracto:body.estracto
        });

        p.save((err,result) => {
            if(err){
                return res.status(500).json({state:"error",data:[]});
            } else {
                return res.status(200).json({state:"succes",data:result});
            }
        })
    });
}

exports.addGallery = (req,res) => {
    cloudinary.uploader.upload(req.files.image.path, function(result) { 
        models.product.findByIdAndUpdate(req.params.id,
            {$push: {"images": {img:result.secure_url}}},
            {safe: true, upsert: true},
            function(err, response) {
                if(err) {
                    return res.status(500).json({state:"error", data: []});
                }
                else {
                    return res.status(200).json({state: "success", data: response});
                }
            }
        );
    });
}



exports.filter = (req,res) => {

    let perPage = 9
    let page = req.params.page || 1
    let region = req.params.region.toLowerCase();
    let comuna = req.params.comuna.toLowerCase();
    let transa = req.params.transa.toLowerCase();
    let type = req.params.type.toLowerCase();

    models.product.find({region:region,comuna:comuna,transa:transa,type:type}).skip((perPage * page) - perPage).limit(perPage)
        .exec(function(err, products) {
            models.product.count()
                .exec(function(err, count) {
                    if(err) {
                        return res.status(500).json({state:"error", data: []});
                    }
                    else {
                        return res.status(200).json({state: "success", data: {
                            products: products,
                            current: page,
                            pages: Math.ceil(count / perPage)
                        }});
                    }
                })
    })
}

exports.destacados = (req,res) => {
    models.product.find({destacado:true},(err,response) => {
        if(err) {
            return res.status(500).json({state:"error", data: []});
        }
        else {
            return res.status(200).json({state: "success", data: response});
        }
    })
}


exports.ficha = (req,res) => {
    models.product.findOne({code:req.params.code.toLowerCase()},(err,response) => {
        if(err) {
            return res.status(500).json({state:"error", data: []});
        }
        else {
            return res.status(200).json({state: "success", data: response});
        }
    })
}


exports.allData = (req,res) => {
    models.product.find((err,response) => {
        if(err) {
            return res.status(500).json({state:"error", data: []});
        }
        else {
            return res.status(200).json({state: "success", data: response,total:response.length});
        }
    })
}


exports.deleteGallery = (req,res) =>{
	models.product.findOne({'images._id': req.params.id}, function (err, result) {
        result.gallery.id(id).remove();
        result.save((err) => {
			if(err) {
				return res.status(500).json({status:"error",  data:[]})
			}
			else {
				return res.status(200).json({status: "success", data:[]})
			}
		});            
    });
}

exports.delete = (req,res) => {
    models.product.remove({_id: req.params.id},err => {
      if(err){
          return res.status(500).json({status: 'error'})
        } 
      else{ 
          return res.status(200).json({status:'success'})
        }
   })
}

exports.update = (req,res) => {
    let body = req.body;
    let data = new models.product({
        _id: req.params.id,
        price:body.price.toLowerCase(),
        transa:body.transa.toLowerCase(),
        type:body.type.toLowerCase(),
        region:body.region.toLowerCase(),
        comuna:body.comuna.toLowerCase(),
        title:body.title.toLowerCase(),
        dormitorios:parseInt(body.dormitorios),
        banos:parseInt(body.banos),
        meters:parseInt(body.meters),
        metersUtils:parseInt(body.metersUtils),
        destacado:Boolean(body.destacado),
        description:body.description,
        estracto:body.estracto
    });

    models.product.update({_id: req.params.id},data,(err,response) =>{
        if(err){ 
            return res.status(500).json({status: 'error'});
        } 
        else{ 
            return res.status(200).json({status:'success'});
        }
    })	
}

exports.updateCover = (req,res) => {
    cloudinary.uploader.upload(req.files.cover.path, function(result) { 
        let p = new models.product({
            cover:result.secure_url,
        });

        models.product.update({_id: req.params.id},p,(err,response) =>{
            if(err){ 
                return res.status(500).json({status: 'error'});
            } 
            else{ 
                return res.status(200).json({status:'success'});
            }
        })	
    });
}