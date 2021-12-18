import style from './layout.module.css';

function Header() {
    return <div className={style.header}>
        <div className={style.content}>
            <div className={style.image}>
                <img src="/logo.png" alt="Hectre Logo" />
            </div>
        </div>
    </div>;
}

export default Header;