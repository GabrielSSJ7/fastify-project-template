var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('debug', false);
mongoose.set('useFindAndModify', false);
mongoose.set('runValidators', true);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;
const connection = mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true, promiseLibrary: global.Promise });
connection
	.then(db => {
		return db;
	})
	.catch(err => {
		if (err.message.code === 'ETIMEDOUT') {
			mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true, promiseLibrary: global.Promise });
		} else {
			console.log('Error while attempting to connect to database:', err);
		}
	});

module.exports = connection