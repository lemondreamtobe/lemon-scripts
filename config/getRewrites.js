const paths = require('./paths');

function getRewrites() {
    if (paths.entriesPath.length) {
        return paths.entriesPath.map(({ name }) => {
            return {
                from: new RegExp(`^\/${name}`),
                to: `/${name}.html`
            }
        })
    } else {
        return [];
    }
}

console.log(getRewrites());
module.exports = getRewrites;