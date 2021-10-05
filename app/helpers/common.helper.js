const nanoId = require('nanoid')


module.exports = {
    generateRandomNumber: () => {
        return (new Date().getMonth()) + (new Date().getDate()) + nanoId.nanoid(6)
    }
}