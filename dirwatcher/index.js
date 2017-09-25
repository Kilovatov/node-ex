const EventEmitter = require('events');
const chokidar = require('chokidar');

class DirWatcher extends EventEmitter {
    watch(path, delay) {
        const watcher = chokidar.watch(path, {
            usePolling: true,
            interval: delay
        });
        watcher.on('all', () => {
            this.emit('dirwatcher:changed', path);
        });
    }
}

exports.DirWatcher = DirWatcher;