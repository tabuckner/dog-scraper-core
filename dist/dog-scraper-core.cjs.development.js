'use strict';

var requestPromise = require('request-promise');
var cheerio = require('cheerio');

// A type of promise-like that resolves synchronously and supports only one observer
const _Pact = /*#__PURE__*/(function() {
	function _Pact() {}
	_Pact.prototype.then = function(onFulfilled, onRejected) {
		const result = new _Pact();
		const state = this.s;
		if (state) {
			const callback = state & 1 ? onFulfilled : onRejected;
			if (callback) {
				try {
					_settle(result, 1, callback(this.v));
				} catch (e) {
					_settle(result, 2, e);
				}
				return result;
			} else {
				return this;
			}
		}
		this.o = function(_this) {
			try {
				const value = _this.v;
				if (_this.s & 1) {
					_settle(result, 1, onFulfilled ? onFulfilled(value) : value);
				} else if (onRejected) {
					_settle(result, 1, onRejected(value));
				} else {
					_settle(result, 2, value);
				}
			} catch (e) {
				_settle(result, 2, e);
			}
		};
		return result;
	};
	return _Pact;
})();

// Settles a pact synchronously
function _settle(pact, state, value) {
	if (!pact.s) {
		if (value instanceof _Pact) {
			if (value.s) {
				if (state & 1) {
					state = value.s;
				}
				value = value.v;
			} else {
				value.o = _settle.bind(null, pact, state);
				return;
			}
		}
		if (value && value.then) {
			value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
			return;
		}
		pact.s = state;
		pact.v = value;
		const observer = pact.o;
		if (observer) {
			observer(pact);
		}
	}
}

function _isSettledPact(thenable) {
	return thenable instanceof _Pact && thenable.s & 1;
}

// Asynchronously iterate through an object that has a length property, passing the index as the first argument to the callback (even as the length property changes)
function _forTo(array, body, check) {
	var i = -1, pact, reject;
	function _cycle(result) {
		try {
			while (++i < array.length && (!check || !check())) {
				result = body(i);
				if (result && result.then) {
					if (_isSettledPact(result)) {
						result = result.v;
					} else {
						result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
						return;
					}
				}
			}
			if (pact) {
				_settle(pact, 1, result);
			} else {
				pact = result;
			}
		} catch (e) {
			_settle(pact || (pact = new _Pact()), 2, e);
		}
	}
	_cycle();
	return pact;
}

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

// Asynchronously iterate through an object's values
// Uses for...of if the runtime supports it, otherwise iterates until length on a copy
function _forOf(target, body, check) {
	if (typeof target[_iteratorSymbol] === "function") {
		var iterator = target[_iteratorSymbol](), step, pact, reject;
		function _cycle(result) {
			try {
				while (!(step = iterator.next()).done && (!check || !check())) {
					result = body(step.value);
					if (result && result.then) {
						if (_isSettledPact(result)) {
							result = result.v;
						} else {
							result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
							return;
						}
					}
				}
				if (pact) {
					_settle(pact, 1, result);
				} else {
					pact = result;
				}
			} catch (e) {
				_settle(pact || (pact = new _Pact()), 2, e);
			}
		}
		_cycle();
		if (iterator.return) {
			var _fixup = function(value) {
				try {
					if (!step.done) {
						iterator.return();
					}
				} catch(e) {
				}
				return value;
			};
			if (pact && pact.then) {
				return pact.then(_fixup, function(e) {
					throw _fixup(e);
				});
			}
			_fixup();
		}
		return pact;
	}
	// No support for Symbol.iterator
	if (!("length" in target)) {
		throw new TypeError("Object is not iterable");
	}
	// Handle live collections properly
	var values = [];
	for (var i = 0; i < target.length; i++) {
		values.push(target[i]);
	}
	return _forTo(values, function(i) { return body(values[i]); }, check);
}

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

var UrlLoader =
/*#__PURE__*/
function () {
  function UrlLoader() {}

  UrlLoader.load = function load(url) {
    if (!url) {
      throw new Error('You must provide a URL.');
    }

    return requestPromise.get(url);
  };

  return UrlLoader;
}();

var AKC_BASE_URL = 'https://www.akc.org';
var ACK_BREEDS_ROUTE = '/dog-breeds/';

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var Scraper =
/*#__PURE__*/
function () {
  function Scraper(htmlString, options) {
    this.htmlString = htmlString;
    this.options = options;

    if (!this.htmlString) {
      throw new Error('You must provide an HTML string.');
    }

    this.$ = this.load(htmlString, options);
  }

  var _proto = Scraper.prototype;

  _proto.load = function load(htmlString, options) {
    return cheerio.load(htmlString, options);
  };

  return Scraper;
}();

