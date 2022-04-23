import Image from 'next/image';
import CartSVG from '../../assets/cart.svg';
import styles from '../../../styles/Header.module.css';
import b from '../../assets/bejamasvector/b.svg';
import e from '../../assets/bejamasvector/e.svg';
import j from '../../assets/bejamasvector/j.svg';
import a from '../../assets/bejamasvector/a.svg';
import m from '../../assets/bejamasvector/m.svg';
import line from '../../assets/bejamasvector/line.svg';
import s from '../../assets/bejamasvector/s.svg';
import Badge from '@mui/material/Badge';
import {useState} from 'react';

interface props { 
    badgeContent: number;
   
    cartItens: ()=>void
}


export default function Header({badgeContent,  cartItens}:props) {
    
    return <>
        <header className={styles.header}>
            
            <div className="logo">
                <Image src={b} width={10} />
                <Image src={e} width={10} />
                <Image src={j} width={10} />
                <Image src={a} width={10} />
                <Image src={m} width={10} />
                <Image src={a} width={10} />
                <Image src={s} width={10} />
                <Image src={line} width={10} />
            </div>
            <div className="icon">
                
            <Badge onClick={cartItens} badgeContent={badgeContent} color="secondary" style={{marginTop:'10px'}}>
            <Image src={CartSVG} width={30} />
          </Badge>
            </div>

        </header>
        <div className={styles.line}></div>
    </>
} 