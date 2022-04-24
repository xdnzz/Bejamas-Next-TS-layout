import styles from "../styles/Home.module.css";
import Header from "../src/components/header";
import Image from "next/image";
import SamuraiDog from "../src/assets/SamuraiDog.png";
import frame1 from "../src/assets/frame1.svg";
import frame2 from "../src/assets/frame2.svg";
import frame3 from "../src/assets/frame3.svg";
import { CgArrowsExchangeV } from "react-icons/cg";
import productList from "./api/productList"
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import useLocalStorage from '../src/customHooks/localStorage';



interface data {
  id: number;
  name: string;
  category: string;
  price: number;
  currency: string;
  image: string;
  bestseller: boolean;
  featured: boolean;
  details: null | string;
}


export default function App() {
  const [newData, setNewData] = useState<data[]>(productList);
  const [newDataFilter, setNewDataFilter] = useState<data[]>(productList);
  const [newDataToReturn, setNewDataToReturn] = useState<any>([]);
  const [itensPerPage, setItensPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const pages = Math.ceil(newData.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentData = newData.slice(startIndex, endIndex);
  const [localData, setLocalData] = useState<any>([]);
  const [teste, setTeste] = useLocalStorage('cart', []);
  const [basket, setbasket] = useState(false);
  const [hide, setHide] = useState(false);

const uniqueValues = [...new Set(newDataFilter.map(e=>e.category))]

  useEffect(() => { setCurrentPage(0) }, [itensPerPage]);

  useEffect(() => {
    const nos = localStorage.getItem('cart')
    setLocalData(JSON.parse(nos!) || [])

  }, [teste, cleanCart]);

  function decPage() {
    if (currentPage != 0) {
      setCurrentPage(currentPage - 1)
    }
    return
  }

  function impPage() {

    if (currentPage != 3) {
      console.log(currentPage)
      setCurrentPage(currentPage + 1)
    }
    return
  }

  function sortArray(e: string) {
    if (e === 'price') {
      setCurrentPage(3)
      newData.sort(function (a, b): any {
        if (a.price < b.price) {
          setItensPerPage(6)
          return -1
        } else {
          return true;
        }

      })

    } else if (e === 'Alphabetically') {
      setCurrentPage(2)
      newData.sort(function (a, b): any {
        if (a.name < b.name) {
          setItensPerPage(6)
          return -1
        } else {
          return true;
        }
      })
      setNewData(newData)
      setbasket(!basket)
    }
  }

  function addToCart(e: number) {
    const checkItem = teste.some((item: any) => item.id === e)
    if (checkItem) {
      alert('You already have this iten in your cart')
      return;
    }
    const filteredData = newData.find(item => item.id === e);
    alert('Item added to your cart')
    setTeste([...teste, filteredData])
    setbasket(true)
  }

  function showCart() {
    setbasket(!basket)
  }

  function cleanCart() {
    localStorage.clear()
    setTeste([])
    setbasket(!basket)
  }

  function showOPtions() {
    setHide(true)
  }
  
  function hideOPtions() {
    setHide(false)
  }

  function filterData(category:string){

    const data = [...newDataToReturn] //pegando os itens do array 
    const dataFiltered = newData.filter(item=> item.category===category); //filtrando os itens pra retornar só os que tem caregoria igual q to clicando
    const conv = JSON.stringify(newDataToReturn)
    const checkData = conv.includes(category) //salvando o resultado de um includes num array
    if(checkData){ //Se o item já existir, retornar uma msg e cancelar o resto da funcao
      const newDataFilter = [...newDataToReturn]
      const newDataFilteredSome = newDataToReturn.some(item => item.category === category);
      console.log(newDataFilteredSome)
      const newDataFiltered = newDataToReturn.filter(item => item.category != category);
      // setNewDataToReturn([...newDataFilter, newDataFiltered])
      setNewDataToReturn([...newDataFiltered])
      console.log(['1',...newDataFilter, '2',...newDataFiltered])
      alert('O item já existe, then you should end the function here instaed of keep it further')
      return
    }
    setNewDataToReturn([...data, ...dataFiltered]);
 
  }



  return (
    <div className={styles.container}>
      <Header cartItens={showCart} badgeContent={teste.length} />
      <section className={styles.bodyContent}>
        <div className={styles.titleSection}>
          <div className={basket ? styles.cartHolder : styles.cartHolderHide}>
            {localData.length <= 0 ? <h4>Empty.</h4> : <h4 onClick={cleanCart}>Clean Cart</h4>}
            {localData === [] ? '' : localData.map((item: any) => {
              return (
                <>
                  <div className={styles.cartItems}>
                    <div className={styles.cartItensInfo}>
                      <span className={styles.cartItemName}>{item.name}</span>
                      <span>${item.price}</span>
                    </div>
                    <div className={styles.cartItemImage}>
                      <img src={item.image} />
                    </div>

                  </div>
                  <label className={styles.lineCart}></label>
                </>
              )
            })}
          </div>
        </div>
        {newData.map((e) => (
          <>
            {e.featured ? <div className={styles.titleSection}>
              <h1> {e.name}</h1>
              <button onClick={() => addToCart(e.id)}>ADD TO CART</button>
            </div> : ''}
            <img className={styles.imgFeatured} src={e.featured ? e.image : ''} />
            <div className={styles.featuredItem}>
              <div className={styles.featuredText}>
                {e.featured ? <h3>{e.name}</h3> : ''}
                <span className={styles.categoryItemFeatured}>{e.featured ? e.category : ''}</span>
                <span>{e.featured ? e.details : ''}</span>
              </div>
              {e.featured ? <div className={styles.samuraiBuySuggest}>
                <h3>People also buy</h3>
                <div className={styles.samuraiFrames}>
                  <Image src={frame1} width={100} />
                  <Image src={frame2} width={100} />
                  <Image src={frame3} width={100} />
                </div>
                <h3>Details</h3>
                <span>Size: 1020 x 1020 pixel</span> <br />
                <span>Size: 15 mb</span>
              </div> : ''}
            </div>
          </  >
        ))}

        <div className={styles.line}></div>
        <div className={styles.dataSection}>
          <div className={styles.selectData}>
            <span>Photograpy</span> / <span>Premiun Photos</span>
          </div>
          <div className={styles.sortData}>
            <CgArrowsExchangeV size={25} />
            <span>Sort By</span>
            <select onClick={(e: any) => sortArray(e.target.value)}>
              <option value="Alphabetically">Alphabetically</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
        <div className={styles.data}>

          <div className={styles.filter}>
            <h3>Category</h3>
            {uniqueValues.map((cat:any) => (
              <div><input type="checkbox" name={cat} onClick={()=>filterData(cat)}/><label htmlFor="20">{cat}</label></div>
            ))}
            
            <div className={styles.line}></div>
            <h3>Price range</h3>
            <div><input type="checkbox" id="20" name="20" /><label htmlFor="20">Lower than $20</label></div>
            <div><input type="checkbox" id="20100" name="20100" /><label htmlFor="20100">$20 - $100</label></div>
            <div><input type="checkbox" id="100200" name="100200" /><label htmlFor="100200">$100 - $200</label></div>
            <div><input type="checkbox" id="200plus" name="200plus" /><label htmlFor="200plus">More than $200</label></div>
          </div>

          <div className={styles.showData}>

            <div className={styles.content}>
              {currentData.map((e) => (
                <div onMouseOver={showOPtions}
                  className={styles.cardItem}
                  onMouseOut={hideOPtions}
                  id="cardItem"
                >
                  <img src={e.image} />
                  <span className={styles.itemCategory}>{e.category}</span>
                  <span className={styles.itemName}>{e.name}</span>
                  <span className={styles.itemPrice}>{e.price} {e.currency}</span>
                  <label>{e.bestseller ? ' ✦ Best Seller ✦ ' : '⠀'}</label>
                  <button style={{ display: 'none' }} onClick={() => addToCart(e.id)}>ADD TO CART</button>
                </div>
              ))}
            </div>
            <div className={styles.pagination}>
              <IoIosArrowBack size={18} onClick={decPage} className={currentPage != 0 ? styles.arrowActive : styles.inactivePagination} />
              {Array.from(Array(pages), (item, index) => {
                return <div className={styles.currentPage}>
                  <button style={index === currentPage ? { color: '#000', fontSize: '20px' } : { color: '#B4B4B4' }} value={index} onClick={(e: any) => setCurrentPage(Number(e.target.value))}>{index + 1}</button>
                </div>
              })}
              <IoIosArrowForward size={18} onClick={impPage} className={currentPage != 3 ? styles.arrowActive : styles.inactivePagination} />
            </div>

                {newDataToReturn.map((e:any)=><div>{e.name}</div>)}
          </div>

        </div>

      </section>

    </div>
  );
}
