// Include react
import React from 'react';

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Include the fusioncharts library
import FusionCharts from 'fusioncharts';

// Include the chart type
import Chart from 'fusioncharts/fusioncharts.charts';

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const Doughnut2D = ({ data }) => {
	const chartConfigs = {
		type: 'doughnut2d', // The chart type
		width: '100%', // Width of the chart
		height: '400', // Height of the chart
		dataFormat: 'json', // Data type
		dataSource: {
			// Chart Configuration
			chart: {
				//Set the chart caption
				caption: 'Stars Per Language',
				decimals: 1, // 0 to hide the decimals & 1 to show the decimals
				theme: 'candy',
				doughnutRadius: '45%',
				showPercentValues: 0,
				// paletteColors: '#333,#f0db4f,#1ed5d6', // add hexa colors to add more colors for your chart
			},
			// Chart Data
			data: data,
		},
	};
	return (
		<div>
			<ReactFC {...chartConfigs} />
		</div>
	);
};

export default Doughnut2D;
