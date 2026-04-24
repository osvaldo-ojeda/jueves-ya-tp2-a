function loger(req, res, next) {
     console.log(`🚀 ~ loger ~ req:`, req.originalUrl)
     next()
}

export default loger