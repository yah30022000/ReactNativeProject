"use strict";

// @react-native-community^4.10.1/cli-platform-android/build/commands/runAndroid/index.js
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _execa() {
  const data = _interopRequireDefault(require("execa"));

  _execa = function () {
    return data;
  };

  return data;
}

function _fs() {
  const data = _interopRequireDefault(require("fs"));

  _fs = function () {
    return data;
  };

  return data;
}

var _adb = _interopRequireDefault(require("./adb"));

var _runOnAllDevices = _interopRequireDefault(require("./runOnAllDevices"));

var _tryRunAdbReverse = _interopRequireDefault(require("./tryRunAdbReverse"));

var _tryLaunchAppOnDevice = _interopRequireDefault(require("./tryLaunchAppOnDevice"));

var _getAdbPath = _interopRequireDefault(require("./getAdbPath"));

function _cliTools() {
  const data = require("@react-native-community/cli-tools");

  _cliTools = function () {
    return data;
  };

  return data;
}

var _getAndroidProject = require("../../config/getAndroidProject");
const data = require("@react-native-community/cli-tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * Starts the app on a connected Android emulator or device.
 */
async function runAndroid(_argv, config, args) {
  const androidProject = (0, _getAndroidProject.getAndroidProject)(config);

  if (!args.packager) {
    return buildAndRun(args, androidProject);
  }

  return (0, _cliTools().isPackagerRunning)(args.port).then(result => {
    if (result === 'running') {
      _cliTools().logger.info('JS server already running.');
    } else if (result === 'unrecognized') {
      _cliTools().logger.warn('JS server not recognized, continuing with build...');
    } else {
      // result == 'not_running'
      _cliTools().logger.info('Starting JS server...');

      try {
        startServerInNewWindow(args.port, args.terminal, config.reactNativePath);
      } catch (error) {
        _cliTools().logger.warn(`Failed to automatically start the packager server. Please run "react-native start" manually. Error details: ${error.message}`);
      }
    }

    return buildAndRun(args, androidProject);
  });
} // Builds the app and runs it on a connected emulator / device.


function buildAndRun(args, androidProject) {
  process.chdir(androidProject.sourceDir);
  const cmd = process.platform.startsWith('win') ? 'gradlew.bat' : './gradlew';
  const adbPath = (0, _getAdbPath.default)();

  if (args.deviceId) {
    return runOnSpecificDevice(args, cmd, adbPath, androidProject);
  } else {
    return (0, _runOnAllDevices.default)(args, cmd, adbPath, androidProject);
  }
}

function getTaskNames(appName, commands) {
  return appName ? commands.map(command => `${appName}:${command}`) : commands;
}

function toPascalCase(value) {
  return value !== '' ? value[0].toUpperCase() + value.slice(1) : value;
}

function runOnSpecificDevice(args, cmd, adbPath, androidProject) {
  const devices = _adb.default.getDevices(adbPath);

  const {
    deviceId
  } = args;

  if (devices.length > 0 && deviceId) {
    if (devices.indexOf(deviceId) !== -1) {
      buildApk(cmd, androidProject, args);
      installAndLaunchOnDevice(args, deviceId, adbPath, androidProject);
    } else {
      _cliTools().logger.error(`Could not find device with the id: "${deviceId}". Please choose one of the following:`, ...devices);
    }
  } else {
    _cliTools().logger.error('No Android device or emulator connected.');
  }
}

function buildApk(cmd, androidProject, args) {
  try {
    const tasks = args.tasks || ['install' + toPascalCase(args.variant)];
    const gradleArgs = getTaskNames(args.appFolder || androidProject.appName, tasks)

    if (args.port != null) {
      gradleArgs.push('-PreactNativeDevServerPort=' + args.port);
    }

    _cliTools().logger.info('Building the app...');

    _cliTools().logger.debug(`Running command "${cmd} ${gradleArgs.join(' ')}"`);

    _execa().default.sync(cmd, gradleArgs, {
      stdio: 'inherit',
      cwd: androidProject.sourceDir
    });
  } catch (error) {
    throw new (_cliTools().CLIError)('Failed to build the app.', error);
  }
}

function tryInstallAppOnDevice(args, adbPath, device, androidProject) {
  try {
    // "app" is usually the default value for Android apps with only 1 app
    const {
      appName,
      sourceDir
    } = androidProject;
    const variant = args.variant.toLowerCase();
    const buildDirectory = `${sourceDir}/${appName}/build/outputs/apk/${variant}`;
    const apkFile = getInstallApkName(appName, adbPath, variant, device, buildDirectory);
    const pathToApk = `${buildDirectory}/${apkFile}`;
    const adbArgs = ['-s', device, 'install', '-r', '-d', pathToApk];

    _cliTools().logger.info(`Installing the app on the device "${device}"...`);

    _cliTools().logger.debug(`Running command "cd android && adb -s ${device} install -r -d ${pathToApk}"`);

    _execa().default.sync(adbPath, adbArgs, {
      stdio: 'inherit'
    });
  } catch (error) {
    throw new (_cliTools().CLIError)('Failed to install the app on the device.', error);
  }
}

function getInstallApkName(appName, adbPath, variant, device, buildDirectory) {
  const availableCPUs = _adb.default.getAvailableCPUs(adbPath, device); // check if there is an apk file like app-armeabi-v7a-debug.apk


  for (const availableCPU of availableCPUs.concat('universal')) {
    const apkName = `${appName}-${availableCPU}-${variant}.apk`;

    if (_fs().default.existsSync(`${buildDirectory}/${apkName}`)) {
      return apkName;
    }
  } // check if there is a default file like app-debug.apk


  const apkName = `${appName}-${variant}.apk`;

  if (_fs().default.existsSync(`${buildDirectory}/${apkName}`)) {
    return apkName;
  }

  throw new (_cliTools().CLIError)('Could not find the correct install APK file.');
}

function installAndLaunchOnDevice(args, selectedDevice, adbPath, androidProject) {
  (0, _tryRunAdbReverse.default)(args.port, selectedDevice);
  (0, _tryLaunchAppOnDevice.default)(selectedDevice, androidProject.packageName, adbPath, args);
}

function startServerInNewWindow(port, terminal, reactNativePath) {
  /**
   * Set up OS-specific filenames and commands
   */
  const isWindows = /^win/.test(process.platform);
  const scriptFile = isWindows ? 'launchPackager.bat' : 'launchPackager.command';
  const packagerEnvFilename = isWindows ? '.packager.bat' : '.packager.env';
  const portExportContent = isWindows ? `set RCT_METRO_PORT=${port}` : `export RCT_METRO_PORT=${port}`;
  /**
   * Set up the `.packager.(env|bat)` file to ensure the packager starts on the right port.
   */

  const launchPackagerScript = _path().default.join(reactNativePath, `scripts/${scriptFile}`);
  /**
   * Set up the `launchpackager.(command|bat)` file.
   * It lives next to `.packager.(bat|env)`
   */


  const scriptsDir = _path().default.dirname(launchPackagerScript);

  const packagerEnvFile = _path().default.join(scriptsDir, packagerEnvFilename);

  const procConfig = {
    cwd: scriptsDir
  };
  /**
   * Ensure we overwrite file by passing the `w` flag
   */

  _fs().default.writeFileSync(packagerEnvFile, portExportContent, {
    encoding: 'utf8',
    flag: 'w'
  });

  if (process.platform === 'darwin') {
    try {
      return _execa().default.sync('open', ['-a', terminal, launchPackagerScript], procConfig);
    } catch (error) {
      return _execa().default.sync('open', [launchPackagerScript], procConfig);
    }
  }

  if (process.platform === 'linux') {
    try {
      return _execa().default.sync(terminal, ['-e', `sh ${launchPackagerScript}`], { ...procConfig,
        detached: true
      });
    } catch (error) {
      // By default, the child shell process will be attached to the parent
      return _execa().default.sync('sh', [launchPackagerScript], procConfig);
    }
  }

  if (/^win/.test(process.platform)) {
    // Awaiting this causes the CLI to hang indefinitely, so this must execute without await.
    return (0, _execa().default)('cmd.exe', ['/C', launchPackagerScript], { ...procConfig,
      detached: true,
      stdio: 'ignore'
    });
  }

  _cliTools().logger.error(`Cannot start the packager. Unknown platform ${process.platform}`);

  return;
}

var _default = {
  name: 'run-android',
  description: 'builds your app and starts it on a connected Android emulator or device',
  func: runAndroid,
  options: [{
    name: '--variant <string>',
    description: "Specify your app's build variant",
    default: 'debug'
  }, {
    name: '--appId <string>',
    description: 'Specify an applicationId to launch after build. If not specified, `package` from AndroidManifest.xml will be used.',
    default: ''
  }, {
    name: '--appIdSuffix <string>',
    description: 'Specify an applicationIdSuffix to launch after build.',
    default: ''
  }, {
    name: '--main-activity <string>',
    description: 'Name of the activity to start',
    default: 'MainActivity'
  }, {
    name: '--deviceId <string>',
    description: 'builds your app and starts it on a specific device/simulator with the ' + 'given device id (listed by running "adb devices" on the command line).'
  }, {
    name: '--no-packager',
    description: 'Do not launch packager while building'
  }, {
    name: '--port <number>',
    default: process.env.RCT_METRO_PORT || 8081,
    parse: Number
  }, {
    name: '--terminal <string>',
    description: 'Launches the Metro Bundler in a new window using the specified terminal path.',
    default: (0, _cliTools().getDefaultUserTerminal)()
  }, {
    name: '--tasks <list>',
    description: 'Run custom Gradle tasks. By default it\'s "installDebug"',
    parse: val => val.split(',')
  }, {
    name: '--active-arch-only',
    description: 'Build native libraries only for the current device architecture for debug builds.',
    default: false
  }]
};
exports.default = _default;

//# sourceMappingURL=index.js.map
