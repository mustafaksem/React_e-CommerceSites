import React, { useState, useEffect } from 'react';
import './App.css';

import Category from './components/Category';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/categories")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setCategories(data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleCategoryClick=id =>{
    fetch("http://localhost:3001/products?catId=" + id)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setProducts(data);
    })
  }

  const renderCategories =()=>{
     return categories.map(c=>
       <Category key={c.id} id={c.id} title={c.title} onCategoryClick={()=> handleCategoryClick(c.id)}/>
     );
  }

  const renderProducts=()=>{
    return products.map(p=>
      <div>{p.title}</div>
    )
  }

  return (
    <React.Fragment>
    <header>My Store </header>
    <section>
      <nav>
        {
         categories && renderCategories()
        }
      </nav>

      <article>
        <h1>Products</h1>
        { products && renderProducts()}
      </article>
    </section>

    <footer>
      footer
    </footer>
    </React.Fragment>

  );
}

export default App;
