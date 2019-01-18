const { ObjectID } = require('mongodb');
var compile = require('monquery')
function objectIdWithTimestamp(timestamp) {
    if (typeof (timestamp) == 'string') {
        timestamp = new Date(timestamp);
    }
    return ObjectID.createFromTime(timestamp / 1000)
}
module.exports = (collection, limit = 20, _conditions = {}) => ({ query: { before, after, range, search, pageSize = limit } }) => {
    const conditions = Object.assign({}, _conditions)
    if (pageSize > limit) pageSize = limit
    else {
        pageSize =
            pageSize >> 0
    }
    if (range) {
        ([after, before] = range.split(','));
        after = objectIdWithTimestamp(+after)
        before = objectIdWithTimestamp(+before)
    }
    if (before || after) {
        const _id = {}
        if (before) _id.$lt = typeof before == 'string' ? ObjectID(before) : before
        if (after) _id.$gt = typeof after == 'string' ? ObjectID(after) : after
        conditions._id = _id
    }
    if (search) {
        search = compile(search)
        for (const key in search) {
            if (key in conditions) {
                if (conditions[key] instanceof Array) {
                    conditions[key].push(...search[key])
                } else {
                    conditions[key] = search[key]
                }
            } else {
                conditions[key] = search[key]
            }
        }
    }
    console.log(conditions)
    return collection.find(conditions).sort({ _id: -1 }).limit(pageSize).toArray()
}