const ss = SpreadsheetApp.getActiveSpreadsheet();
const sheet = ss.getActiveSheet();

const Array_characters_1D = ["Kiefer", "Ruin", "etc."];
Logger.log("Array[] = " + Array_characters_1D);

const Array_characters_2D = [
    ["Who"],
    ["Kiefer ｢キーファ｣"],
    ["King ｢王｣"],
    ["Risa ｢リーサ｣"],
    ["Minister ｢大臣｣"],
    ["Maid ｢女中｣"],
    ["Magarugi ｢マガルギ｣"],
    ["Slalon ｢スラロン｣"],
    ["Alex ｢アレクス｣"],
    ["Deckson ｢デクソン｣"],
    ["Randol ｢ランドル｣"],
    ["Luin ｢ルイン｣"],
    ["Gyavan ｢ギャバン｣"],
];
// semi-automates sheet.getRange()
var numRows = Array_characters_2D.length;
var numColumns = Array_characters_2D[0].length;
Logger.log("Array[] = " + Array_characters_2D);

const Array_characters_3D = [
    ["Who", "What"],
    ["Kiefer", "Prince"],
    ["Ruin", "Punkass Kid"],
];

// var Array[] returns as "'string1','string2','etc.'" ~~~ so replace() replaces "," with "|"
var REGEX = Array_characters_2D.toString().replace(/,/g, "|");
Logger.log("REGEX = " + REGEX);

function beautify() {
    var NAMES = {
        // var REGEX returns as - string1|string2|etc. - so RegExp(REGEX, "g") adds Regular Expression Open & Close slashes + flag ~~~ /REGEX/g INTO /string1|string2|etc./g
        find: RegExp(REGEX, "g"),
        format: SpreadsheetApp.newTextStyle()
            .setForegroundColor("rgb(0,169,0)")
            .setBold(true)
            .build(),
        minLength: 1,
    };

    // END modifiable parameters

    var range = SpreadsheetApp.getActiveRange();
    var values = range.getDisplayValues();
    var match;
    var result = values.map(function (row) {
        return row.map(function (value) {
            var richText = SpreadsheetApp.newRichTextValue().setText(value);

            // Replaces REGEX-matches' TextStyle
            while ((match = NAMES.find.exec(value))) {
                var length = match[0].length;
                if (length >= NAMES.minLength) {
                    richText.setTextStyle(
                        match.index,
                        match.index + length,
                        NAMES.format
                    );
                }
            }
            return richText.build();
        });
    });
    range.setRichTextValues(result);
};

function Characters() {
    // initializes variables
    sheet.getRange(1, 1, numRows, numColumns).setValues(Array_characters_2D);
    Logger.log(Array_characters_2D);
};
