
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();

    console.log(data);

    if (data && data.products) {
      setProducts(data.products);
    }
  }

  useEffect(() => {

    fetchProducts();


  }, [])

  const handlePage = (page) =>{
        if(page > 0 && page <= products.length/6)
        {
          setPage(page);
        }
         
  }
  return (
    <div className="App">
      <h3>Products</h3>


      {products.length > 0 && (
        <div className="products">
          {
            products.slice(page*6-6, page*6).map((prod) => {
              return (

                <div className='products__item' key={prod.id}>
                  <img className='products__item__image' src={prod.thumbnail} alt={prod.title} />
                  <span>{prod.title}</span>
                </div>

              )
            })

          }
        </div>)
      }

      {
        products.length > 0 && (
          <div className='pagination'>
             <span className="page" onClick={()=>handlePage(page-1)}>◀️</span>
             { [...Array(products.length/6)].map((_,index)=>{
              return <span className={page === index+1? "page selectedpage": "page"} key={index} onClick={()=>handlePage(index+1)}>{index+1}</span>
             })
              
              

             }
             <span className="page" onClick={()=>handlePage(page+1)}>▶️</span>
          </div>

        )
      }

    </div>
  );
}

export default App;
