/*$
 * @name locale.js
 * @fileOverview basic locale handling routines used by the whole g11n package.
 * 
 */

/*globals enyo  root document */

//* @public
/**
    Creates and returns a new Locale instance. 

    The specifier parameter (_spec_) has the format:

        [language]\_[region][\_variant]

    That is, the language, region, and variant are optional parts separated by
    underscores. The language is given by the two-letter ISO 639 language code,
    and the region is given by the two-letter ISO 3166 country code,
    lower-cased. The variant can be any string that contains any ASCII letter
    characters and no spaces or underscores.

    The region is specified with a lower-case code for historical reasons
    specific to webOS. We continue to use the lower-case codes, but the locale
    specifier argument to the constructor can accept the upper-case
    ISO-compliant codes as well.  

    If only one part of the spec is given, such as "fr", then that part refers
    to the language only, in this case "French". For certain international
    functions, such as number or phone number formatting, the region is used to
    find the proper format, so specifying only the language "fr" might not do
    what you expect. It is better to fully specify the locale when constructing
    an instance of _enyo.g11n.Locale_--for example, use "fr_fr" instead of just
    "fr" for French/France.

    If you want to construct a locale with a region but no language, then the
    specifier must include an underscore to differentiate it from a
    language-only spec. For example, "_es" is a locale spec for the region
    "Spain".
*/
enyo.g11n.Locale = function Locale(spec){
	var parts = spec ? spec.split(/_/) : [];
	
	this.locale = spec;
	this.language = parts[0] || undefined;
	this.region = parts[1] ? parts[1].toLowerCase() : undefined;
	this.variant = parts[2] ? parts[2].toLowerCase() : undefined;
	
	return this;
};

/**
    Returns the entire locale spec for the current locale.
*/
enyo.g11n.Locale.prototype.getLocale = function(){
	return this.locale;
};

/**
    Returns the language of the current locale.
*/
enyo.g11n.Locale.prototype.getLanguage = function(){
	return this.language;
};

/**
    Returns the region of the current locale.
*/
enyo.g11n.Locale.prototype.getRegion = function(){
	return this.region;
};

/**
    Returns the variant of the current locale, if any.
*/
enyo.g11n.Locale.prototype.getVariant = function(){
	return this.variant;
};

/**
    Returns the locale spec for the current locale.
*/
enyo.g11n.Locale.prototype.toString = function () {
	if (!this.locale) {
		this.locale = this.language + "_" + this.region;
		if (this.variant) {
			this.locale = this.locale + "_" + this.variant;
		}
	}
	return this.locale;
};

/**
    Returns the locale, but with the region and variant upper-cased to conform
    to the ISO standards. The spec returned from this function can then be used
    with other libraries of international routines, such as ICU.
*/
enyo.g11n.Locale.prototype.toISOString = function () {
	var ret = this.language || ""; 
	if (this.region) {
		ret += "_" + this.region.toUpperCase();
	}
	if (this.variant) {
		ret += "_" + this.variant.toUpperCase();
	}
	return ret;
};

/**
    Returns a Boolean indicating whether the current locale is compatible with
    the passed-in locale. To be compatible means that one locale can substitute
    for the other for translations and localized files.
*/
enyo.g11n.Locale.prototype.isMatch = function (otherLocale) {
	if (otherLocale.language && otherLocale.region) {
		return ((!this.language || this.language === otherLocale.language) && 
				(!this.region || this.region === otherLocale.region));
	}
	if (otherLocale.language) {
		return (!this.language || 
				this.language === otherLocale.language);
	}
	return !this.region || this.region === otherLocale.region;
};

/**
    Returns true if this locale exactly matches the passed-in locale; otherwise,
    false. Locales that are equal necessarily match (i.e., are compatible), but
    locales that are compatible aren't necessarily equal.
*/
enyo.g11n.Locale.prototype.equals = function (otherLocale) {
	return (this.language === otherLocale.language &&
		this.region === otherLocale.region &&
		this.variant === otherLocale.variant);
};

/**
    If the current locale includes a region but no language, this function
    causes the locale to fill itself out with the default language for its
    region.
    
    For each region, one language is picked as the default. If the region does
    not have a default, the language of the current UI locale is used; if that
    cannot be found, English is used.
*/
enyo.g11n.Locale.prototype.useDefaultLang = function () {
	var defLangs, language, uiLoc;
	
	if (!this.language) {
		defLangs = enyo.g11n.Utils.getNonLocaleFile({
			root: enyo.g11n.Utils._getEnyoRoot(),
			path: "base/formats/defLangs.json"
		});
		language = defLangs && defLangs[this.region];
		if (!language) {
			uiLoc = enyo.g11n.currentLocale();
			language = uiLoc.language;
		}
		this.language = language || "en";
		this.locale = this.language + "_" + this.region;
	}
};
