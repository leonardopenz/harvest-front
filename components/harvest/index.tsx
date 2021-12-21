import dynamic from "next/dynamic";
import axios from "axios"
// import { Tabs } from '@mui/material';
// import Tab from '@mui/material/Tab';
import { Box } from "@mui/system";
import { useEffect, useState, createContext, SetStateAction, useRef } from "react"
import Report from "../../interfaces/Report"
import Panel from "../layout/panel";
import HarvestFilters from './filters';
import { ReportTab } from "../../interfaces/Report";
import moment from "moment";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Chart = dynamic(
    () => import("./charts/chart"),
    { ssr: false }
);

type HarvestContextData = {
    item: Report
    filter: Filter
    setFilter: (filter: SetStateAction<Filter>) => void
    loading: boolean
}

type Filter = {
    start: string
    end: string
    orchards: string[]
    tab: string
}

export const HarvestContext = createContext({} as HarvestContextData);

export default function HarvestProvider() {
    const dateFormat = "YYYY-MM-DD";
    const [item, setItem] = useState<Report>({} as Report)
    const [filter, setFilter] = useState<Filter>({ tab: '1', start: moment().subtract(1, 'months').format(dateFormat), end: moment().format(dateFormat) } as Filter);
    const [loading, setLoading] = useState<boolean>(true);

    // useEffect(() => {
    //     setItem({
    //         totalProduction: 236,
    //         totalCost: 403.255,
    //         categories: [
    //             {
    //                 id: "1ba383ea-e9f0-4c35-8f01-ed88c7eeaf2a",
    //                 name: "Taihape Woods 1",
    //                 production: 24,
    //                 cost: 67.209
    //             },
    //             {
    //                 id: "34a76a76-23c6-40dd-b8c7-b822063f17b1",
    //                 name: "Wanaka Meadows",
    //                 production: 32,
    //                 cost: 67.209
    //             },
    //             {
    //                 id: "4eb58296-5eda-49a1-9831-5838e52bc4dd",
    //                 name: "Taihape Woods 2",
    //                 production: 44,
    //                 cost: 67.209
    //             },
    //             {
    //                 id: "7ba12acf-95b3-4c8d-80ca-4c2b562971cc",
    //                 name: "Gore's River",
    //                 production: 48,
    //                 cost: 67.209
    //             },
    //             {
    //                 id: "b6dbb181-48ff-4ff7-b395-7fa8dcc146c4",
    //                 name: "Raglan's Haven",
    //                 production: 48,
    //                 cost: 67.209
    //             },
    //             {
    //                 id: "ef71e690-4bbb-4684-9ebb-4b8fcd23eceb",
    //                 name: "Oamaru Hills",
    //                 production: 40,
    //                 cost: 67.209
    //             }
    //         ]
    //     });
    // }, [filter])

    useEffect(() => {
        setLoading(true);
        let orchards = filter.orchards?.length > 0 ? filter.orchards.join(",") : '';
        axios.get('/api/harvest', { params: { start: filter.start, end: filter.end, tab: filter.tab, orchards } }).then(({ data }) => {
            setLoading(false);
            setItem(data);
        }).catch(e => { setLoading(false) });
    }, [filter])

    return (
        <HarvestContext.Provider value={{ item, filter, setFilter, loading }}>
            <Panel>
                <HarvestFilters />
            </Panel>
            <Panel title={"percentage"}>
                <TabContext value={filter.tab}>
                    <TabList
                        textColor="primary"
                        indicatorColor="secondary"
                        onChange={(e, newValue) => setFilter(prevstate => ({ ...prevstate, tab: newValue }))}
                    >
                        <Tab label="Varieties" value="1" />
                        <Tab label="Orchards" value="2" />
                    </TabList>
                    <TabPanel value={'1'}><Chart tab={ReportTab.varieties} /></TabPanel>
                    <TabPanel value={'2'}><Chart tab={ReportTab.orchards} /></TabPanel>
                </TabContext>
            </Panel>
        </HarvestContext.Provider>
    )
}