export default {
    /**
     * This function adds one to its input.
     * @param {number} input any number
     * @returns {number} that number, plus one.
     */
    search(data, callback) {
        Player.find({
            team: data.team
        }).exec(callback)
    },
    getOne(data, callback) {
        Player.findOne({
            _id: data.id
        }).exec(callback)
    },
    createPlayer(data, callback) {
        if (data.middleName) {
            data.fullName =
                data.firstName + " " + data.middleName + " " + data.surname
        } else {
            data.fullName = data.firstName + " " + data.surname
        }

        const player = new Player(data)
        player.save(callback)
    },
    delete(data, callback) {
        var obj = {
            _id: data.id
        }
        Player.deleteOne(obj, callback)
    },
    updateData: (param, data, callback) => {
        var data2 = _.cloneDeep(data)
        if (data2._id) {
            delete data2._id
        }
        if (data2.middleName) {
            data2.fullName =
                data2.firstName + " " + data2.middleName + " " + data2.surname
        } else {
            data2.fullName = data2.firstName + " " + data2.surname
        }
        Player.updateOne({ _id: param.id }, { $set: data2 }).exec(callback)
    }
}
