let count = 0;
const viewCount = (req, res, next) => {
    count++;
    next();
};
module.exports = viewCount;