var BreedLinksScraper =
/*#__PURE__*/
function (_Scraper) {
  _inheritsLoose(BreedLinksScraper, _Scraper);

  function BreedLinksScraper(htmlString) {
    var _this;

    _this = _Scraper.call(this, htmlString) || this;
    _this.dropDownSelector = 'select#breed-search';
    _this.optionSelector = 'option';
    return _this;
  }

  var _proto = BreedLinksScraper.prototype;

  _proto.getBreedLinks = function getBreedLinks() {
    var _this2 = this;

    var links = [];
    this.targetDropDown = this.$(this.dropDownSelector).get(0);
    this.$(this.targetDropDown).find(this.optionSelector).each(function (_, el) {
      var link = _this2.$(el).attr('value');

      if (link && link.length > 0) {
        links.push(link);
      }
    });
    return links;
  };

  return BreedLinksScraper;
}(Scraper);

var AttributeScraper =
/*#__PURE__*/
function (_Scraper) {
  _inheritsLoose(AttributeScraper, _Scraper);

  function AttributeScraper(htmlString) {
    var _this;

    _this = _Scraper.call(this, htmlString) || this;
    _this.attributeListSelector = '.attribute-list';
    _this.attributeListRowSelector = '.attribute-list__row';
    _this.attributeTermSelector = '.attribute-list__term';
    _this.attributeDescriptionSelector = '.attribute-list__description';
    return _this;
  }

  var _proto = AttributeScraper.prototype;

  _proto.getBreedsAttributes = function getBreedsAttributes() {
    var _this2 = this;

    var breedAttributes = [];
    var attributeRows = this.$(this.attributeListSelector).find(this.attributeListRowSelector);
    attributeRows.each(function (_, el) {
      var $rowEl = _this2.$(el);

      var attributeTerm = $rowEl.find(_this2.attributeTermSelector).text();
      var description = $rowEl.find(_this2.attributeDescriptionSelector).text();
      var descriptionHasList = description.indexOf(', ') > -1;
      var attribute = attributeTerm.substring(0, attributeTerm.length - 1);
      var nextAttribute = {
        attribute: attribute,
        description: description
      };

      if (descriptionHasList) {
        var descriptionList = description.split(', ');
        nextAttribute['descriptionList'] = descriptionList;
      }

      breedAttributes.push(nextAttribute);
    });
    return breedAttributes;
  };

  return AttributeScraper;
}(Scraper);

function parseBreedNameKey(url) {
  if (!url || url.length < 1) {
    return url;
  }

  var parts = url.split('/dog-breeds');

  if (parts[1]) {
    return parts[1].replace(/\//g, '');
  }

  return '';
}
function parseDisplayNameFromBreedNameKey(breedNameKey) {
  return breedNameKey.split('-').join(' ');
}

var DogScraper =
/*#__PURE__*/
function () {
  function DogScraper() {}

  var _proto = DogScraper.prototype;

  /**
   * Single Public Method to Scrape Dog Breed Data from AKC website.
   */
  _proto.getBreedInfo = function getBreedInfo() {
    try {
      var _this2 = this;

      return Promise.resolve(_this2.getBreedsPage()).then(function () {
        _this2.getBreedLinks();

        return Promise.resolve(_this2.setBreedInfo()).then(function () {
          return _this2.breedInfo;
        });
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.setBreedInfo = function setBreedInfo() {
    try {
      var _this4 = this;

      _this4.breedInfo = {};

      var _temp2 = _forOf(_this4.breedLinks, function (breedLink) {
        var breedNameKey = parseBreedNameKey(breedLink);
        var displayName = parseDisplayNameFromBreedNameKey(breedNameKey);
        return Promise.resolve(UrlLoader.load(breedLink)).then(function (nextPage) {
          var attributes = new AttributeScraper(nextPage).getBreedsAttributes();
          _this4.breedInfo[breedNameKey] = {
            displayName: displayName,
            attributes: attributes
          };
        });
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getBreedLinks = function getBreedLinks() {
    try {
      var _this6 = this;

      _this6.breedLinks = new BreedLinksScraper(_this6.breedsPageHtmlString).getBreedLinks();
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getBreedsPage = function getBreedsPage() {
    try {
      var _this8 = this;

      var akcBreedsUrl = "" + AKC_BASE_URL + ACK_BREEDS_ROUTE;
      return Promise.resolve(UrlLoader.load(akcBreedsUrl)).then(function (_UrlLoader$load) {
        _this8.breedsPageHtmlString = _UrlLoader$load;
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return DogScraper;
}();

exports.DogScraper = DogScraper;
//# sourceMappingURL=dog-scraper-core.cjs.development.js.map
