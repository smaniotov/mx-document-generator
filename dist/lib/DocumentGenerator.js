"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DocumentType = void 0;

var _StringUtils = _interopRequireDefault(require("./StringUtils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DocumentType;
exports.DocumentType = DocumentType;

(function (DocumentType) {
  DocumentType["RFC"] = "rfc";
  DocumentType["CURP"] = "curp";
})(DocumentType || (exports.DocumentType = DocumentType = {}));

var DocumentGenerator =
/*#__PURE__*/
function () {
  function DocumentGenerator() {
    _classCallCheck(this, DocumentGenerator);
  }

  _createClass(DocumentGenerator, null, [{
    key: "getCommonPart",
    value: function getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, type) {
      var commonPart = surnameFather[0];
      commonPart += _StringUtils.default.getFirstInternalVowel(surnameFather);
      commonPart += surnameMother[0] || 'X';
      commonPart += name[0];
      commonPart = DocumentGenerator.removeBadWords(commonPart, type);
      commonPart += bornYear.substring(2);
      commonPart += bornMonth;
      commonPart += bornDay;
      return commonPart;
    }
  }, {
    key: "getBornStateCode",
    value: function getBornStateCode(stateName) {
      var clearString = _StringUtils.default.clearString,
          removeAccents = _StringUtils.default.removeAccents;
      var parsedStateName = removeAccents(clearString(stateName));
      return DocumentGenerator.states[parsedStateName];
    }
  }, {
    key: "getGenderLetter",
    value: function getGenderLetter(gender) {
      switch (gender) {
        case 'M':
          return 'H';

        case 'F':
          return 'M';
      }
    }
  }, {
    key: "getSpecialChar",
    value: function getSpecialChar(bornYear) {
      if (bornYear[0] === '1') {
        return '0';
      } else {
        return 'A';
      }
    }
  }, {
    key: "removeBadWords",
    value: function removeBadWords(word, type) {
      var badWordsList;

      if (type === DocumentType.CURP) {
        badWordsList = DocumentGenerator.badWordsCURP;
      } else {
        badWordsList = DocumentGenerator.badWordsRFC;
      }

      if (badWordsList[word]) {
        return badWordsList[word];
      }

      return word;
    }
  }]);

  return DocumentGenerator;
}();

exports.default = DocumentGenerator;

_defineProperty(DocumentGenerator, "getCURP", function (name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, bornState, gender) {
  name = _StringUtils.default.clearString(name);
  name = DocumentGenerator.removeCommonNames(name);
  surnameFather = _StringUtils.default.clearString(surnameFather);
  surnameFather = DocumentGenerator.removePrefixes(surnameFather);
  surnameMother = _StringUtils.default.clearString(surnameMother);
  surnameMother = DocumentGenerator.removePrefixes(surnameMother);
  bornDay = _StringUtils.default.clearString(bornDay);
  bornMonth = _StringUtils.default.clearString(bornMonth);
  bornYear = _StringUtils.default.clearString(bornYear);
  var curp = DocumentGenerator.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, DocumentType.CURP);
  curp = DocumentGenerator.removeBadWords(curp, DocumentType.CURP);
  curp += DocumentGenerator.getGenderLetter(gender);
  curp += DocumentGenerator.getBornStateCode(bornState);
  curp += _StringUtils.default.getFirstInternalConsonant(surnameFather);
  curp += _StringUtils.default.getFirstInternalConsonant(surnameMother);
  curp += _StringUtils.default.getFirstInternalConsonant(name);
  curp += DocumentGenerator.getSpecialChar(bornYear);
  curp += DocumentGenerator.getLastCURPDigit(curp);
  return curp;
});

_defineProperty(DocumentGenerator, "getRFC", function (name, surnameFather, surnameMother, bornDay, bornMonth, bornYear) {
  name = _StringUtils.default.clearString(name);
  name = DocumentGenerator.removeCommonNames(name);
  surnameFather = _StringUtils.default.clearString(surnameFather);
  surnameMother = _StringUtils.default.clearString(surnameMother);
  bornDay = _StringUtils.default.clearString(bornDay);
  bornMonth = _StringUtils.default.clearString(bornMonth);
  bornYear = _StringUtils.default.clearString(bornYear);
  return DocumentGenerator.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, DocumentType.RFC);
});

_defineProperty(DocumentGenerator, "removeCommonNames", function (currentName) {
  return DocumentGenerator.notAcceptedNames.reduce(function (name, notAccepted) {
    return name.replace(new RegExp('^' + notAccepted), '');
  }, currentName);
});

_defineProperty(DocumentGenerator, "removePrefixes", function (currentName) {
  return DocumentGenerator.prefixes.reduce(function (name, notAccepted) {
    return name.replace(new RegExp('^' + notAccepted), '');
  }, currentName);
});

