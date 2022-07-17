var NAMES_range = sheet.getRange(
    "A2:A" + SpreadsheetApp.getActiveSpreadsheet().getLastRow()
);

//var Array_NAMES = [NAMES_range.getDisplayValues()];
var Array_NAMES = NAMES_range.getValues().toString().replace(/,{1,}/g, "|"); //.replace(/(.*)./g,"$1");
Logger.log("Test = " + Array_NAMES);

var NAMES_TextStyle = {
    // var REGEX returns as - string1|string2|etc. - so RegExp(REGEX, "g") adds Regular Expression Open & Close slashes + flag ~~~ /REGEX/g INTO /string1|string2|etc./g
    find: RegExp(Array_NAMES, "g"),
    format: SpreadsheetApp.newTextStyle()
        .setForegroundColor("rgb(0,169,0)")
        .setBold(true)
        .build(),
    minLength: 1,
};
