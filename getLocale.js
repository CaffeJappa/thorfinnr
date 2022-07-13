const stringes = require(`./json/langs.json`);
		
function getLocale(language, string, ...vars) {
	let locale = stringes[language][string];
	let count = 0
	while (count < 5) {
		locale = locale.replace(/%VAR%/, () => (vars[count] !== null) ? vars[count] : "%VAR%");
		count++
	}
	//locale = locale.replace(/%VAR%/, () => (vars[count] !== null) ? vars[count] : "%VAR%");
	return locale;
}
module.exports.getLocale = getLocale;
