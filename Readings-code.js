var timeFrame = 24; // default timeframe is 24 hourly readings ...
                    // to be displayed on the chart
//create the menus
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Import CSV file', functionName: 'importCSV'},
    {name: 'Draw chart: last day', functionName: 'drawChart1d'},
    {name: 'Draw chart: last 3 days', functionName: 'drawChart3d'},
    {name: 'Draw chart: last 7 days', functionName: 'drawChart7d'},
  ];
  spreadsheet.addMenu('Chart', menuItems);
}

function drawChart1d() {
  drawChart(24);
}
function drawChart3d() {
  drawChart(3*24);
}
function drawChart7d() {
  drawChart(7*24);
}

//TODO - error checking for no matching file
function importCSV() {
  var file = DriveApp.getFilesByName("readings.csv").next();
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow+1, 1, csvData.length, csvData[0].length).setValues(csvData)
}



function drawChart(numRows) {
  //This uses the EmbeddedChart Class!
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  Logger.log(lastRow)
  //get the last numRows rows, where numRows is set by menu
  var range = sheet.getRange(lastRow-numRows,1,numRows,4);
  
  var chartBuilder = sheet.newChart();
  var headerRow = sheet.getRange(1,1,1,4).getValues()
  chartBuilder.addRange(range)
    .setChartType(Charts.ChartType.LINE)
    .setPosition(5, 6, 0, 0)
    .setOption('title', 'Readings')
    .setOption('legend', {position: 'top'})
    .setOption('series', {
      0: {targetAxisIndex: 0,labelInLegend:headerRow[0][1]},
      1: {targetAxisIndex: 1, labelInLegend:headerRow[0][2]},
      2: {targetAxisIndex: 1, labelInLegend:headerRow[0][3]}
    })
    .setOption('vAxes', {
      0: {title: 'Pressure', viewWindow: {min: 950, max: 1050}},
      1: {title: 'Temperature & Humidity', viewWindow: {min: -20, max: 100}}
    })
    
  ;
  sheet.insertChart(chartBuilder.build());
}
