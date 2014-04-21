'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var PreprocessedGenerator = module.exports = function PreprocessedGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({
      skipInstall: options['skip-install'],
      callback: function() {
        this.emit('dependenciesInstalled');
      }.bind(this)
    });
  });

  this.on('dependenciesInstalled', function() {
    this.spawnCommand('grunt', ['compile']);
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PreprocessedGenerator, yeoman.generators.Base);

PreprocessedGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'appName',
      message: 'What do you want to call your app?',
      default: this.appname
    },
    {
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [
        {
          name: 'Bootstrap',
          value: 'installBootstrap',
          checked: true
        }, {
          name: 'Modernizr',
          value: 'installModernizr',
          checked: true
        }
      ]
    }
  ];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;
    this.installBootstrap = props.features.indexOf('installBootstrap') > -1;
    this.installModernizr = props.features.indexOf('installModernizr') > -1;

    cb();
  }.bind(this));
};

PreprocessedGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/static');
  this.mkdir('app/static/images');
  this.mkdir('app/static/styles');
  this.mkdir('app/static/fonts');
  this.mkdir('app/static/scripts');

  this.copy('_package.json', 'package.json');
};

PreprocessedGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.coffee');
};

PreprocessedGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

PreprocessedGenerator.prototype.jade = function jade() {
  this.copy('index.jade', 'app/index.jade');
};

PreprocessedGenerator.prototype.less = function less() {
  this.copy('stylesheet.less', 'app/static/styles/stylesheet.less');
}

PreprocessedGenerator.prototype.coffee = function coffee() {
  this.copy('app.coffee', 'app/static/scripts/app.coffee');
}

PreprocessedGenerator.prototype.versionControl = function versionControl() {
  this.copy('gitignore', '.gitignore'); // git
  this.copy('gitignore', '.hgignore'); // mercurial
};

PreprocessedGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
