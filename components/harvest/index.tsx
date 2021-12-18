import { Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';

import { Box } from "@mui/system";
import axios from "axios"
import { useEffect, useState, createContext, SetStateAction, useRef } from "react"
import Report from "../../interfaces/Report"
import Panel from "../layout/panel";
import { DateRange } from '@mui/lab/DateRangePicker/RangeTypes';
import HarvestFilters from './filters';
import ProductionChart from './charts/production';

type HarvestContextData = {
    item: Report
    filter: Filter
    setFilter: (filter: SetStateAction<Filter>) => void
}

type Filter = {
    start: string
    end: string
    orchardId: number[]
    tab: number
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export const HarvestContext = createContext({} as HarvestContextData);

export default function HarvestProvider() {
    const [loading, setLoading] = useState<boolean>(false);
    const [item, setItem] = useState<Report>({} as Report)
    const [filter, setFilter] = useState<Filter>({ tab: 0 } as Filter);

    useEffect(() => {
        setItem({
            totalProduction: 236,
            totalCost: 403.255127583846,
            categories: [
                {
                    id: "1ba383ea-e9f0-4c35-8f01-ed88c7eeaf2a",
                    name: "Taihape Woods 1",
                    production: 24,
                    cost: 67.209187930641
                },
                {
                    id: "34a76a76-23c6-40dd-b8c7-b822063f17b1",
                    name: "Wanaka Meadows",
                    production: 32,
                    cost: 67.209187930641
                },
                {
                    id: "4eb58296-5eda-49a1-9831-5838e52bc4dd",
                    name: "Taihape Woods 2",
                    production: 44,
                    cost: 67.209187930641
                },
                {
                    id: "7ba12acf-95b3-4c8d-80ca-4c2b562971cc",
                    name: "Gore's River",
                    production: 48,
                    cost: 67.209187930641
                },
                {
                    id: "b6dbb181-48ff-4ff7-b395-7fa8dcc146c4",
                    name: "Raglan's Haven",
                    production: 48,
                    cost: 67.209187930641
                },
                {
                    id: "ef71e690-4bbb-4684-9ebb-4b8fcd23eceb",
                    name: "Oamaru Hills",
                    production: 40,
                    cost: 67.209187930641
                }
            ]
        });

        // axios.get(process.env.API_LINK + `/landingpage/${item_id}`).then(({ data }) => {
        //     setLoading(false)
        //     if (data.success)
        //         setItem(data.result)
        // }).catch(e => setLoading(false))
    }, [])

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    return (
        <HarvestContext.Provider value={{ item, filter, setFilter }}>
            <Panel>
                <HarvestFilters />
            </Panel>
            <Panel title={"percentage"}>
                <Tabs
                    value={filter.tab}
                    onChange={(e, newValue) => setFilter(prevstate => ({ ...prevstate, tab: newValue }))}
                    textColor="primary"
                    indicatorColor="secondary"
                >
                    <Tab label="Varieties" />
                    <Tab label="Orchards" />
                </Tabs>
                <TabPanel value={filter.tab} index={0}>
                    <ProductionChart />
                </TabPanel>
                <TabPanel value={filter.tab} index={1}>
                    Orchards
                </TabPanel>
            </Panel>
        </HarvestContext.Provider>
    )
}