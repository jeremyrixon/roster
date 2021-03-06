'use strict';

(function () {
    Office.onReady(function() {
        // Office is ready
        console.log('Office is ready');
        if (!Office.context.requirements.isSetSupported('ExcelApi', 1.7)) {
            console.log('Sorry. The tutorial add-in uses Excel.js APIs that are not available in your version of Office.');
        }
                $(document).ready(function () {
            // The document is ready
            console.log('Document is ready');
            var button = $('#set-color');
            console.log(button);
            button.click(setColor);
        });
    });

    function setColor() {
        console.log('setColor() called');
        Excel.run(function (context) {
            var range = context.workbook.getSelectedRange();
            range.format.fill.color = 'green';

            return context.sync();
        }).catch(function (error) {
            console.log("Error: " + error);
            if (error instanceof OfficeExtension.Error) {
                console.log("Debug info: " + JSON.stringify(error.debugInfo));
            }
        });
    }
})();

$('#create-table').click(createTable);

function createTable() {
    Excel.run(function (context) {
 
        var currentWorksheet = context.workbook.worksheets.getActiveWorksheet();
var expensesTable = currentWorksheet.tables.add("A1:D1", true /*hasHeaders*/);
expensesTable.name = "ExpensesTable";
 
expensesTable.getHeaderRowRange().values =
[["Date", "Merchant", "Category", "Amount"]];

expensesTable.rows.add(null /*add at the end*/, [
["1/1/2017", "The Phone Company", "Communications", "120"],
["1/2/2017", "Northwind Electric Cars", "Transportation", "142.33"],
["1/5/2017", "Best For You Organics Company", "Groceries", "27.9"],
["1/10/2017", "Coho Vineyard", "Restaurant", "33"],
["1/11/2017", "Bellows College", "Education", "350.1"],
["1/15/2017", "Trey Research", "Other", "135"],
["1/15/2017", "Best For You Organics Company", "Groceries", "97.88"]
]);
 
expensesTable.columns.getItemAt(3).getRange().numberFormat = [['€#,##0.00']];
expensesTable.getRange().format.autofitColumns();
expensesTable.getRange().format.autofitRows();
 
        return context.sync();
    })
    .catch(function (error) {
        console.log("Error: " + error);
        if (error instanceof OfficeExtension.Error) {
            console.log("Debug info: " + JSON.stringify(error.debugInfo));
        }
    });
 }