_defineProperty(DocumentGenerator, "states", {
  'AGUASCALIENTES': 'AS',
  'BAJA CALIFORNIA': 'BC',
  'BAJA CALIFORNIA NORTE': 'BC',
  'BAJA CALIFORNIA SUR': 'BS',
  'CAMPECHE': 'CC',
  'COAHUILA': 'CL',
  'COLIMA': 'CM',
  'CHIAPAS': 'CS',
  'CHIHUAHUA': 'CH',
  'CIUDAD DE MEXICO': 'DF',
  'DISTRITO FEDERAL': 'DF',
  'DURANGO': 'DG',
  'GUANAJUATO': 'GT',
  'GUERRERO': 'GR',
  'HIDALGO': 'HG',
  'JALISCO': 'JC',
  'MEXICO': 'MC',
  'MICHOACAN': 'MN',
  'MORELOS': 'MS',
  'NAYARIT': 'NT',
  'NUEVO LEON': 'NL',
  'OAXACA': 'OC',
  'PUEBLA': 'PL',
  'QUERETARO': 'QT',
  'QUINTANA ROO': 'QR',
  'SAN LUIS POTOSI': 'SP',
  'SINALOA': 'SL',
  'SONORA': 'SR',
  'TABASCO': 'TC',
  'TAMAULIPAS': 'TS',
  'TLAXCALA': 'TL',
  'VERACRUZ': 'VZ',
  'YUCATAN': 'YN',
  'ZACATECAS': 'ZS'
});

_defineProperty(DocumentGenerator, "notAcceptedNames", ['MARIA DEL ', 'MARIA DE LOS ', 'MARIA ', 'JOSE DE ', 'JOSE ', 'MA. ', 'MA ', 'M. ', 'J. ', 'J ']);

_defineProperty(DocumentGenerator, "prefixes", ['DE ', 'DEL ']);

_defineProperty(DocumentGenerator, "badWordsCURP", {
  'BACA': 'BXCA',
  'LOCO': 'LXCO',
  'BAKA': 'BXKA',
  'BUEI': 'BXEI',
  'BUEY': 'BXEY',
  'CACA': 'CXCA',
  'CACO': 'CXCO',
  'CAGA': 'CXGA',
  'CAGO': 'CXGO',
  'CAKA': 'CXKA',
  'CAKO': 'CXKO',
  'COGE': 'CXGE',
  'COGI': 'CXGI',
  'COJA': 'CXJA',
  'COJE': 'CXJE',
  'COJI': 'CXJI',
  'COJO': 'CXJO',
  'COLA': 'CXLA',
  'CULO': 'CXLO',
  'FALO': 'FXLO',
  'FETO': 'FXTO',
  'GETA': 'GXTA',
  'GUEI': 'GXEI',
  'GUEY': 'GXEY',
  'JETA': 'JXTA',
  'JOTO': 'JXTO',
  'KACA': 'KXCA',
  'KACO': 'KXCO',
  'KAGA': 'KXGA',
  'KAGO': 'KXGO',
  'KAKA': 'KXKA',
  'KAKO': 'KXKO',
  'KOGE': 'KXGE',
  'KOGI': 'KXGI',
  'KOJA': 'KXJA',
  'KOJE': 'KXJE',
  'KOJI': 'KXJI',
  'KOJO': 'KXJO',
  'KOLA': 'KXLA',
  'KULO': 'KXLO',
  'LILO': 'LXLO',
  'LOKA': 'LXKA',
  'LOKO': 'LXKO',
  'MAME': 'MXME',
  'MAMO': 'MXMO',
  'MEAR': 'MXAR',
  'MEAS': 'MXAS',
  'MEON': 'MXON',
  'MIAR': 'MXAR',
  'MION': 'MXON',
  'MOCO': 'MXCO',
  'MOKO': 'MXKO',
  'MULA': 'MXLA',
  'MULO': 'MXLO',
  'NACA': 'NXCA',
  'NACO': 'NXCO',
  'PEDA': 'PXDA',
  'PEDO': 'PXDO',
  'PENE': 'PXNE',
  'PIPI': 'PXPI',
  'PITO': 'PXTO',
  'POPO': 'PXPO',
  'PUTA': 'PXTA',
  'PUTO': 'PXTO',
  'QULO': 'QXLO',
  'RATA': 'RXTA',
  'ROBA': 'RXBA',
  'ROBE': 'RXBE',
  'ROBO': 'RXBO',
  'RUIN': 'RXIN',
  'SENO': 'SXNO',
  'TETA': 'TXTA',
  'VACA': 'VXCA',
  'VAGA': 'VXGA',
  'VAGO': 'VXGO',
  'VAKA': 'VXKA',
  'VUEI': 'VXEI',
  'VUEY': 'VXEY',
  'WUEI': 'WXEI',
  'WUEY': 'WXEY'
});

_defineProperty(DocumentGenerator, "getLastCURPDigit", function (incompleteCurp) {
  var dictionary = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  var lnSum = 0.0;
  var lnDigt = 0.0;

  for (var i = 0; i < 17; i++) {
    lnSum = lnSum + dictionary.indexOf(incompleteCurp.charAt(i)) * (18 - i);
  }

  lnDigt = 10 - lnSum % 10;
  if (lnDigt === 10) return 0;
  return lnDigt;
});

