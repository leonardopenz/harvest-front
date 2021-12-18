import { Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';

import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { Box } from "@mui/system";
import axios from "axios"
import { useEffect, useState, createContext, SetStateAction, useRef } from "react"
import Report from "../../interfaces/Report"
import Panel from "../layout/panel";
import { DateRange } from '@mui/lab/DateRangePicker/RangeTypes';

type HarvestContextData = {
    item: Report
    // setItem: (item: SetStateAction<Landingpage>) => void
    // loading: boolean
    // setLoading: (loading: boolean) => void
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

    const [value, setValue] = useState(1);
    const [valueDate, setValueDate] = useState<DateRange<Date | null>>([null, null]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        setLoading(true)
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
        <HarvestContext.Provider value={{ item }}>
            <Panel>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText="Start"
                        endText="End"
                        value={valueDate}
                        onChange={(newValueDate) => {
                            setValueDate(newValueDate);
                        }}
                        renderInput={(startProps, endProps) => (
                            <>
                                <TextField size={'small'} {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField size={'small'} {...endProps} />
                            </>
                        )}
                    />
                </LocalizationProvider>
            </Panel>
            <Panel title={"percentage"}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    textColor="primary"
                    indicatorColor="secondary"
                >
                    <Tab label="Varieties" />
                    <Tab label="Orchards" />
                </Tabs>
                <TabPanel value={value} index={1}>
                    Varieties
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Orchards
                </TabPanel>
            </Panel>
        </HarvestContext.Provider>
    )
}