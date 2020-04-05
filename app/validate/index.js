module.exports = app =>{
    const { validator } = app;
    validator.addRule('uuid', (rule, value)=>{ 
        // value就是待检验的数据
        if (!(typeof value === 'string' && value.length === 36)) {
          return "uuid应该是字36符串";
        }
    });
};
