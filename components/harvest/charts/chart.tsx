import { useContext, useLayoutEffect, useRef } from "react";
import { HarvestContext } from "..";
import { ChartType, ReportTab } from "../../../interfaces/Report";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import moment from "moment";
am4core.useTheme(am4themes_animated);

type ChartProps = {
    tab: ReportTab
    type: ChartType
}

export default function Chart({ tab, type }: ChartProps) {
    const dateFormat = "DD/MM/YYYY";
    const { item, filter, setFilter } = useContext(HarvestContext);
    const chart = useRef({} as any);
    const chartId = "chartdiv_" + ReportTab[tab] + "_" + ChartType[type];

    useLayoutEffect(() => {
        let x = am4core.create(chartId, am4charts.PieChart);
        x.data = item.categories;
        x.radius = am4core.percent(90);

        var colorSet = new am4core.ColorSet();
        colorSet.list = ["#77d5d4", "#1A248A", "#F1E15A", "#c767dc", "#6794dc", "#d57778"].map(function (color) {
            return am4core.color(color);
        });

        var pieSeries = x.series.push(new am4charts.PieSeries());
        pieSeries.colors = colorSet;
        pieSeries.dataFields.value = ChartType[type];
        pieSeries.dataFields.category = "name";
        pieSeries.alignLabels = false;
        pieSeries.labels.template.radius = am4core.percent(-40);
        pieSeries.labels.template.fill = am4core.color("white");
        pieSeries.ticks.template.disabled = true;
        (pieSeries.tooltip || {} as any).getFillFromObject = false;
        (pieSeries.tooltip || {} as any).background.fill = am4core.color("#fff");
        (pieSeries.tooltip || {} as any).background.fillOpacity = 2;
        (pieSeries.tooltip || {} as any).autoTextColor = false;
        (pieSeries.tooltip || {} as any).label.fill = am4core.color("#000");
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        var tooltipDescription = "";
        if (type == ChartType.cost) {
            pieSeries.labels.template.text = "$ {value}";
            tooltipDescription = `<span style="margin-right: 3px;">$</span><span style="color: #df1d00;">{` + ChartType[type] + `}</span>`;
        } else if (type == ChartType.production) {
            pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
            tooltipDescription = `<span style="margin-right: 3px; color: #df1d00;">{` + ChartType[type] + `}</span><span>bins</span>`;
        }

        var tooltipHTML = `<div style="text-align: left; font-weight: 600; padding: 15px;">
            <div>` + moment(filter.start).format(dateFormat) + ` - ` + moment(filter.end).format(dateFormat) + `</div>
            <div><span style="margin-right: 5px; color: #df1d00;">{name}:</span>`+ tooltipDescription + `</div></div>`;

        pieSeries.slices.template.tooltipHTML = tooltipHTML;
        chart.current = x;

        // document.querySelector('[d*=" M6,15"]')?.remove();

        return () => { x.dispose(); };
    }, []);

    return (<div id={chartId} style={{ width: "100%", height: "300px" }}></div>)
}