// !Review - the Front-End requiring id instead of _id made a difference
// in how this was written - double check this!

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: String,
            cpu: String,
            gpu: String,
            cost: Number,
            yearbuilt: String,
            working: Boolean
        },
        { timestamps: true }
    );

    schema.method('toJSON', function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    })

    const Desktop = mongoose.model('desktop', schema);
    return Desktop;
};