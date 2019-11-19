export default {
    /**
     * This function adds one to its input.
     * @param {number} input any number
     * @returns {number} that number, plus one.
     */
    search(data, callback) {
        Student.find().exec(callback)
    },
    getOne(data, callback) {
        Setting.findOne({
            _id: data.id
        }).exec(callback)
    },
    createSetting(data, callback) {
        const setting = new Setting(data)
        setting.save(callback)
    },
    delete(data, callback) {
        var obj = {
            _id: data.id
        }
        Setting.deleteOne(obj, callback)
    },
    updateData: (param, data, callback) => {
        var data2 = _.cloneDeep(data)
        if (data2._id) {
            delete data2._id
        }
        Setting.updateOne({ _id: param.id }, { $set: data2 }).exec(callback)
    }
}
