var shelljs = require('shelljs'),
	colors = require('colors'),
	fs = require('fs'),
	fetch = require('../../fetch');

module.exports = function(applicationName) {

	var folderIsEmpty = true;

	if(applicationName) {
		folderIsEmpty = fs.existsSync(applicationName) === false;
		shelljs.mkdir('-p', applicationName);
	} else {
		folderIsEmpty = fs.readdirSync('.').length === 0;
	}

	if(folderIsEmpty) {
		fetch(applicationName || '.', function(error, versionFetched) {
			if(error) {
				console.log('\nFalha na tarefa init! Tente novamente mais tarde.'.red);
			} else {
				shelljs.cd(applicationName || '.');
				shelljs.rm('-rf', ['.gitignore', 'LICENSE', 'README.md', '.git']);

				if(applicationName) {
					console.log('\nAplicação '.green + applicationName.cyan + ' criada!'.green);
				} else {
					console.log('\nAplicação criada!'.green);
				}
			}
		});
	} else {
		if(applicationName) {
			console.log('\nA pasta '.red + applicationName.cyan + ' não está vazia!'.red);
		} else {
			console.log('\nA pasta atual não está vazia!'.red);
		}
	}
};