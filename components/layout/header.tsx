import Image from 'next/image';
import style from './layout.module.css';

function Header() {
    return <div className={style.header}>
        <div className={style.content}>
            <div className={style.image}>
                <a href="https://hectre.com/" target="_blank" rel="noreferrer"><Image src="/logo.png" alt="Hectre Logo" /></a>
            </div>
        </div>
    </div>;
}

export default Header;