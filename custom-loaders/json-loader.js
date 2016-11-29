module.exports = function(source) {
    this.cacheable && this.cacheable();

    var value = typeof source === "string" ? JSON.parse(source) : source,
        reg = /^\d+$/;

    Object.keys(value).forEach(function (key) {
        if (reg.test(key)) {
            delete value[key];
        }
    });

    return "module.exports = " + JSON.stringify(value) + ";";
};
