import * as config from 'config'

export = function () {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
    if (!config.get('fontendUrl')) {
        throw new Error('FATAL ERROR: fontendUrl is not defined.');
    }
}