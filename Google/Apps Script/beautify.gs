// Copies range you want to use as as searchValue, may need to .replace() commas, etc. to make easier to use.
var Range_REGEX_Match = SpreadsheetApp.getActiveSpreadsheet().getRange("A1:A").getValues().toString()//.replace(/searchValue/FLAGS,"replaceValue")

var REGEX_Match = {
  find: /searchValue/FLAGS, // OR find: RegExp(REGEX_Match_Range, "FLAGS"),
  format: SpreadsheetApp.newTextStyle()
  //.setForegroundColor('#000000')
  //.setBold(true)
	//.etc()
  .build(),
  minLength:1
};

function beautify() {

  // works for highlighted ("Active") range
	var range = SpreadsheetApp.getActiveRange();
  var values = range.getDisplayValues();
  var match;
  var result = values.map(function (row) {
		return row.map(function(value) {
			var richText = SpreadsheetApp.newRichTextValue().setText(value);

// Replaces REGEX_Match (and it's optional styles)

while (match = REGEX_Match.find.exec(value)) {
  var length = match[0].length;
  if (length >= REGEX_Match.minLength) {
  richText.setTextStyle(match.index, match.index + length, REGEX_Match.format);
  }
}
/*			
while (match = Range_REGEX_Match.find.exec(value)) {
  var length = match[0].length;
  if (length >= Range_REGEX_Match.minLength) {
  richText.setTextStyle(match.index, match.index + length, Range_REGEX_Match.format);
  }
}
*/
      return richText.build();
    });
  });
  range.setRichTextValues(result);
};
