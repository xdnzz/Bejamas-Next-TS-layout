import Image from 'next/image';
import CartSVG from '../../assets/cart.svg';
import styles from '../../../styles/Header.module.css';
import logo from '../../assets/bejamaslogo.svg';
import Badge from '@mui/material/Badge';

interface props {
    badgeContent: number;

    cartItens: () => void
}


export default function Header({ badgeContent, cartItens }: props) {

    return <>
        <header className={styles.header}>

            <div className={styles.logo}>
                <Image src={logo} width={100}/>
            </div>
            <div className="icon">
                <Badge onClick={cartItens} badgeContent={badgeContent} color="secondary" style={{ marginTop: '10px' }}>
                <Image src={CartSVG} width={30} />
                </Badge>
            </div>

        </header>
        <div className={styles.line}></div>
    </>
} 