var schema = new Schema(
    {
        address: String,
        officeAddress: String,
        mapLink: String,
        mobile: [
            {
                name: String,
                phone: Number
            }
        ],
        email: [String],
        social: [String]
    },
    {
        timestamps: true
    }
)
export default mongoose.model("Contact", schema)
