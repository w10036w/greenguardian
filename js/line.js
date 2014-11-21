
$("#indicator").change(function() {
    $("select option:selected").each(function() {
        var index = $(this).val();
        updateLinechart(index);
    });
});

function updateLinechart(index) {

    var scatterdata,
            csvpath,
            ylabel;
    csvpath = "/data/"+index+".csv";
    if (index === 'kt') {
        ylabel = 'CO2 emissions (kt)';
    } else if (index === 'mt') {
        ylabel = 'CO2 emissions (metric tons per capita)';
    } else if (index === 'tm') {
        ylabel = 'Terrestrial and marine protected areas (percentage of total territorial area)';
    }
     else if (index === 'fa') {
        ylabel = 'Forest area (percentage of land area)';
    }
     else if (index === 'eo') {
        ylabel = 'Electricity production from oil, gas and coal sources (percentage of total)';
    }
     else if (index === 'er') {
        ylabel = 'Electricity production from renewable sources, excluding hydroelectric (percentage of total)';
    }
     else if (index === 'nr') {
        ylabel = 'Total natural resources rents (percentage of GDP)';
    }
    d3.csv(csvpath, function(error, csv) {
        if (error)
            return console.log("there was an error loading the csv: " + error);
        console.log("there are " + csv.length + " elements in my csv set");

        var nestFunction = d3.nest().key(function(d) {
            return d.country;
        });
        //create the function that will nest data by country name

        scatterdata = nestFunction.entries(
                csv.map(function(d) {
                    d.x = +d.x;
                    d.y = +d.y;
                    return d;
                })
                );  //pass the formatted data array into the nest function

        console.log("there are " + scatterdata.length + " elements in my data");

        nv.addGraph(function() {
            var chart = nv.models.lineChart()
                    .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                    .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                    .transitionDuration(300)  //how fast do you want the lines to transition?
                    .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                    .showYAxis(true)        //Show the y-axis
                    .showXAxis(true)        //Show the x-axis
                    ;
            var fitScreen = false;
            var width = 600;
            var height = 380;
            var zoom = 3;

            chart.useInteractiveGuideline(true);
            chart.xAxis
                    .axisLabel('Year')
                    .tickFormat(d3.format('d'))
                    .tickValues([1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010]);

            chart.yAxis
                    .axisLabel(ylabel)
                    .tickFormat(d3.format('d'));

            d3.select('#chart1 svg')
                    .attr('perserveAspectRatio', 'xMinYMid')
                    .attr('width', width)
                    .attr('height', height)
                    .datum(scatterdata);

            setChartViewBox();
            //resizeChart();

            // These resizes both do the same thing, and require recalculating the chart
            //nv.utils.windowResize(chart.update);
            //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });
            nv.utils.windowResize(resizeChart);

            function setChartViewBox() {
                var w = width * zoom,
                        h = height * zoom;

                chart
                        .width(w)
                        .height(h);

                d3.select('#chart1 svg')
                        .attr('viewBox', '0 0 ' + w + ' ' + h)
                        .transition().duration(500)
                        .call(chart);
            }

            // This resize simply sets the SVG's dimensions, without a need to recall the chart code
            // Resizing because of the viewbox and perserveAspectRatio settings
            // This scales the interior of the chart unlike the above
            function resizeChart() {
                var container = d3.select('#chart1');
                var svg = container.select('svg');

                if (fitScreen) {
                    // resize based on container's width AND HEIGHT
                    var windowSize = nv.utils.windowSize();
                    svg.attr("width", windowSize.width);
                    svg.attr("height", windowSize.height);
                } else {
                    // resize based on container's width
                    var aspect = chart.width() / chart.height();
                    var targetWidth = parseInt(container.style('width'));
                    svg.attr("width", targetWidth);
                    svg.attr("height", Math.round(targetWidth / aspect));
                }
            }
            ;

            // Assuming your chart is called 'chart'
            var state = chart.state();

            for (var i = 1; i < state.disabled.length; i++) {
                state.disabled[i] = true;
            }

            chart.dispatch.changeState(state);
            chart.update();

            return chart;
        });
    });
}

var scatterdata;
d3.csv("./data/kt.csv", function(error, csv) {
    if (error)
        return console.log("there was an error loading the csv: " + error);
    console.log("there are " + csv.length + " elements in my csv set");

    var nestFunction = d3.nest().key(function(d) {
        return d.country;
    });
    //create the function that will nest data by country name

    scatterdata = nestFunction.entries(
            csv.map(function(d) {
                d.x = +d.x;
                d.y = +d.y;
                return d;
            })
            );  //pass the formatted data array into the nest function

    console.log("there are " + scatterdata.length + " elements in my data");

    nv.addGraph(function() {
        var chart = nv.models.lineChart()
                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .transitionDuration(500)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
                ;
        var fitScreen = false;
        var width = 600;
        var height = 380;
        var zoom = 3;

        chart.useInteractiveGuideline(true);
        chart.xAxis
                .axisLabel('Year')
                .tickFormat(d3.format('d'))
                .tickValues([1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010]);

        chart.yAxis
                .axisLabel('CO2 emissions (kt)')
                .tickFormat(d3.format('d'));

        d3.select('#chart1 svg')
                .attr('perserveAspectRatio', 'xMinYMid')
                .attr('width', width)
                .attr('height', height)
                .datum(scatterdata);

        setChartViewBox();
        //resizeChart();

        // These resizes both do the same thing, and require recalculating the chart
        //nv.utils.windowResize(chart.update);
        //nv.utils.windowResize(function() { d3.select('#chart1 svg').call(chart) });
        nv.utils.windowResize(resizeChart);

        function setChartViewBox() {
            var w = width * zoom,
                    h = height * zoom;

            chart
                    .width(w)
                    .height(h);

            d3.select('#chart1 svg')
                    .attr('viewBox', '0 0 ' + w + ' ' + h)
                    .transition().duration(500)
                    .call(chart);
        }

        // This resize simply sets the SVG's dimensions, without a need to recall the chart code
        // Resizing because of the viewbox and perserveAspectRatio settings
        // This scales the interior of the chart unlike the above
        function resizeChart() {
            var container = d3.select('#chart1');
            var svg = container.select('svg');

            if (fitScreen) {
                // resize based on container's width AND HEIGHT
                var windowSize = nv.utils.windowSize();
                svg.attr("width", windowSize.width);
                svg.attr("height", windowSize.height);
            } else {
                // resize based on container's width
                var aspect = chart.width() / chart.height();
                var targetWidth = parseInt(container.style('width'));
                svg.attr("width", targetWidth);
                svg.attr("height", Math.round(targetWidth / aspect));
            }
        }
        ;

        // Assuming your chart is called 'chart'
        var state = chart.state();

        for (var i = 1; i < state.disabled.length; i++) {
            state.disabled[i] = true;
        }

        chart.dispatch.changeState(state);
        chart.update();

        return chart;
    });
});