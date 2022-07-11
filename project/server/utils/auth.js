exports.extractUser = token => {
    if (token && token !== 'null') {
        return token.split('-')[0];
    }
    return null;
};