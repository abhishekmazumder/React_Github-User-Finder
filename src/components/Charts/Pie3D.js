// Include react
import React from 'react';

// Include the react-fusioncharts component
import ReactFC from 'react-fusioncharts';

// Include the fusioncharts library
import FusionCharts from 'fusioncharts';

// Include the chart type
import Chart from 'fusioncharts/fusioncharts.charts';

// Include the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

const ChartComponent = ({ data }) => {
	const chartConfigs = {
		type: 'pie3d', // The chart type
		width: '400', // Width of the chart
		height: '400', // Height of the chart
		dataFormat: 'json', // Data type
		dataSource: {
			// Chart Configuration
			chart: {
				//Set the chart caption
				caption: 'Languages',
				//Set the theme for your chart
				theme: 'fusion',
				decimals: 0, // 0 to hide the decimals & 1 to show the decimals
				pieRadius: '45%',
				// paletteColors: '#333,#f0db4f,#1ed5d6',add fexa colors to add more colors for your chart
			},
			// Chart Data
			data: data,
		},
	};
	return (
		<div>
			<ReactFC {...chartConfigs} />;
		</div>
	);
};

export default ChartComponent;
