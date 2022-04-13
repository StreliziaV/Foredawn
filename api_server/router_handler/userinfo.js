const db = require('../DB/index')

exports.getUserInfo = function(req, res) {
    const sqlStr1 = 'select id, username, email, user_pic, from users where id = ?'
    db.query(sqlStr1, req.user.id, function(err, results) {
        if (err) return results.cc(err)
        if (results.length !== 1) return res.cc('Fail to get userinfo.')
        res.send({
            status: 0,
            message: 'Get userinfo successfully!',
            data: results[0]
        })
    })
}

exports.updateUserInfo = function(req, res) {
    const sqlStr2 = 'update users set ? where id = ?'
    db.query(sqlStr2, [req.body, req.body.id], function(err, results){
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('Fail to update userinfo.')
        return res.cc ('Update userinfo successfully!', 0)
    })
}

exports.updatePassword = function(req, res){
    const sqlStr3 = 'select * from users where id = ?'
    const sqlStr4 = 'update users set password = ? where id = ?'
    db.query(sqlStr3, req.user.id, function(req, res){
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('The user is not exist.')
        if (req.body.oldPwd !== results[0].password) return res.cc('Wrong password.')
    })
    db.query(sqlStr4, [newPwd, req.user.id], function(err, results){
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('Fail to update password.')
        return res.cc('Update password successfully!', 0)
    })
}

exports.updateAvatar = function(req, res) {
    const sqlStr5 = 'update users set user_pic = ? where id = ?'
    db.query(sqlStr5, [req.body.avatar, req.user.id], function(err, results){
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('Fail to update avatar.')
        return res.cc('Update avatar successfully!', 0)
    })
}