_defineProperty(DocumentGenerator, "badWordsRFC", {
  'BUEI': 'BUEX',
  'BUEY': 'BUEX',
  'CACA': 'CACX',
  'CACO': 'CACX',
  'CAGA': 'CAGX',
  'CAGO': 'CAGX',
  'CAKA': 'CAKX',
  'COGE': 'COGX',
  'COJA': 'COJX',
  'COJE': 'COJX',
  'COJI': 'COJX',
  'COJO': 'COJX',
  'CULO': 'CULX',
  'FETO': 'FETX',
  'GUEY': 'GUEX',
  'JOTO': 'JOTX',
  'KACA': 'KACX',
  'KACO': 'KACX',
  'KAGA': 'KAGX',
  'KAGO': 'KAGX',
  'KOGE': 'KOGX',
  'KOJO': 'KOJX',
  'KAKA': 'KAKX',
  'KULO': 'KULX',
  'MAME': 'MAMX',
  'MAMO': 'MAMX',
  'MEAR': 'MEAX',
  'MEON': 'MEOX',
  'MION': 'MIOX',
  'MOCO': 'MOCX',
  'MULA': 'MULX',
  'PEDA': 'PEDX',
  'PEDO': 'PEDX',
  'PENE': 'PENX',
  'PUTA': 'PUTX',
  'PUTO': 'PUTX',
  'QULO': 'QULX',
  'RATA': 'RATX',
  'RUIN': 'RUIX'
});

