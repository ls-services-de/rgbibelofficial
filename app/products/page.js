'use client';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { getProducts } from '@/sanity/product-utils';
import { getCategories } from '@/sanity/category-utils';

function Products() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState(''); // New state for max price
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(50);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        const cats = await getCategories();
        console.log("Fetched products:", products);
        setData(products);
        setOriginalData(products);
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const applyFilters = () => {
    const minPriceValue = parseFloat(minPrice);
    const maxPriceValue = parseFloat(maxPrice);
    const isMinPriceValid = !isNaN(minPriceValue);
    const isMaxPriceValid = !isNaN(maxPriceValue);

    const filteredProducts = originalData.filter(product => {
      const price = parseFloat(product.price);
      const isPriceValid = (!isMinPriceValid || price >= minPriceValue) && (!isMaxPriceValid || price <= maxPriceValue);
      const isCategoryValid = !selectedCategory || product.category?._ref === selectedCategory;

      const matchesSearchQuery =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return isPriceValid && isCategoryValid && matchesSearchQuery;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortBy === 'lowest') {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortBy === 'highest') {
        return parseFloat(b.price) - parseFloat(a.price);
      }
      return 0;
    });

    setData(sortedProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [minPrice, maxPrice, sortBy, searchQuery, selectedCategory, productsPerPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleFilterChange = (e, setter) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setMinPrice('');
    setMaxPrice(''); // Reset maxPrice
    setSortBy('latest');
    setSearchQuery('');
    setSelectedCategory('');
    setProductsPerPage(5);
    setCurrentPage(1);
    setData(originalData);
  };

  return (
    <div className='hide-scrollbar overflow-y-auto background-container-shop'>
      <Header />

      <div className="flex flex-col md:flex-row p-10 mt-[70px] hide-scrollbar">
        <div className="block lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-primary text-white px-4 py-2 rounded-md"
          >
            {showFilters ? 'Filter schließen' : 'Filter öffnen'}
          </button>
        </div>

        <div className={`mr-8 ${showFilters ? 'block' : 'hidden'} lg:block bg-gray-800 xl:h-[65vh] lg:h-[90vh] bg-opacity-50 p-4 rounded-md shadow-md`}>
          <h1 className="text-2xl font-semibold text-primary mb-4">Filter</h1>
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-white">Suche</h2>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Suchen..."
                  value={searchQuery}
                  onChange={(e) => handleFilterChange(e, setSearchQuery)}
                  className="w-full px-2 py-1 bg-card text-white border border-gray-300 rounded-md focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-medium text-white">Min. Preis</h2>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min. Preis"
                  value={minPrice}
                  onChange={(e) => handleFilterChange(e, setMinPrice)}
                  className="w-full px-2 py-1 bg-card text-white border border-gray-300 rounded-md focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-medium text-white">Max. Preis</h2>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Max. Preis"
                  value={maxPrice}
                  onChange={(e) => handleFilterChange(e, setMaxPrice)}
                  className="w-full px-2 py-1 bg-card text-white border border-gray-300 rounded-md focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-medium text-white">Kategorie</h2>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleFilterChange(e, setSelectedCategory)}
                  className="block appearance-none w-full bg-card text-white border border-gray-300 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-primary focus:ring-primary"
                >
                  <option value="">Alle Kategorien</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M8.292 11.707a1 1 0 0 1 1.414 0L12 14.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative mt-4">
              <select
                value={sortBy}
                onChange={(e) => handleFilterChange(e, setSortBy)}
                className="block appearance-none w-full bg-card text-white border border-gray-300 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-primary focus:ring-primary"
              >
                <option value="lowest">Niedrigster Preis zuerst</option>
                <option value="highest">Höchster Preis zuerst</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.292 11.707a1 1 0 0 1 1.414 0L12 14.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" />
                </svg>
              </div>
            </div>

            <div className="relative mt-4">
              <select
                value={productsPerPage}
                onChange={(e) => handleFilterChange(e, setProductsPerPage)}
                className="block appearance-none w-full bg-card text-white border border-gray-300 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:border-primary focus:ring-primary"
              >
                <option value={5}>5 Produkte pro Seite</option>
                <option value={10}>10 Produkte pro Seite</option>
                <option value={15}>15 Produkte pro Seite</option>
                <option value={20}>20 Produkte pro Seite</option>
                <option value={25}>25 Produkte pro Seite</option>
                <option value={30}>30 Produkte pro Seite</option>
                <option value={35}>35 Produkte pro Seite</option>
                <option value={40}>40 Produkte pro Seite</option>
                <option value={45}>45 Produkte pro Seite</option>
                <option value={50}>50 Produkte pro Seite</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-primary">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M8.292 11.707a1 1 0 0 1 1.414 0L12 14.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className='mx-auto md:mt-0 mt-[50px] grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-16 sm:grid-cols-2'>
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Card key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-lg text-gray-500">Keine Produkte gefunden. Laden...</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        {data.length > productsPerPage && (
          <ul className="flex list-none justify-center space-x-2">
            {Array.from({ length: Math.ceil(data.length / productsPerPage) }, (_, index) => (
              <li key={index} className="cursor-pointer">
                <a onClick={() => paginate(index + 1)} className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md">
                  {index + 1}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Products;
