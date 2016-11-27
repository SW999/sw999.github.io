module.exports = function(source) {
	this.cacheable && this.cacheable();

	Number.isNaN = Number.isNaN || function(value) {
		return typeof value === 'number' && isNaN(value);
	}

	var value = typeof source === "string" ? JSON.parse(source, function(k, v) {
		if(k === '') {
			return v;
		}
		if(Number.isNaN(Number(k))) {
			return v;
		}
	}) : source;

	this.value = [value];

	return "module.exports = " + JSON.stringify(value) + ";";
}
