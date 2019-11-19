export default {
    /**
     * This function adds one to its input.
     * @param {number} input any number
     * @returns {number} that number, plus one.
     */
    search(data, callback) {
        var skipVal = 0
        var pageLimit = 10
        if (data.page) {
            skipVal = (data.page - 1) * pageLimit
        }
        var filter = {}
        if (data.name) {
            filter = {
                username: {
                    $regex: data.name,
                    $options: "i"
                }
            }
        }
        async.parallel(
            {
                result: function(callback) {
                    User.find(filter)
                        .skip(skipVal)
                        .limit(pageLimit)
                        .exec(callback)
                },
                count: function(callback) {
                    User.countDocuments(filter).exec(callback)
                }
            },
            callback
        )
    },
    getOne(data, callback) {
        User.findOne({
            _id: data.id
        }).exec(callback)
    },
    createUser(data, callback) {
        const user = new User(data)
        user.save(callback)
    },
    delete(data, callback) {
        var obj = {
            _id: data.id
        }
        User.deleteOne(obj, callback)
    },
    updateData: (param, data, callback) => {
        var data2 = _.cloneDeep(data)
        if (data2._id) {
            delete data2._id
        }
        User.updateOne({ _id: param.id }, { $set: data2 }).exec(callback)
    },
    login(data, callback) {
        const uuid = require("uuidv4").default
        async.waterfall(
            [
                function(callback) {
                    User.findOne({
                        username: data.username,
                        password: data.password
                    }).exec(function(err, data2) {
                        if (err) {
                            callback(err)
                        } else if (_.isEmpty(data2)) {
                            callback("No Data Found", null)
                        } else {
                            callback(null, data2)
                        }
                    })
                },
                function(user, callback) {
                    user.accessToken.push({
                        token: uuid(),
                        expiry: moment().add(1, "M")
                    })
                    user.save(callback)
                }
            ],
            callback
        )
    }
}
