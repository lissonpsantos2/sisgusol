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
	var sensor5 = [];	

	$http.get("http://localhost/SisguSol2/PHP/server.php")
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
				console.log("Não foi possível carregar o BD: "+erro);
			}
		);	
	
	function carregadados() {

		
		for (i=0; i<dadosBD.length; i++) {

			temp = parseInt(dadosBD[i].EndFisico);
			s30 = parseInt(dadosBD[i].Sensor30);
			s60 = parseInt(dadosBD[i].Sensor60);
			

			switch(temp) {
				case 1:
					sensor1.push({
						date: new Date(dadosBD[i].DataHora),
						sensor30: s30,
						sensor60: s60,
					});
					break;
				case 2:
					sensor2.push({
						date: new Date(dadosBD[i].DataHora),
						sensor30: s30,
						sensor60: s60,
					});
					break;
				case 3:
					sensor3.push({
						date: new Date(dadosBD[i].DataHora),
						sensor30: s30,
						sensor60: s60,
					});
					break;
				case 4:
					sensor4.push({
						date: new Date(dadosBD[i].DataHora),
						sensor30: s30,
						sensor60: s60,
					});
					break;
				case 5:
					sensor5.push({
						date: new Date(dadosBD[i].DataHora),
						sensor30: s30,
						sensor60: s60,
					});

					break;

			}
		}
	}


	function createStockChart() {

		chart.categoryAxesSettings = {maxSeries:0,minPeriod:"mm"};
		chart.responsive = {"enabled": true};
		chart.export = {"enabled": true


		};


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

		var dataSet5 = new AmCharts.DataSet();
		dataSet5.title = "Sensor 5";
		dataSet5.fieldMappings = [{
			fromField: "sensor30",
			toField: "sensor30"
		}, {
			fromField: "sensor60",
			toField: "sensor60"
		}];
		dataSet5.dataProvider = sensor5;
		dataSet5.categoryField = "date";

		// set data sets to the chart
		chart.dataSets = [dataSet1, dataSet2, dataSet3, dataSet4, dataSet5];

		// PANELS ///////////////////////////////////////////

		// first stock panel
		var stockPanel1 = new AmCharts.StockPanel();
		stockPanel1.showCategoryAxis = false;
		stockPanel1.title = "Sensor a 30cm";
		stockPanel1.percentHeight = 50;

		// graph of first stock panel
		var graph1 = new AmCharts.StockGraph();
		graph1.valueField = "sensor30";
		graph1.comparable = true;
		graph1.compareField = "sensor30";
		graph1.bullet = "round";
		graph1.bulletBorderColor = "#FFFFFF";
		graph1.bulletBorderAlpha = 1;
		graph1.balloonText = "[[title]]:<b>[[sensor30]]</b>";
		graph1.compareGraphBalloonText = "[[title]]:<b>[[sensor30]]</b>";
		graph1.compareGraphBullet = "round";
		graph1.compareGraphBulletBorderColor = "#FFFFFF";
		graph1.compareGraphBulletBorderAlpha = 1;
		stockPanel1.addStockGraph(graph1);

		// create stock legend
		var stockLegend1 = new AmCharts.StockLegend();
		stockLegend1.periodValueTextComparing = "[[percents.sensor30.close]]%";
		stockLegend1.periodValueTextRegular = "[[sensor30.close]]";
		stockPanel1.stockLegend = stockLegend1;

		// second stock panel
		var stockPanel2 = new AmCharts.StockPanel();
		stockPanel2.title = "Sensor a 60cm";
		stockPanel2.percentHeight = 50;

		// graph of second stock panel
		var graph2 = new AmCharts.StockGraph();
		graph2.valueField = "sensor60";
		graph2.comparable = true;
		graph2.compareField = "sensor60";
		graph2.bullet = "round";
		graph2.bulletBorderColor = "#FFFFFF";
		graph2.bulletBorderAlpha = 1;
		graph2.balloonText = "[[title]]:<b>[[sensor60]]</b>";
		graph2.compareGraphBalloonText = "[[title]]:<b>[[sensor60]]</b>";
		graph2.compareGraphBullet = "round";
		graph2.compareGraphBulletBorderColor = "#FFFFFF";
		graph2.compareGraphBulletBorderAlpha = 1;
		stockPanel2.addStockGraph(graph2);

		var stockLegend2 = new AmCharts.StockLegend();
		stockLegend2.periodValueTextRegular = "[[sensor60.close]]";
		stockPanel2.stockLegend = stockLegend2;

		// set panels to the chart
		chart.panels = [stockPanel1, stockPanel2];

		// OTHER SETTINGS ////////////////////////////////////
		var sbsettings = new AmCharts.ChartScrollbarSettings();
		sbsettings.graph = graph1;
		chart.chartScrollbarSettings = sbsettings;

		// CURSOR
		var cursorSettings = new AmCharts.ChartCursorSettings();
		cursorSettings.valueBalloonsEnabled = true;
		chart.chartCursorSettings = cursorSettings;


		// PERIOD SELECTOR ///////////////////////////////////
		var periodSelector = new AmCharts.PeriodSelector();
		periodSelector.position = "left";
		periodSelector.fromText = "A partir de:";
		periodSelector.toText = "Ate: ";

		periodSelector.periods = [{
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


		// DATA SET SELECTOR
		var dataSetSelector = new AmCharts.DataSetSelector();
		dataSetSelector.position = "left";
		dataSetSelector.language = "pt";
		chart.dataSetSelector = dataSetSelector;
		

	}
});
