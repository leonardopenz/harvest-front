import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { HarvestContext } from "..";
import { ChartType, ReportTab } from "../../../interfaces/Report";
import style from '../../layout/layout.module.css';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import moment from "moment";
import { Grid, CircularProgress } from "@mui/material";
am4core.useTheme(am4themes_animated);
am4core.options.autoDispose = true;

// import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

type ChartProps = {
    tab: ReportTab
}

export default function Chart({ tab }: ChartProps) {
    const dateFormat = "DD/MM/YYYY";
    const { item, filter, newChart } = useContext(HarvestContext);

    const productionChartId = "chartdiv_" + ReportTab[tab] + "_" + ChartType.production;
    const costChartId = "chartdiv_" + ReportTab[tab] + "_" + ChartType.cost;

    const chartProduction = useRef({} as am4charts.PieChart);
    const chartCost = useRef({} as am4charts.PieChart);

    useEffect(() => {
        if (newChart) {
            chartProduction.current = createChart(ChartType.production, productionChartId);
            chartCost.current = createChart(ChartType.cost, costChartId);
        }
    }, [item]);

    function createChart(type: ChartType, chartId: string) {
        // console.log('createChart()');

        let x = am4core.create(chartId, am4charts.PieChart);
        try { document?.querySelector(`#` + chartId + ` [d*=" M6,15"]`)?.parentElement?.parentElement?.remove(); } catch { }
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
        pieSeries.showOnInit = false;

        var tooltipDescription = "";
        if (type == ChartType.cost) {
            pieSeries.labels.template.text = "$ {value}";
            tooltipDescription = `<span style="margin-right: 3px;">$</span><span style="color: #df1d00;">{` + ChartType[type] + `}</span>`;
        } else if (type == ChartType.production) {
            pieSeries.labels.template.text = "{value.percent.formatNumber('#.0')}%";
            tooltipDescription = `<span style="margin-right: 3px; color: #df1d00;">{` + ChartType[type] + `}</span><span>bins</span>`;
        }

        //<span style="margin-right: 5px;"></span>
        var tooltipHTML = `<div style="text-align: left; font-weight: 600; padding: 10px 8px;;">
            <div style="margin-bottom: 5px;"><span>` + moment(filter.start).format(dateFormat) + ` - ` + moment(filter.end).format(dateFormat) + `</span></div>
            <div><span style="margin-right: 5px; color: #df1d00;">{name}:</span>`+ tooltipDescription + `</div></div>`;

        pieSeries.slices.template.tooltipHTML = tooltipHTML;

        if (type == ChartType.cost) {
            x.legend = new am4charts.Legend();
            x.legend.valueLabels.template.disabled = true;
            x.legend.layout = "horizontal";
            x.legend.contentAlign = "right";
            x.legend.itemContainers.template.clickable = false;
            x.legend.itemContainers.template.focusable = false;
            x.legend.itemContainers.template.hoverable = false;
            x.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;

            var legendContainer = am4core.create("chartdiv_" + ReportTab[tab] + "_legend", am4core.Container);
            legendContainer.width = am4core.percent(100);
            legendContainer.height = am4core.percent(100);
            x.legend.parent = legendContainer;
            try { document?.querySelector(`#chartdiv_` + ReportTab[tab] + `_legend [d*=" M6,15"]`)?.parentElement?.parentElement?.remove(); } catch { }
        }

        return x;
    }

    return (
        <Grid container spacing={2} style={{ marginBottom: "15px" }}>
            <Grid item xs={12} md={12}>
                <div id={"chartdiv_" + ReportTab[tab] + "_legend"} style={{ width: "100%", height: "70px" }}></div>
            </Grid>
            <Grid item xs={12} md={6}>
                <div className={style.tab_content}>
                    <div className={style.chart}>{<div id={productionChartId} style={{ width: "100%", height: "300px" }}></div>}</div>
                    <div className={style.title}>Production</div>
                    <div className={style.total}>TOTAL: {item.totalProduction} bins</div>
                </div>
            </Grid>
            <Grid item xs={12} md={6}>
                <div className={style.tab_content}>
                    <div className={style.chart}>{<div id={costChartId} style={{ width: "100%", height: "300px" }}></div>}</div>
                    <div className={style.title}>Cost</div>
                    <div className={style.total}>TOTAL: ${item.totalCost}</div>
                </div>
            </Grid>
        </Grid>
        //loading ?
        // <div style={{ marginTop: "40px", marginBottom: "40px", textAlign: 'center' }}><CircularProgress color="secondary" /></div>
        // : (
        //     item.categories?.length > 0 ?
        //         <Grid container spacing={2} style={{ marginBottom: "15px" }}>
        //             <Grid item xs={12} md={12}>
        //                 <div id={"chartdiv_" + ReportTab[tab] + "_legend"} style={{ width: "100%", height: "70px" }}></div>
        //             </Grid>
        //             <Grid item xs={12} md={6}>
        //                 <div className={style.tab_content}>
        //                     <div className={style.chart}>{<div id={productionChartId} style={{ width: "100%", height: "300px" }}></div>}</div>
        //                     <div className={style.title}>Production</div>
        //                     <div className={style.total}>TOTAL: {item.totalProduction} bins</div>
        //                 </div>
        //             </Grid>
        //             <Grid item xs={12} md={6}>
        //                 <div className={style.tab_content}>
        //                     <div className={style.chart}>{<div id={costChartId} style={{ width: "100%", height: "300px" }}></div>}</div>
        //                     <div className={style.title}>Cost</div>
        //                     <div className={style.total}>TOTAL: ${item.totalCost}</div>
        //                 </div>
        //             </Grid>
        //         </Grid>
        //         : <div style={{ marginTop: "40px", marginBottom: "40px", textAlign: 'center' }}>There is no data in the period</div>
        //)
    )
}