// --------------
// Process Status
// --------------

// required modules
var appColl = require('./app-coll.js');

var coll = appColl({});


module.exports = function(inj) {

	// initialize process info
	inj.status = {
		'pid': process.pid,
		'env': process.env,
		'argv': process.argv,
		'time': process.hrtime()[0],
		'title': process.title,
		'uptime': process.uptime(),
		'execPath': process.execPath,
		'execArgv': process.execArgv,
		'startTime': process.hrtime()[0],
		'mem': {
			'heapTotal': 0,
			'heapUsed': 0,
			'rss': 0
		}
	};

	// initialize runtime process info
	inj.runtime = {
		'time': [],
		'mem': {
			'heapTotal': [],
			'heapUsed': [],
			'rss': []
		}
	};

	// update info
	inj.func.update = function() {
		var pro = inj.status;
		var mem = process.memoryUsage();
		pro.time = process.hrtime()[0];
		pro.uptime = process.uptime();
		pro.mem.heapTotal = mem.heapTotal;
		pro.mem.heapUsed = mem.heapUsed;
		pro.mem.rss = mem.rss;
	};

	// update runtime process info
	inj.func.updateRuntime = function() {
		var pro = inj.runtime;
		var mem = process.memoryUsage();
		coll.add(pro.time, process.hrtime()[0]);
		coll.add(pro.mem.heapTotal, mem.heapTotal);
		coll.add(pro.mem.heapUsed, mem.heapUsed);
		coll.add(pro.mem.rss, mem.rss);
	};

	return inj;
};