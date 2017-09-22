'use strict';

const EventEmitter = require('events');

class DirWatcher extends EventEmitter {
    watch(path, delay) {
        const chokidar = require('chokidar');
        var watcher = chokidar.watch(path, {
            usePolling: true,
            interval: delay
        });
        watcher.on('all', () => {
            this.emit('dirwatcher:changed');
        });
    }
}

exports.DirWatcher = DirWatcher;