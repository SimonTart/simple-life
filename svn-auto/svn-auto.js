const exec = require("child_process").exec;
const argv = require("process").argv;

let run = function (command, options) {
    return new Promise((resolve, reject) => {
        exec(command, options, (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }
            if (stderr) {
                reject(stderr);
                return;
            }
            resolve(stdout);
        });
    });
}

let promiseIter = function (promises) {
    return new Promise((resolve, reject) => {
        nextPromise(0, promises);
        function nextPromise(index, promises) {
            let length = promises.length;
            if (index >= length) {
                resolve();
            }
            promises[index]()
                .then(() => {
                    nextPromise(index + 1, promises);
                })
                .catch((err) => {
                    reject(err);
                })
        }
    });
}

let setStatus = function (statusArr) {
    console.log("------ svn add&remove files&folders ----");
    let statusPromises = statusArr.map((status) => {
        return function () {
            let path = status.match(/[?!]\s+([^\s]*)/)[1];
            if (status.charAt(0) === "?") {
                let addCommand = `svn add ${path}`;
                return run(`svn add ${path}`)
                    .then((stdout) => {
                        console.log(stdout);
                    })
                    .catch((err) => {
                        console.log(`${addCommand} error:\n${err}`)
                    });
            } else {
                let removeCommand = `svn delete ${path}`;
                return run(removeCommand)
                    .then((stdout) => {
                        console.log(stdout);
                    })
                    .catch((err) => {
                        console.log(`${removeCommand} error:\n${err}`)
                    });
            }
        }
    });
    return promiseIter(statusPromises);
}

let svnCommit = function (message) {
    console.log("---- svn commit ----");
    console.log(`svn commit -m ${message}`);
    run(`svn commit -m ${message}`)
        .then((stdout) => {
            console.log(stdout)
        })
        .catch((err) => {
            console.log(`svn commit error:\n${err}`);
        })
}

let message = `"hook"`;
if (argv[2]) {
    message = `"${argv[2]} hook"`;
}

run("svn status").then((stdout) => {
    let matchesStatus = stdout.match(/^[?!]\s+[^\s]*$/gm);
    if (!matchesStatus) {
        console.log(`---- no files&folders need to add|remove ----`)
        svnCommit(message);
        return;
    }
    setStatus(matchesStatus).then((stdout) => {
        svnCommit(message);
    }).catch((err) => {
        console.log(`set svn status error:\n${err}`);
    })
}).catch((err) => {
    console.log(`run svn status error:\n${err}`)
});

