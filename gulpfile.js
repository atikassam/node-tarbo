const { CommendRunner } = require("gulp-sequence-cmd-commend");

const gulp = require('gulp');
const colors = require('colors');
const ts = require('gulp-typescript');
const tsImport = require('gulp-typescript-path-resolver');
const rxjs = require('rxjs');
const shell = require('shelljs');

const tsProject = ts.createProject('./tsconfig.json');

const _BUILD_DIR_ = tsProject.config.compilerOptions.outDir;
const _ENVIRONMENT_ = process.env.BUILD_ENV ? '.' + process.env.BUILD_ENV : '';

gulp.task('build', () =>{
    return tsProject.src()
        .pipe(tsProject())
        .pipe(tsImport.tsPathResolver(tsProject.config.compilerOptions, {
            "paths": {
                "@app/env": [
                    "environments/environment"+ _ENVIRONMENT_
                ]
            }
        }))
        .pipe(gulp.dest(_BUILD_DIR_));
})
//
// class Tasks {
//     constructor() {
//         this.server = undefined;
//         this.server_restart_timer = undefined;
//         this.server_restart_delay = 2500;
//         this.server_run_commend = 'npm run start';
//         this.server_build_commend = 'npm run build:dev';
//         this.build_process = null;
//     }
//
//     runBuildAndStartServer() {
//         if (this.server_restart_timer) clearTimeout(this.server_restart_timer);
//         this.server_restart_timer = setTimeout(() => {
//             if (this.server) {
//                 this.log('Killing previous instance..', 'green')
//                 this.server.kill();
//             } else {
//                 this.log('Rebuilding app..', 'green');
//                 if (this.build_process) {
//                     this.build_process.unsubscribe();
//                 }
//
//                 this.build_process = rxjs.Observable.create((observer) => {
//                     let commend = shell.exec(this.server_build_commend, (stdout) => {
//                         observer.next();
//                     });
//
//                     return () => {
//                         commend.kill();
//                     }
//                 }).subscribe(() => {
//                     this.server = shell.exec(this.server_run_commend, (err, stdout, stdin) => {
//                         if (!err) {
//                             this.log('Restarting server', 'green');
//                             this.runBuildAndStartServer();
//                         } else {
//                             this.log('Server crashed', 'red');
//                             // process.exit(1);
//                         }
//                     });
//
//                     this.server.on('data', (data) => {
//                         console.log(data);
//                     });
//                     this.server.on('error', (error) => {
//                         this.server = undefined;
//                         this.log('Server crashed', 'red');
//                     });
//                     this.server.on('exit', (code) => {
//                         this.server = undefined;
//                     })
//                 })
//
//             }
//
//             // Start server immediately if server running for first time,
//             // if server_restart_timer is server_restart_timer false means server is running for first time
//         }, this.server_restart_timer ? this.server_restart_delay : 0)
//     }
//
//     log(text, color) {
//         let d = new Date()
//             , log = `[${d.getHours() + ':' + d.getMinutes() + ':' + d.getMilliseconds()}] ${text}`[color];
//
//         console.log(log)
//     }
// }
// const TASK = new Tasks();
function log(text, color) {
        let d = new Date()
            , log = `[${d.getHours() + ':' + d.getMinutes() + ':' + d.getMilliseconds()}] ${text}`[color];

        console.log(log)
    }
const TASK = new CommendRunner([
    // First commend
    {
        cmd: `rm -rf ${__dirname}/dest`
        , onDone () {
            log('Old build removed.', 'green');
            log('Start building...', 'green');
        }
    }

    // Second commend
    , {
        cmd: 'npm run build:dev'
        , onDone () {
            log('Build completed.', 'green');
            log('Starting server...', 'green');
        }
    }

    // 3rd commend
    , {
        cmd: 'npm run start'
        , onDone () {
            log('Restarting server...', 'green');
            log('Killing previous instance...', 'green');
        }
    }
]);

// Restart server on file change
gulp.task('start:watch', () => {
    // Run build commend on file change
    let watcher = gulp.watch('./src/**/*.ts');
    watcher.on('change', () => TASK.runWithInterval(2500));
    TASK.run();
});