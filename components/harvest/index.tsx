import dynamic from "next/dynamic";
import axios from "axios"
import { useEffect, useState, createContext, SetStateAction } from "react"
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
    newChart: boolean
    setNewChart: (b: SetStateAction<boolean>) => void
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
    const [filter, setFilter] = useState<Filter>({ tab: '1', start: moment().subtract(5, 'months').format(dateFormat), end: moment().format(dateFormat) } as Filter);
    const [loading, setLoading] = useState<boolean>(true);
    const [newChart, setNewChart] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        let orchards = filter.orchards?.length > 0 ? filter.orchards.join(",") : '';
        axios.get('/api/harvest', { params: { start: filter.start, end: filter.end, tab: filter.tab, orchards } }).then(({ data }) => {
            setLoading(false);
            if (data.success) {
                setNewChart(true);
                setItem(data.resource);
            }
        }).catch(e => { setLoading(false) });
    }, [filter])

    return (
        <HarvestContext.Provider value={{ item, filter, setFilter, loading, newChart, setNewChart }}>
            <Panel>
                <HarvestFilters />
            </Panel>
            <Panel title={"percentage"}>
                <TabContext value={filter.tab}>
                    <TabList
                        textColor="primary"
                        indicatorColor="secondary"
                        onChange={(e, newValue) => { setFilter(prevstate => ({ ...prevstate, tab: newValue })); setNewChart(false) }}
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