import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const ProductCard = ({ image, title }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} width="150" />
      <p>{title}</p>
    </div>
  );
};

const PAGE_SIZE = 10;

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const json = await response.json();
    setProducts(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProducts = products.length;
  const pageCount = Math.ceil(totalProducts / PAGE_SIZE);

  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const currentProducts = products.slice(start, end);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);

  };

  return (
    <div>
      <h2>Products</h2>
      <div className="products">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.thumbnail}
            title={product.title}
          />
        ))}
      </div>


      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        previousLabel="< Prev"
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        forcePage={currentPage}
      />
    </div>
  );
};

export default App;
