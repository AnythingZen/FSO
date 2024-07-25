require("dotenv").config();

function envIsTest() {
	if (process.env.NODE_ENV === "test") {
		return true;
	}
}

function info(...params) {
	if (envIsTest()) {
		return;
	}
	console.log(params);
}

function error(...params) {
	if (envIsTest()) {
		return;
	}
	console.error(params);
}

module.exports = { info, error };
