import { ReactNode } from "react"
import style from './layout.module.css';

type PanelProps = {
    children: ReactNode
    title?: string
}

export default function Panel({ children, title }: PanelProps) {
    return (
        <div className={style.panel}>
            {title &&
                <div className={style.title}>
                    {title}
                </div>
            }
            <div className={style.body}>
                {children}
            </div>
        </div>
    )
}