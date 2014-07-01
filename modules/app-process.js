/* ----------------------------------------------------------------------- *
 *
 *	 Copyright (c) 2014, Subhajit Sahu
 *	 All rights reserved.
 *
 *   Redistribution and use in source and binary forms, with or without
 *   modification, are permitted provided that the following
 *   conditions are met:
 *
 *   * Redistributions of source code must retain the above copyright
 *     notice, this list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above
 *     copyright notice, this list of conditions and the following
 *     disclaimer in the documentation and/or other materials provided
 *     with the distribution.
 *
 *     THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
 *     CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
 *     INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 *     MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 *     DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *     CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 *     SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *     NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *     LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
 *     HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 *     CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 *     OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 *     EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ----------------------------------------------------------------------- */

/* 
 * ------------------
 * Process Monitoring
 * ------------------
 * 
 * File: app-process.js
 * Project: Web Proxy
 * 
 * Monitors current process and provides information about it.
 * 
 */


// required modules
var mTank = require('./app-tank.js');

// intialize modules
var tank = mTank({});


module.exports = function(inj) {


	// process status
	var status = {
		'name': process.title,
		'time': process.hrtime()[0],
		'start': process.hrtime()[0],
		'uptime': process.uptime(),
		'id': process.pid,
		'env': process.env,
		'arg': process.argv,
		'path': process.execPath,
		'argv': process.execArgv,
		'mem': {
			'rss': 0,
			'heap': {
				'used': 0,
				'total': 0
			}
		}
	};


	// process history
	var history = {
		'time': [],
		'mem': {
			'rss': [],
			'heap': {
				'used': [],
				'total': []
			}
		}
	};


	// inject data
	inj.data.status = status;
	inj.data.history = history;


	// update status
	inj.code.updateStatus = function() {
		var mem = process.memoryUsage();
		status.time = process.hrtime()[0];
		status.uptime = process.uptime();
		status.mem.rss = mem.rss;
		status.mem.heap.used = mem.heapUsed;
		status.mem.heap.total = mem.heapTotal;
	};


	// update history
	inj.code.updateHistory = function() {
		var mem = process.memoryUsage();
		tank.add(history.time, process.hrtime()[0]);
		tank.add(history.mem.rss, mem.rss);
		tank.add(history.mem.heap.used, mem.heapUsed);
		tank.add(history.mem.heap.total, mem.heapTotal);
	};


	return inj;
};
