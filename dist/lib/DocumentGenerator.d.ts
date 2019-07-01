export declare enum DocumentType {
    RFC = "rfc",
    CURP = "curp"
}
declare type Gender = 'M' | 'F';
export default class DocumentGenerator {
    static getCURP: (name: string, surnameFather: string, surnameMother: string, bornDay: string, bornMonth: string, bornYear: string, bornState: string, gender: Gender) => string;
    static getRFC: (name: string, surnameFather: string, surnameMother: string, bornDay: string, bornMonth: string, bornYear: string) => string;
    static getCommonPart(name: string, surnameFather: string, surnameMother: string, bornDay: any, bornMonth: any, bornYear: any, type: DocumentType): string;
    static getBornStateCode(stateName: string): any;
    static getGenderLetter(gender: Gender): "M" | "H";
    static getSpecialChar(bornYear: string): "A" | "0";
    static removeCommonNames: (currentName: string) => string;
    static removePrefixes: (currentName: string) => string;
    static removeBadWords(word: string, type: DocumentType): any;
    static states: {
        'AGUASCALIENTES': string;
        'BAJA CALIFORNIA': string;
        'BAJA CALIFORNIA NORTE': string;
        'BAJA CALIFORNIA SUR': string;
        'CAMPECHE': string;
        'COAHUILA': string;
        'COLIMA': string;
        'CHIAPAS': string;
        'CHIHUAHUA': string;
        'CIUDAD DE MEXICO': string;
        'DISTRITO FEDERAL': string;
        'DURANGO': string;
        'GUANAJUATO': string;
        'GUERRERO': string;
        'HIDALGO': string;
        'JALISCO': string;
        'MEXICO': string;
        'MICHOACAN': string;
        'MORELOS': string;
        'NAYARIT': string;
        'NUEVO LEON': string;
        'OAXACA': string;
        'PUEBLA': string;
        'QUERETARO': string;
        'QUINTANA ROO': string;
        'SAN LUIS POTOSI': string;
        'SINALOA': string;
        'SONORA': string;
        'TABASCO': string;
        'TAMAULIPAS': string;
        'TLAXCALA': string;
        'VERACRUZ': string;
        'YUCATAN': string;
        'ZACATECAS': string;
    };
    static notAcceptedNames: string[];
    static prefixes: string[];
    static badWordsCURP: {
        'BACA': string;
        'LOCO': string;
        'BAKA': string;
        'BUEI': string;
        'BUEY': string;
        'CACA': string;
        'CACO': string;
        'CAGA': string;
        'CAGO': string;
        'CAKA': string;
        'CAKO': string;
        'COGE': string;
        'COGI': string;
        'COJA': string;
        'COJE': string;
        'COJI': string;
        'COJO': string;
        'COLA': string;
        'CULO': string;
        'FALO': string;
        'FETO': string;
        'GETA': string;
        'GUEI': string;
        'GUEY': string;
        'JETA': string;
        'JOTO': string;
        'KACA': string;
        'KACO': string;
        'KAGA': string;
        'KAGO': string;
        'KAKA': string;
        'KAKO': string;
        'KOGE': string;
        'KOGI': string;
        'KOJA': string;
        'KOJE': string;
        'KOJI': string;
        'KOJO': string;
        'KOLA': string;
        'KULO': string;
        'LILO': string;
        'LOKA': string;
        'LOKO': string;
        'MAME': string;
        'MAMO': string;
        'MEAR': string;
        'MEAS': string;
        'MEON': string;
        'MIAR': string;
        'MION': string;
        'MOCO': string;
        'MOKO': string;
        'MULA': string;
        'MULO': string;
        'NACA': string;
        'NACO': string;
        'PEDA': string;
        'PEDO': string;
        'PENE': string;
        'PIPI': string;
        'PITO': string;
        'POPO': string;
        'PUTA': string;
        'PUTO': string;
        'QULO': string;
        'RATA': string;
        'ROBA': string;
        'ROBE': string;
        'ROBO': string;
        'RUIN': string;
        'SENO': string;
        'TETA': string;
        'VACA': string;
        'VAGA': string;
        'VAGO': string;
        'VAKA': string;
        'VUEI': string;
        'VUEY': string;
        'WUEI': string;
        'WUEY': string;
    };
    static getLastCURPDigit: (incompleteCurp: string) => number;
    static badWordsRFC: {
        'BUEI': string;
        'BUEY': string;
        'CACA': string;
        'CACO': string;
        'CAGA': string;
        'CAGO': string;
        'CAKA': string;
        'COGE': string;
        'COJA': string;
        'COJE': string;
        'COJI': string;
        'COJO': string;
        'CULO': string;
        'FETO': string;
        'GUEY': string;
        'JOTO': string;
        'KACA': string;
        'KACO': string;
        'KAGA': string;
        'KAGO': string;
        'KOGE': string;
        'KOJO': string;
        'KAKA': string;
        'KULO': string;
        'MAME': string;
        'MAMO': string;
        'MEAR': string;
        'MEON': string;
        'MION': string;
        'MOCO': string;
        'MULA': string;
        'PEDA': string;
        'PEDO': string;
        'PENE': string;
        'PUTA': string;
        'PUTO': string;
        'QULO': string;
        'RATA': string;
        'RUIN': string;
    };
    static characterValues: {
        '0': string;
        '1': string;
        '2': string;
        '3': string;
        '4': string;
        '5': string;
        '6': string;
        '7': string;
        '8': string;
        '9': string;
        'A': string;
        'B': string;
        'C': string;
        'D': string;
        'F': string;
        'E': string;
        'G': string;
        'H': string;
        'I': string;
        'J': string;
        'K': string;
        'L': string;
        'M': string;
        'N': string;
        '&': string;
        'O': string;
        'P': string;
        'Q': string;
        'R': string;
        'S': string;
        'T': string;
        'U': string;
        'V': string;
        'W': string;
        'X': string;
        'Y': string;
        'Z': string;
        ' ': string;
        'Ñ': string;
    };
}
export {};