const { runStream } = require('./streamsLogic');

class StreamModule {
    constructor () {
        this.run = (config) =>runStream(config);
    }
}

exports.StreamModule = StreamModule;