
const constantsCode = require('../constants/code');

module.exports.initListParams = function(params) {
    const { query } = params;
    const page = query.page ? parseInt(query.page) : 1;
    const size = query.size ? parseInt(query.size) : 20;
    const offset = (page - 1) * size;
    const order = [['updatedAt', 'ASC']];
    const where = { isDelete: 0 };
    delete query.page;
    delete query.size;
    if (query.timestamp) {
        delete query.timestamp;
    }
    Object.assign(where, query);
    const defaultParams = { limit: size, offset, order, where };
    return {
        options: Object.assign(defaultParams, params),
        pagination: { page, size }
    };
};

module.exports.responseHandler = function(res, options = {}) {
    const code = res ? (options.successCode || constantsCode.RET_CODE_SUCCESS) : (options.errorCode || constantsCode.RET_CODE_ERROR);
    const message = res ? (options.success || 'success') : (options.error || 'error');
    console.log('code', code);
    return {
        code,
        data: res,
        message
    };
};
