class QueryParser {
    static parse(query) {
        const queryStr = JSON.stringify(query)

        return JSON.parse(queryStr.replace(/\b(regex|options)\b/g, match => `$${match}`))
    }
}

module.exports = QueryParser