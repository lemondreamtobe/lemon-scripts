
const paths = require('./paths');

// 获取多页面入口
function getMultiPageEntry() {
    
    if (paths.entriesPath.length) {
        return paths.entriesPath.reduce((acc, cur) => {
            acc[cur.name] =  cur.path;
            return acc;
        }, {})
    } else {
        return {};
    }
}

const multiPageEntry = getMultiPageEntry();
const singleEntry = paths.appIndexJs;
const finalEntry = paths.multiPage ? multiPageEntry : singleEntry;
module.exports = finalEntry