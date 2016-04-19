const syslogParser = require('glossy').Parse;


require('net').createServer(function (socket) {
    socket.on('data', function (data) {
        const raw_message = data.toString('utf8', 0);
        syslogParser.parse(raw_message, function (log_message) {
          const time = log_message.time;
          const host = log_message.host
          const container = log_message.appName;
          const pid = log_message.pid;
          const message = log_message.message.trim()
          console.log("time =", time, "host =", host, "container =", container, "pid =", pid, "message =", message);
        });
    });
}).listen(5554);
