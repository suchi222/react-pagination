import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const ProductCard = ({ image, title }) => {
  return (
    <div className="border border-gray-300 p-2.5 text-center ">
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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-4;">
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
        containerClassName="flex list-none gap-2 justify-center mt-5"
        activeClassName="bg-blue-600 text-white"
        pageClassName="cursor-pointer px-2.5 py-1.5 border border-gray-300"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName="page-item"
        forcePage={currentPage}
      />
    </div>
  );
};

export default App;
