var schema = new Schema(
    {
        name: { type: String, unique: true },
        village: {
            type: String
        },
        logo: {
            type: String
        },
        description: {
            type: String
        }
    },
    {
        timestamps: true
    }
)
export default mongoose.model("Team", schema)
