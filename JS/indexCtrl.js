var app = angular.module('index', []);
app.controller('indexCtrl', function($scope, $http) {

	$scope.logoNome = "SisguSol";
	
	//GRAPH
	var chart = new AmCharts.AmStockChart();
	var dadosBD = [];
	var sensor1 = [];
	var sensor2 = [];
	var sensor3 = [];
	var sensor4 = [];

	$http.get("http://localhost/sisgusol/PHP/server.php")
		.then(
			//SUCCESS
			function(data) {
				dadosBD = data.data;
				carregadados();
				createStockChart();
				chart.write('chartdiv');
				
			},
			//FAIL
			function(error) {
				console.log("NÃ£o foi possível carregar o BD: "+error);
			}
		);	
	
	function carregadados() {


		for (i = 0; i<dadosBD.length; i++) {

			var temp30 = parseFloat((((parseFloat(dadosBD[i].M_SENSOR30)/5.0)-0.04)/0.009).toFixed(2));
			var temp60 = parseFloat((((parseFloat(dadosBD[i].M_SENSOR60)/5.0)-0.04)/0.009).toFixed(2));

			if (dadosBD[i].NODE_ID==" SENSOR1") {
				sensor1.push({
					date: new Date(dadosBD[i].DATE_TIME),
					sensor30: temp30,
					sensor60: temp60,
				});
			}
			if (dadosBD[i].NODE_ID==" SENSOR2") {
				sensor2.push({
					date: new Date(dadosBD[i].DATE_TIME),
					sensor30: temp30,
					sensor60: temp60,
				});
			}
			if (dadosBD[i].NODE_ID==" SENSOR3") {
				sensor3.push({
					date: new Date(dadosBD[i].DATE_TIME),
					sensor30: temp30,
					sensor60: temp60,
				});
			}
			if (dadosBD[i].NODE_ID==" SENSOR4") {
				sensor4.push({
					date: new Date(dadosBD[i].DATE_TIME),
					sensor30: temp30,
					sensor60: temp60,
				});
			}
		}
	}


	function createStockChart() {

		var categoryAxesSettings = new AmCharts.CategoryAxesSettings();
		categoryAxesSettings.minPeriod = "ss";
		chart.periodValue = "Average";
		chart.categoryAxesSettings = categoryAxesSettings;
		chart.responsive = {"enabled": true};
		chart.export = {"enabled": true};


		// DATASETS //////////////////////////////////////////
		// create data sets first
		var dataSet1 = new AmCharts.DataSet();
		dataSet1.title = "Sensor 1";
		dataSet1.fieldMappings = [{
			fromField: "sensor30",
			toField: "sensor30"
		}, {
			fromField: "sensor60",
			toField: "sensor60"
		}];
		dataSet1.dataProvider = sensor1;
		dataSet1.categoryField = "date";


		var dataSet2 = new AmCharts.DataSet();
		dataSet2.title = "Sensor 2";
		dataSet2.fieldMappings = [{
			fromField: "sensor30",
			toField: "sensor30"
		}, {
			fromField: "sensor60",
			toField: "sensor60"
		}];
		dataSet2.dataProvider = sensor2;
		dataSet2.categoryField = "date";

		var dataSet3 = new AmCharts.DataSet();
		dataSet3.title = "Sensor 3";
		dataSet3.fieldMappings = [{
			fromField: "sensor30",
			toField: "sensor30"
		}, {
			fromField: "sensor60",
			toField: "sensor60"
		}];
		dataSet3.dataProvider = sensor3;
		dataSet3.categoryField = "date";

		var dataSet4 = new AmCharts.DataSet();
		dataSet4.title = "Sensor 4";
		dataSet4.fieldMappings = [{
			fromField: "sensor30",
			toField: "sensor30"
		}, {
			fromField: "sensor60",
			toField: "sensor60"
		}];
		dataSet4.dataProvider = sensor4;
		dataSet4.categoryField = "date";

		// set data sets to the chart
		chart.dataSets = [dataSet1, dataSet2, dataSet3, dataSet4];

		// PANELS ///////////////////////////////////////////

		// first stock panel
		var stockPanel1 = new AmCharts.StockPanel();
		stockPanel1.title = "Sensor a 30cm";
		stockPanel1.percentHeight = 100;

		// graph of first stock panel
		var graph1 = new AmCharts.StockGraph();
		graph1.valueField = "sensor60";
		graph1.comparable = true;
		graph1.compareField = "sensor60";
		graph1.bullet = "round";
		graph1.bulletBorderColor = "#FFFFFF";
		graph1.bulletBorderAlpha = 1;
		graph1.balloonText = "[[title]]: <b>[[value]] KPa</b>";
		graph1.compareGraphBalloonText = "[[title]]:<b>[[value]]</b>";
		graph1.compareGraphBullet = "round";
		graph1.compareGraphBulletBorderColor = "#FFFFFF";
		graph1.compareGraphBulletBorderAlpha = 1;
		stockPanel1.addStockGraph(graph1);

		// create stock legend
		var stockLegend1 = new AmCharts.StockLegend();
		stockLegend1.periodValueTextComparing = "[[percents.sensor30.close]]%";
		stockLegend1.periodValueTextRegular = "[[sensor30.close]]";
		stockPanel1.stockLegend = stockLegend1;

		// set panels to the chart
		chart.panels = [stockPanel1];

		// OTHER SETTINGS ////////////////////////////////////
		var sbsettings = new AmCharts.ChartScrollbarSettings();
		sbsettings.graph = graph1;
		sbsettings.usePeriod = "10mm"; // this will improve performance
		chart.chartScrollbarSettings = sbsettings;

		// CURSOR
		var cursorSettings = new AmCharts.ChartCursorSettings();
		cursorSettings.valueBalloonsEnabled = true;
		chart.chartCursorSettings = cursorSettings;


		// PERIOD SELECTOR ///////////////////////////////////
		var periodSelector = new AmCharts.PeriodSelector();
		periodSelector.position = "left";
		periodSelector.dateFormat = "YYYY-MM-DD JJ:NN";
		periodSelector.periods = [{
			period: "hh",
			count: 1,
			label: "1 hour"
		}, {
			period: "hh",
			count: 2,
			label: "2 hours"
		}, {
			period: "hh",
			count: 5,
			label: "5 hour"
		}, {
			period: "hh",
			count: 12,
			label: "12 hours"
		},{
			period: "DD",
			count: 1,
			label: "1 dia"
		}, {
			period: "DD",
			count: 10,
			label: "10 dias"
		}, {
			period: "MM",
			selected: true,
			count: 1,
			label: "1 mes"
		},{
			period: "MAX",
			label: "MAX"
		}];
		chart.periodSelector = periodSelector;

		var panelsSettings = new AmCharts.PanelsSettings();
		panelsSettings.mouseWheelZoomEnabled = true;
		panelsSettings.usePrefixes = true;
		chart.panelsSettings = panelsSettings;

		// DATA SET SELECTOR
		var dataSetSelector = new AmCharts.DataSetSelector();
		dataSetSelector.position = "left";
		dataSetSelector.language = "pt";
		chart.dataSetSelector = dataSetSelector;
		

	}
});