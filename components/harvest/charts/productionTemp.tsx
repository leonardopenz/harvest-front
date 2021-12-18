import dynamic from "next/dynamic";
import { useContext } from "react";
import { HarvestContext } from "..";
// const Pie = dynamic(
//     () => import("@ant-design/charts").then((mod) => mod.Pie) as any,
//     { ssr: false }
// ) as any
// import { Pie } from '@ant-design/charts';

// import {
//     Chart,
//     PieSeries,
//     Title,
//     ArgumentAxis,
//     ValueAxis,
//     Tooltip,
// } from '@devexpress/dx-react-chart-material-ui';
// import { EventTracker } from '@devexpress/dx-react-chart';

export default function ProductionChart() {
    const { item, filter, setFilter } = useContext(HarvestContext);

    var config = {
        appendPadding: 10,
        data: item.categories,
        angleField: 'production',
        colorField: 'name',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            // content: function content(_ref) {
            //     var percent = _ref.percent;
            //     return ''.concat((percent * 100).toFixed(0), '%');
            // },
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [{ type: 'element-active' }],
    };

    return (
        <>
            {/* {item.categories &&
                <Chart
                    data={item.categories}
                >
                    <PieSeries
                        valueField="production"
                        argumentField="name"
                    />
                    <Title
                        text="World population (billion)"
                    />
                    <EventTracker />
                    <Tooltip targetItem={targetItem} onTargetItemChange={this.changeTargetItem} />
                </Chart>
            } */}
            {/* {item.categories && <Pie {...config} />} */}
        </>
    )
}