_defineProperty(DocumentGenerator, "characterValues", {
  '0': '00',
  '1': '01',
  '2': '02',
  '3': '03',
  '4': '04',
  '5': '05',
  '6': '06',
  '7': '07',
  '8': '08',
  '9': '09',
  'A': '10',
  'B': '11',
  'C': '12',
  'D': '13',
  'F': '15',
  'E': '14',
  'G': '16',
  'H': '17',
  'I': '18',
  'J': '19',
  'K': '20',
  'L': '21',
  'M': '22',
  'N': '23',
  '&': '24',
  'O': '25',
  'P': '26',
  'Q': '27',
  'R': '28',
  'S': '29',
  'T': '30',
  'U': '31',
  'V': '32',
  'W': '33',
  'X': '34',
  'Y': '35',
  'Z': '36',
  ' ': '37',
  'Ñ': '38'
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvRG9jdW1lbnRHZW5lcmF0b3IudHMiXSwibmFtZXMiOlsiRG9jdW1lbnRUeXBlIiwiRG9jdW1lbnRHZW5lcmF0b3IiLCJuYW1lIiwic3VybmFtZUZhdGhlciIsInN1cm5hbWVNb3RoZXIiLCJib3JuRGF5IiwiYm9ybk1vbnRoIiwiYm9yblllYXIiLCJ0eXBlIiwiY29tbW9uUGFydCIsIlN0cmluZ1V0aWxzIiwiZ2V0Rmlyc3RJbnRlcm5hbFZvd2VsIiwicmVtb3ZlQmFkV29yZHMiLCJzdWJzdHJpbmciLCJzdGF0ZU5hbWUiLCJjbGVhclN0cmluZyIsInJlbW92ZUFjY2VudHMiLCJwYXJzZWRTdGF0ZU5hbWUiLCJzdGF0ZXMiLCJnZW5kZXIiLCJ3b3JkIiwiYmFkV29yZHNMaXN0IiwiQ1VSUCIsImJhZFdvcmRzQ1VSUCIsImJhZFdvcmRzUkZDIiwiYm9yblN0YXRlIiwicmVtb3ZlQ29tbW9uTmFtZXMiLCJyZW1vdmVQcmVmaXhlcyIsImN1cnAiLCJnZXRDb21tb25QYXJ0IiwiZ2V0R2VuZGVyTGV0dGVyIiwiZ2V0Qm9yblN0YXRlQ29kZSIsImdldEZpcnN0SW50ZXJuYWxDb25zb25hbnQiLCJnZXRTcGVjaWFsQ2hhciIsImdldExhc3RDVVJQRGlnaXQiLCJSRkMiLCJjdXJyZW50TmFtZSIsIm5vdEFjY2VwdGVkTmFtZXMiLCJyZWR1Y2UiLCJub3RBY2NlcHRlZCIsInJlcGxhY2UiLCJSZWdFeHAiLCJwcmVmaXhlcyIsImluY29tcGxldGVDdXJwIiwiZGljdGlvbmFyeSIsImxuU3VtIiwibG5EaWd0IiwiaSIsImluZGV4T2YiLCJjaGFyQXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRVlBLFk7OztXQUFBQSxZO0FBQUFBLEVBQUFBLFk7QUFBQUEsRUFBQUEsWTtHQUFBQSxZLDRCQUFBQSxZOztJQU9TQyxpQjs7Ozs7Ozs7O2tDQXdDR0MsSSxFQUFjQyxhLEVBQXVCQyxhLEVBQXVCQyxPLEVBQVNDLFMsRUFB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QUssSUFoQmtCO0FBaUJ2QixPQUFLLElBakJrQjtBQWtCdkIsT0FBSyxJQWxCa0I7QUFtQnZCLE9BQUssSUFuQmtCO0FBb0J2QixPQUFLLElBcEJrQjtBQXFCdkIsT0FBSyxJQXJCa0I7QUFzQnZCLE9BQUssSUF0QmtCO0FBdUJ2QixPQUFLLElBdkJrQjtBQXdCdkIsT0FBSyxJQXhCa0I7QUF5QnZCLE9BQUssSUF6QmtCO0FBMEJ2QixPQUFLLElBMUJrQjtBQTJCdkIsT0FBSyxJQTNCa0I7QUE0QnZCLE9BQUssSUE1QmtCO0FBNkJ2QixPQUFLLElBN0JrQjtBQThCdkIsT0FBSyxJQTlCa0I7QUErQnZCLE9BQUssSUEvQmtCO0FBZ0N2QixPQUFLLElBaENrQjtBQWlDdkIsT0FBSyxJQWpDa0I7QUFrQ3ZCLE9BQUssSUFsQ2tCO0FBbUN2QixPQUFLLElBbkNrQjtBQW9DdkIsT0FBSyxJQXBDa0I7QUFxQ3ZCLE9BQUssSUFyQ2tCO0FBc0N2QixPQUFLLElBdENrQjtBQXVDdkIsT0FBSztBQXZDa0IsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHJpbmdVdGlscyBmcm9tICcuL1N0cmluZ1V0aWxzJ1xuXG5leHBvcnQgZW51bSBEb2N1bWVudFR5cGUge1xuICBSRkMgPSAncmZjJyxcbiAgQ1VSUCA9ICdjdXJwJ1xufVxuXG50eXBlIEdlbmRlciA9ICdNJyB8ICdGJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudEdlbmVyYXRvciB7XG5cbiAgc3RhdGljIGdldENVUlAgPSAobmFtZTogc3RyaW5nLCBzdXJuYW1lRmF0aGVyOiBzdHJpbmcsIHN1cm5hbWVNb3RoZXI6IHN0cmluZywgYm9ybkRheTogc3RyaW5nLCBib3JuTW9udGg6IHN0cmluZywgYm9yblllYXI6IHN0cmluZywgYm9yblN0YXRlOiBzdHJpbmcsIGdlbmRlcjogR2VuZGVyKSA9PiB7XG5cbiAgICBuYW1lID0gU3RyaW5nVXRpbHMuY2xlYXJTdHJpbmcobmFtZSlcbiAgICBuYW1lID0gRG9jdW1lbnRHZW5lcmF0b3IucmVtb3ZlQ29tbW9uTmFtZXMobmFtZSlcbiAgICBzdXJuYW1lRmF0aGVyID0gU3RyaW5nVXRpbHMuY2xlYXJTdHJpbmcoc3VybmFtZUZhdGhlcilcbiAgICBzdXJuYW1lRmF0aGVyID0gRG9jdW1lbnRHZW5lcmF0b3IucmVtb3ZlUHJlZml4ZXMoc3VybmFtZUZhdGhlcilcbiAgICBzdXJuYW1lTW90aGVyID0gU3RyaW5nVXRpbHMuY2xlYXJTdHJpbmcoc3VybmFtZU1vdGhlcilcbiAgICBzdXJuYW1lTW90aGVyID0gRG9jdW1lbnRHZW5lcmF0b3IucmVtb3ZlUHJlZml4ZXMoc3VybmFtZU1vdGhlcilcbiAgICBib3JuRGF5ID0gU3RyaW5nVXRpbHMuY2xlYXJTdHJpbmcoYm9ybkRheSlcbiAgICBib3JuTW9udGggPSBTdHJpbmdVdGlscy5jbGVhclN0cmluZyhib3JuTW9udGgpXG4gICAgYm9yblllYXIgPSBTdHJpbmdVdGlscy5jbGVhclN0cmluZyhib3JuWWVhcilcblxuICAgIGxldCBjdXJwID0gRG9jdW1lbnRHZW5lcmF0b3IuZ2V0Q29tbW9uUGFydChuYW1lLCBzdXJuYW1lRmF0aGVyLCBzdXJuYW1lTW90aGVyLCBib3JuRGF5LCBib3JuTW9udGgsIGJvcm5ZZWFyLCBEb2N1bWVudFR5cGUuQ1VSUClcbiAgICBjdXJwID0gRG9jdW1lbnRHZW5lcmF0b3IucmVtb3ZlQmFkV29yZHMoY3VycCwgRG9jdW1lbnRUeXBlLkNVUlApXG4gICAgY3VycCArPSBEb2N1bWVudEdlbmVyYXRvci5nZXRHZW5kZXJMZXR0ZXIoZ2VuZGVyKVxuICAgIGN1cnAgKz0gRG9jdW1lbnRHZW5lcmF0b3IuZ2V0Qm9yblN0YXRlQ29kZShib3JuU3RhdGUpXG4gICAgY3VycCArPSBTdHJpbmdVdGlscy5nZXRGaXJzdEludGVybmFsQ29uc29uYW50KHN1cm5hbWVGYXRoZXIpXG4gICAgY3VycCArPSBTdHJpbmdVdGlscy5nZXRGaXJzdEludGVybmFsQ29uc29uYW50KHN1cm5hbWVNb3RoZXIpXG4gICAgY3VycCArPSBTdHJpbmdVdGlscy5nZXRGaXJzdEludGVybmFsQ29uc29uYW50KG5hbWUpXG5cbiAgICBjdXJwICs9IERvY3VtZW50R2VuZXJhdG9yLmdldFNwZWNpYWxDaGFyKGJvcm5ZZWFyKVxuICAgIGN1cnAgKz0gRG9jdW1lbnRHZW5lcmF0b3IuZ2V0TGFzdENVUlBEaWdpdChjdXJwKVxuICAgIHJldHVybiBjdXJwXG4gIH1cblxuICBzdGF0aWMgZ2V0UkZDID0gKG5hbWU6IHN0cmluZywgc3VybmFtZUZhdGhlcjogc3RyaW5nLCBzdXJuYW1lTW90aGVyOiBzdHJpbmcsIGJvcm5EYXk6IHN0cmluZywgYm9ybk1vbnRoOiBzdHJpbmcsIGJvcm5ZZWFyOiBzdHJpbmcpID0+IHtcblxuICAgIG5hbWUgPSBTdHJpbmdVdGlscy5jbGVhclN0cmluZyhuYW1lKVxuICAgIG5hbWUgPSBEb2N1bWVudEdlbmVyYXRvci5yZW1vdmVDb21tb25OYW1lcyhuYW1lKVxuICAgIHN1cm5hbWVGYXRoZXIgPSBTdHJpbmdVdGlscy5jbGVhclN0cmluZyhzdXJuYW1lRmF0aGVyKVxuICAgIHN1cm5hbWVNb3RoZXIgPSBTdHJpbmdVdGlscy5jbGVhclN0cmluZyhzdXJuYW1lTW90aGVyKVxuICAgIGJvcm5EYXkgPSBTdHJpbmdVdGlscy5jbGVhclN0cmluZyhib3JuRGF5KVxuICAgIGJvcm5Nb250aCA9IFN0cmluZ1V0aWxzLmNsZWFyU3RyaW5nKGJvcm5Nb250aClcbiAgICBib3JuWWVhciA9IFN0cmluZ1V0aWxzLmNsZWFyU3RyaW5nKGJvcm5ZZWFyKVxuXG4gICAgcmV0dXJuIERvY3VtZW50R2VuZXJhdG9yLmdldENvbW1vblBhcnQobmFtZSwgc3VybmFtZUZhdGhlciwgc3VybmFtZU1vdGhlciwgYm9ybkRheSwgYm9ybk1vbnRoLCBib3JuWWVhciwgRG9jdW1lbnRUeXBlLlJGQylcbiAgfVxuXG4gIHN0YXRpYyBnZXRDb21tb25QYXJ0IChuYW1lOiBzdHJpbmcsIHN1cm5hbWVGYXRoZXI6IHN0cmluZywgc3VybmFtZU1vdGhlcjogc3RyaW5nLCBib3JuRGF5LCBib3JuTW9udGgsIGJvcm5ZZWFyLCB0eXBlOiBEb2N1bWVudFR5cGUpIHtcbiAgICBsZXQgY29tbW9uUGFydCA9IHN1cm5hbWVGYXRoZXJbMF1cbiAgICBjb21tb25QYXJ0ICs9IFN0cmluZ1V0aWxzLmdldEZpcnN0SW50ZXJuYWxWb3dlbChzdXJuYW1lRmF0aGVyKVxuICAgIGNvbW1vblBhcnQgKz0gc3VybmFtZU1vdGhlclswXSB8fCAnWCdcbiAgICBjb21tb25QYXJ0ICs9IG5hbWVbMF1cbiAgICBjb21tb25QYXJ0ID0gRG9jdW1lbnRHZW5lcmF0b3IucmVtb3ZlQmFkV29yZHMoY29tbW9uUGFydCwgdHlwZSlcbiAgICBjb21tb25QYXJ0ICs9IGJvcm5ZZWFyLnN1YnN0cmluZygyKVxuICAgIGNvbW1vblBhcnQgKz0gYm9ybk1vbnRoXG4gICAgY29tbW9uUGFydCArPSBib3JuRGF5XG4gICAgcmV0dXJuIGNvbW1vblBhcnRcbiAgfVxuXG4gIHN0YXRpYyBnZXRCb3JuU3RhdGVDb2RlIChzdGF0ZU5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHsgY2xlYXJTdHJpbmcsIHJlbW92ZUFjY2VudHMgfSA9IFN0cmluZ1V0aWxzXG4gICAgY29uc3QgcGFyc2VkU3RhdGVOYW1lID0gcmVtb3ZlQWNjZW50cyhjbGVhclN0cmluZyhzdGF0ZU5hbWUpKVxuICAgIHJldHVybiBEb2N1bWVudEdlbmVyYXRvci5zdGF0ZXNbcGFyc2VkU3RhdGVOYW1lXVxuICB9XG5cbiAgc3RhdGljIGdldEdlbmRlckxldHRlciAoZ2VuZGVyOiBHZW5kZXIpIHtcbiAgICBzd2l0Y2ggKGdlbmRlcikge1xuICAgICAgY2FzZSAnTSc6XG4gICAgICAgIHJldHVybiAnSCdcbiAgICAgIGNhc2UgJ0YnOlxuICAgICAgICByZXR1cm4gJ00nXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldFNwZWNpYWxDaGFyIChib3JuWWVhcjogc3RyaW5nKSB7XG4gICAgaWYgKGJvcm5ZZWFyWzBdID09PSAnMScpIHtcbiAgICAgIHJldHVybiAnMCdcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICdBJ1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyByZW1vdmVDb21tb25OYW1lcyA9IChjdXJyZW50TmFtZTogc3RyaW5nKTogc3RyaW5nID0+IChcbiAgICBEb2N1bWVudEdlbmVyYXRvclxuICAgICAgLm5vdEFjY2VwdGVkTmFtZXNcbiAgICAgIC5yZWR1Y2UoKG5hbWUsIG5vdEFjY2VwdGVkKSA9PiBuYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnXicgKyBub3RBY2NlcHRlZCksICcnKVxuICAgICAgICAsIGN1cnJlbnROYW1lKVxuICApXG5cbiAgc3RhdGljIHJlbW92ZVByZWZpeGVzID0gKGN1cnJlbnROYW1lOiBzdHJpbmcpOiBzdHJpbmcgPT4gKFxuICAgIERvY3VtZW50R2VuZXJhdG9yXG4gICAgICAucHJlZml4ZXNcbiAgICAgIC5yZWR1Y2UoKG5hbWUsIG5vdEFjY2VwdGVkKSA9PiBuYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnXicgKyBub3RBY2NlcHRlZCksICcnKVxuICAgICAgICAsIGN1cnJlbnROYW1lKVxuICApXG5cbiAgc3RhdGljIHJlbW92ZUJhZFdvcmRzICh3b3JkOiBzdHJpbmcsIHR5cGU6IERvY3VtZW50VHlwZSkge1xuICAgIGxldCBiYWRXb3Jkc0xpc3RcblxuICAgIGlmICh0eXBlID09PSBEb2N1bWVudFR5cGUuQ1VSUCkge1xuICAgICAgYmFkV29yZHNMaXN0ID0gRG9jdW1lbnRHZW5lcmF0b3IuYmFkV29yZHNDVVJQXG4gICAgfSBlbHNlIHtcbiAgICAgIGJhZFdvcmRzTGlzdCA9IERvY3VtZW50R2VuZXJhdG9yLmJhZFdvcmRzUkZDXG4gICAgfVxuXG4gICAgaWYgKGJhZFdvcmRzTGlzdFt3b3JkXSkge1xuICAgICAgcmV0dXJuIGJhZFdvcmRzTGlzdFt3b3JkXVxuICAgIH1cblxuICAgIHJldHVybiB3b3JkXG4gIH1cblxuICBzdGF0aWMgc3RhdGVzID0ge1xuICAgICdBR1VBU0NBTElFTlRFUyc6ICdBUycsXG4gICAgJ0JBSkEgQ0FMSUZPUk5JQSc6ICdCQycsXG4gICAgJ0JBSkEgQ0FMSUZPUk5JQSBOT1JURSc6ICdCQycsXG4gICAgJ0JBSkEgQ0FMSUZPUk5JQSBTVVInOiAnQlMnLFxuICAgICdDQU1QRUNIRSc6ICdDQycsXG4gICAgJ0NPQUhVSUxBJzogJ0NMJyxcbiAgICAnQ09MSU1BJzogJ0NNJyxcbiAgICAnQ0hJQVBBUyc6ICdDUycsXG4gICAgJ0NISUhVQUhVQSc6ICdDSCcsXG4gICAgJ0NJVURBRCBERSBNRVhJQ08nOiAnREYnLFxuICAgICdESVNUUklUTyBGRURFUkFMJzogJ0RGJyxcbiAgICAnRFVSQU5HTyc6ICdERycsXG4gICAgJ0dVQU5BSlVBVE8nOiAnR1QnLFxuICAgICdHVUVSUkVSTyc6ICdHUicsXG4gICAgJ0hJREFMR08nOiAnSEcnLFxuICAgICdKQUxJU0NPJzogJ0pDJyxcbiAgICAnTUVYSUNPJzogJ01DJyxcbiAgICAnTUlDSE9BQ0FOJzogJ01OJyxcbiAgICAnTU9SRUxPUyc6ICdNUycsXG4gICAgJ05BWUFSSVQnOiAnTlQnLFxuICAgICdOVUVWTyBMRU9OJzogJ05MJyxcbiAgICAnT0FYQUNBJzogJ09DJyxcbiAgICAnUFVFQkxBJzogJ1BMJyxcbiAgICAnUVVFUkVUQVJPJzogJ1FUJyxcbiAgICAnUVVJTlRBTkEgUk9PJzogJ1FSJyxcbiAgICAnU0FOIExVSVMgUE9UT1NJJzogJ1NQJyxcbiAgICAnU0lOQUxPQSc6ICdTTCcsXG4gICAgJ1NPTk9SQSc6ICdTUicsXG4gICAgJ1RBQkFTQ08nOiAnVEMnLFxuICAgICdUQU1BVUxJUEFTJzogJ1RTJyxcbiAgICAnVExBWENBTEEnOiAnVEwnLFxuICAgICdWRVJBQ1JVWic6ICdWWicsXG4gICAgJ1lVQ0FUQU4nOiAnWU4nLFxuICAgICdaQUNBVEVDQVMnOiAnWlMnXG4gIH1cblxuICBzdGF0aWMgbm90QWNjZXB0ZWROYW1lcyA9IFtcbiAgICAnTUFSSUEgREVMICcsXG4gICAgJ01BUklBIERFIExPUyAnLFxuICAgICdNQVJJQSAnLFxuICAgICdKT1NFIERFICcsXG4gICAgJ0pPU0UgJyxcbiAgICAnTUEuICcsXG4gICAgJ01BICcsXG4gICAgJ00uICcsXG4gICAgJ0ouICcsXG4gICAgJ0ogJ1xuICBdXG5cbiAgc3RhdGljIHByZWZpeGVzID0gW1xuICAgICdERSAnLFxuICAgICdERUwgJ1xuICBdXG5cbiAgc3RhdGljIGJhZFdvcmRzQ1VSUCA9IHtcbiAgICAnQkFDQSc6ICdCWENBJyxcbiAgICAnTE9DTyc6ICdMWENPJyxcbiAgICAnQkFLQSc6ICdCWEtBJyxcbiAgICAnQlVFSSc6ICdCWEVJJyxcbiAgICAnQlVFWSc6ICdCWEVZJyxcbiAgICAnQ0FDQSc6ICdDWENBJyxcbiAgICAnQ0FDTyc6ICdDWENPJyxcbiAgICAnQ0FHQSc6ICdDWEdBJyxcbiAgICAnQ0FHTyc6ICdDWEdPJyxcbiAgICAnQ0FLQSc6ICdDWEtBJyxcbiAgICAnQ0FLTyc6ICdDWEtPJyxcbiAgICAnQ09HRSc6ICdDWEdFJyxcbiAgICAnQ09HSSc6ICdDWEdJJyxcbiAgICAnQ09KQSc6ICdDWEpBJyxcbiAgICAnQ09KRSc6ICdDWEpFJyxcbiAgICAnQ09KSSc6ICdDWEpJJyxcbiAgICAnQ09KTyc6ICdDWEpPJyxcbiAgICAnQ09MQSc6ICdDWExBJyxcbiAgICAnQ1VMTyc6ICdDWExPJyxcbiAgICAnRkFMTyc6ICdGWExPJyxcbiAgICAnRkVUTyc6ICdGWFRPJyxcbiAgICAnR0VUQSc6ICdHWFRBJyxcbiAgICAnR1VFSSc6ICdHWEVJJyxcbiAgICAnR1VFWSc6ICdHWEVZJyxcbiAgICAnSkVUQSc6ICdKWFRBJyxcbiAgICAnSk9UTyc6ICdKWFRPJyxcbiAgICAnS0FDQSc6ICdLWENBJyxcbiAgICAnS0FDTyc6ICdLWENPJyxcbiAgICAnS0FHQSc6ICdLWEdBJyxcbiAgICAnS0FHTyc6ICdLWEdPJyxcbiAgICAnS0FLQSc6ICdLWEtBJyxcbiAgICAnS0FLTyc6ICdLWEtPJyxcbiAgICAnS09HRSc6ICdLWEdFJyxcbiAgICAnS09HSSc6ICdLWEdJJyxcbiAgICAnS09KQSc6ICdLWEpBJyxcbiAgICAnS09KRSc6ICdLWEpFJyxcbiAgICAnS09KSSc6ICdLWEpJJyxcbiAgICAnS09KTyc6ICdLWEpPJyxcbiAgICAnS09MQSc6ICdLWExBJyxcbiAgICAnS1VMTyc6ICdLWExPJyxcbiAgICAnTElMTyc6ICdMWExPJyxcbiAgICAnTE9LQSc6ICdMWEtBJyxcbiAgICAnTE9LTyc6ICdMWEtPJyxcbiAgICAnTUFNRSc6ICdNWE1FJyxcbiAgICAnTUFNTyc6ICdNWE1PJyxcbiAgICAnTUVBUic6ICdNWEFSJyxcbiAgICAnTUVBUyc6ICdNWEFTJyxcbiAgICAnTUVPTic6ICdNWE9OJyxcbiAgICAnTUlBUic6ICdNWEFSJyxcbiAgICAnTUlPTic6ICdNWE9OJyxcbiAgICAnTU9DTyc6ICdNWENPJyxcbiAgICAnTU9LTyc6ICdNWEtPJyxcbiAgICAnTVVMQSc6ICdNWExBJyxcbiAgICAnTVVMTyc6ICdNWExPJyxcbiAgICAnTkFDQSc6ICdOWENBJyxcbiAgICAnTkFDTyc6ICdOWENPJyxcbiAgICAnUEVEQSc6ICdQWERBJyxcbiAgICAnUEVETyc6ICdQWERPJyxcbiAgICAnUEVORSc6ICdQWE5FJyxcbiAgICAnUElQSSc6ICdQWFBJJyxcbiAgICAnUElUTyc6ICdQWFRPJyxcbiAgICAnUE9QTyc6ICdQWFBPJyxcbiAgICAnUFVUQSc6ICdQWFRBJyxcbiAgICAnUFVUTyc6ICdQWFRPJyxcbiAgICAnUVVMTyc6ICdRWExPJyxcbiAgICAnUkFUQSc6ICdSWFRBJyxcbiAgICAnUk9CQSc6ICdSWEJBJyxcbiAgICAnUk9CRSc6ICdSWEJFJyxcbiAgICAnUk9CTyc6ICdSWEJPJyxcbiAgICAnUlVJTic6ICdSWElOJyxcbiAgICAnU0VOTyc6ICdTWE5PJyxcbiAgICAnVEVUQSc6ICdUWFRBJyxcbiAgICAnVkFDQSc6ICdWWENBJyxcbiAgICAnVkFHQSc6ICdWWEdBJyxcbiAgICAnVkFHTyc6ICdWWEdPJyxcbiAgICAnVkFLQSc6ICdWWEtBJyxcbiAgICAnVlVFSSc6ICdWWEVJJyxcbiAgICAnVlVFWSc6ICdWWEVZJyxcbiAgICAnV1VFSSc6ICdXWEVJJyxcbiAgICAnV1VFWSc6ICdXWEVZJ1xuICB9XG5cbiAgc3RhdGljIGdldExhc3RDVVJQRGlnaXQgPSAoaW5jb21wbGV0ZUN1cnA6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGRpY3Rpb25hcnkgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1Ow5FPUFFSU1RVVldYWVonXG4gICAgbGV0IGxuU3VtID0gMC4wXG4gICAgbGV0IGxuRGlndCA9IDAuMFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNzsgaSsrKSB7XG4gICAgICBsblN1bSA9IGxuU3VtICsgZGljdGlvbmFyeS5pbmRleE9mKGluY29tcGxldGVDdXJwLmNoYXJBdChpKSkgKiAoMTggLSBpKVxuICAgIH1cblxuICAgIGxuRGlndCA9IDEwIC0gbG5TdW0gJSAxMFxuICAgIGlmIChsbkRpZ3QgPT09IDEwKSByZXR1cm4gMFxuICAgIHJldHVybiBsbkRpZ3RcbiAgfVxuXG4gIHN0YXRpYyBiYWRXb3Jkc1JGQyA9IHtcbiAgICAnQlVFSSc6ICdCVUVYJyxcbiAgICAnQlVFWSc6ICdCVUVYJyxcbiAgICAnQ0FDQSc6ICdDQUNYJyxcbiAgICAnQ0FDTyc6ICdDQUNYJyxcbiAgICAnQ0FHQSc6ICdDQUdYJyxcbiAgICAnQ0FHTyc6ICdDQUdYJyxcbiAgICAnQ0FLQSc6ICdDQUtYJyxcbiAgICAnQ09HRSc6ICdDT0dYJyxcbiAgICAnQ09KQSc6ICdDT0pYJyxcbiAgICAnQ09KRSc6ICdDT0pYJyxcbiAgICAnQ09KSSc6ICdDT0pYJyxcbiAgICAnQ09KTyc6ICdDT0pYJyxcbiAgICAnQ1VMTyc6ICdDVUxYJyxcbiAgICAnRkVUTyc6ICdGRVRYJyxcbiAgICAnR1VFWSc6ICdHVUVYJyxcbiAgICAnSk9UTyc6ICdKT1RYJyxcbiAgICAnS0FDQSc6ICdLQUNYJyxcbiAgICAnS0FDTyc6ICdLQUNYJyxcbiAgICAnS0FHQSc6ICdLQUdYJyxcbiAgICAnS0FHTyc6ICdLQUdYJyxcbiAgICAnS09HRSc6ICdLT0dYJyxcbiAgICAnS09KTyc6ICdLT0pYJyxcbiAgICAnS0FLQSc6ICdLQUtYJyxcbiAgICAnS1VMTyc6ICdLVUxYJyxcbiAgICAnTUFNRSc6ICdNQU1YJyxcbiAgICAnTUFNTyc6ICdNQU1YJyxcbiAgICAnTUVBUic6ICdNRUFYJyxcbiAgICAnTUVPTic6ICdNRU9YJyxcbiAgICAnTUlPTic6ICdNSU9YJyxcbiAgICAnTU9DTyc6ICdNT0NYJyxcbiAgICAnTVVMQSc6ICdNVUxYJyxcbiAgICAnUEVEQSc6ICdQRURYJyxcbiAgICAnUEVETyc6ICdQRURYJyxcbiAgICAnUEVORSc6ICdQRU5YJyxcbiAgICAnUFVUQSc6ICdQVVRYJyxcbiAgICAnUFVUTyc6ICdQVVRYJyxcbiAgICAnUVVMTyc6ICdRVUxYJyxcbiAgICAnUkFUQSc6ICdSQVRYJyxcbiAgICAnUlVJTic6ICdSVUlYJ1xuICB9XG5cbiAgc3RhdGljIGNoYXJhY3RlclZhbHVlcyA9IHtcbiAgICAnMCc6ICcwMCcsXG4gICAgJzEnOiAnMDEnLFxuICAgICcyJzogJzAyJyxcbiAgICAnMyc6ICcwMycsXG4gICAgJzQnOiAnMDQnLFxuICAgICc1JzogJzA1JyxcbiAgICAnNic6ICcwNicsXG4gICAgJzcnOiAnMDcnLFxuICAgICc4JzogJzA4JyxcbiAgICAnOSc6ICcwOScsXG4gICAgJ0EnOiAnMTAnLFxuICAgICdCJzogJzExJyxcbiAgICAnQyc6ICcxMicsXG4gICAgJ0QnOiAnMTMnLFxuICAgICdGJzogJzE1JyxcbiAgICAnRSc6ICcxNCcsXG4gICAgJ0cnOiAnMTYnLFxuICAgICdIJzogJzE3JyxcbiAgICAnSSc6ICcxOCcsXG4gICAgJ0onOiAnMTknLFxuICAgICdLJzogJzIwJyxcbiAgICAnTCc6ICcyMScsXG4gICAgJ00nOiAnMjInLFxuICAgICdOJzogJzIzJyxcbiAgICAnJic6ICcyNCcsXG4gICAgJ08nOiAnMjUnLFxuICAgICdQJzogJzI2JyxcbiAgICAnUSc6ICcyNycsXG4gICAgJ1InOiAnMjgnLFxuICAgICdTJzogJzI5JyxcbiAgICAnVCc6ICczMCcsXG4gICAgJ1UnOiAnMzEnLFxuICAgICdWJzogJzMyJyxcbiAgICAnVyc6ICczMycsXG4gICAgJ1gnOiAnMzQnLFxuICAgICdZJzogJzM1JyxcbiAgICAnWic6ICczNicsXG4gICAgJyAnOiAnMzcnLFxuICAgICfDkSc6ICczOCdcbiAgfVxuXG59XG4iXX0=