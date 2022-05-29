const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const paths = require('./paths');

function checkRequired() {

    // Warn and crash if required files are missing
    if (paths.multiPage) {
        paths.entriesPath.forEach(({ path, name }) => {
            if (!checkRequiredFiles([paths.appHtml, path])) {
                process.exit(1);
            }
        }) 
    } else {
        if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
            process.exit(1);
        }
    }
}

module.exports = checkRequired;