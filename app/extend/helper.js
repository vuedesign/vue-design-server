
const code = require('../constants/code');

module.exports.initListParams = function(params) {
    const { query } = params;
    const page = query.page ? parseInt(query.page) : 1;
    const size = query.size ? parseInt(query.size) : 20;
    const offset = (page - 1) * size;
    const order = [['created_at', 'DESC']];
    const where = { is_delete: 0 };
    Object.assign(where, params.where);
    delete params.where;
    const defaultParams = { limit: size, offset, order, where };
    delete params.query;
    return {
        options: Object.assign(defaultParams, params),
        pagination: { page, size }
    };
};

module.exports.responseHandler = function(res, options = {}) {
    const code = res ? (options.successCode || code.RET_CODE_SUCCESS) : (options.errorCode || code.RET_CODE_ERROR);
    const message = res ? (options.success || 'success') : (options.error || 'error');
    return {
        code,
        data: res,
        message
    };
};
