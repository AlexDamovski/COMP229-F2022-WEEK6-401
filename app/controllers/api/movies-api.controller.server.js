import moviesModel from '../../models/movies.js';

export function GetList(req,res,next){
    moviesModel.find((err, moviesCollection) =>{
        if(err){
            console.error(err);
            res.end(err);
        }
        res.json({success: true, msg: 'Success', movies: moviesCollection, user: req.user})
    });
}

export function Get(req,res,next){
    let id = req.params.id;

    moviesModel.findById(id,(err,movie)=>{
        if(err){
            console.error(err);
            res.end(err);
        }
        res.json({success: true, msg: 'Success', movie, user: req.user})
    })
}

export function Add(req,res,next){
    let newMovie = moviesModel({
        ...req.body
    });
    moviesModel.create(newMovie, (err)=>{
        if(err){
            console.error(err);
            res.end(err);
        }
        res.json({success: true, msg: 'Success', newMovie})
    })
}

export function Edit(req,res,next){
    let id = req.params.id;

    let updatedMovie = new moviesModel({
        "_id": id,
        ...req.body
    });

    moviesModel.updateOne({_id: id}, updatedMovie, (err)=>{
        if(err){
            console.error(err);
            res.end(err);
        }
        res.json({success: true, msg: 'Success', updatedMovie})
    })
}

export function Delete(req,res,next){
    let id = req.params.id;

    moviesModel.remove({_id:id}, (err) =>{
        if(err){
            console.error(err);
            res.end(err);
        }
    })
    res.json({success: true, msg: "Movie Deleted" });
}