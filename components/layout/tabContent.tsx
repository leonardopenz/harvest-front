import { ReactNode } from "react"
import style from './layout.module.css';

type TabContentProps = {
    chart: ReactNode
    title: string
    total: string
}

export default function TabContent({ chart, title, total }: TabContentProps) {
    return (
        <div className={style.tab_content}>
            <div className={style.chart}>{chart}</div>
            <div className={style.title}>{title}</div>
            <div className={style.total}>TOTAL: {total}</div>
        </div>
    )
}