// Logger
// ------
// 
// Provides a log module that can be used to log information. Multiple
// types of logs can be used but all logs are output into the console.


module.exports = function(dep, inj) {
	// initialize
	var o = {};
	o.data = [];
	try      { o.maxLen = dep.maxLen; }
	catch(e) { o.maxLen = 32; }


	// clear logs
	o.clear = function() {
		o.data = [];
	};


	// add new log and send to console
	o.write = function(msg) {
		if(o.data.length >= o.maxLen) o.data.shift();
		o.data[o.data.length] = msg;
		console.log(msg);
	}


	// return
	if(typeof inj !== 'undefined') {
		inj.data   = o.data;
		inj.maxLen = o.maxLen;
	}
	return o;
};
