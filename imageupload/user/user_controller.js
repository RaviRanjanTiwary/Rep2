var userdb = require('./user_model');
var controller = {};
console.log('welcome in controller');
controller.signup = function(req, res){
    if(!req.body){
        console.log('please enter data in body ');
    }else{
        userdb.find({phone_no:req.body.phone_no},function(err, data){
            if (err) throw err;
            else{
                if (data.length){
                    console.log('ravicheck', data[0].statuse);
                    if(data[0].statuse==false){
                        console.log('ifstatement');
                        userdb.remove({
                            _id: data[0]._id
                        },function(err){
                            if(err) throw err;
                            else{
                                new_user = new userdb(req.body);
                                new_user.save(function(err, task){
                                    if(err) throw err;
                                    else{
                                        res.status(200).json({
                                            data: task
                                        })
                                    }
                                })
                            }
                        })
                    }else{
                        res.status(400).json({
                            message:'choose another mobile number'
                        })
                    }
                }else{
                    new_user = new userdb(req.body);
                    new_user.save(function(err, task){
                        if(err) throw err;
                        else{
                            res.status(200).json({
                                data: task
                            })
                        }
                    }) 
                }
            }
        })
    }
}

controller.signin = function(req, res){
    console.log('sigin');
    userdb.find({}, function(err, data){
        console.log('hii ravi');
        if(err) throw err;
        else{
            if(!data.length){
                res.status(400).json({
                    message:'data not found'
                })
            } else{
                res.status(200).json({
                    data:data
                })
            }
        }
    })
}
controller.imageupdate = function(req, res){
    userdb.update({_id:req.body.id},{$set:{img:req.file.filename}},{new: true},function(err, data){
        if(err) throw err;
        else{
            res.status(200).json({
                data:data
            })
        }
    })
}

module.exports = controller;