import { useContext, useLayoutEffect, useRef } from "react";
import { HarvestContext } from "..";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import moment from "moment";
am4core.useTheme(am4themes_animated);

export default function CostChart() {
    const dateFormat = "DD/MM/YYYY";
    const { item, filter, setFilter } = useContext(HarvestContext);
    const chart = useRef({} as any);

    useLayoutEffect(() => {
        let x = am4core.create("chartdiv_cost", am4charts.PieChart);
        x.data = item.categories;
        x.radius = am4core.percent(90);

        var colorSet = new am4core.ColorSet();
        colorSet.list = ["#77d5d4", "#1A248A", "#F1E15A", "#c767dc", "#6794dc", "#d57778"].map(function (color) {
            return am4core.color(color);
        });

        var tooltipHTML = `<div style="text-align: left; font-weight: 600; padding: 15px;">
                            <div>` + moment(filter.start).format(dateFormat) + ` - ` + moment(filter.end).format(dateFormat) + `</div>
                            <div>
                                <span style="margin-right: 5px; color: #df1d00;">{name}:</span>
                                <span style="margin-right: 3px; color: #df1d00;">{cost}</span><span>bins</span>
                            </div>
                            </div>`;

        var pieSeries = x.series.push(new am4charts.PieSeries());
        pieSeries.colors = colorSet;
        pieSeries.dataFields.value = "cost";
        pieSeries.dataFields.category = "name";
        pieSeries.alignLabels = false;
        pieSeries.labels.template.text = "$ {value}";
        pieSeries.labels.template.radius = am4core.percent(-40);
        pieSeries.labels.template.fill = am4core.color("white");
        pieSeries.ticks.template.disabled = true;
        (pieSeries.tooltip || {} as any).getFillFromObject = false;
        (pieSeries.tooltip || {} as any).background.fill = am4core.color("#fff");
        (pieSeries.tooltip || {} as any).background.fillOpacity = 2;
        (pieSeries.tooltip || {} as any).autoTextColor = false;
        (pieSeries.tooltip || {} as any).label.fill = am4core.color("#000");
        pieSeries.slices.template.tooltipHTML = tooltipHTML;
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
        chart.current = x;

        // document.querySelector('[d*=" M6,15"]')?.remove();

        return () => { x.dispose(); };
    }, []);

    return (
        <div id="chartdiv_cost" style={{ width: "100%", height: "300px" }}></div>
    )
}