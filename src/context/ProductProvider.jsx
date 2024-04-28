import axios from "axios";
import React, { createContext, useEffect, useState, useContext } from "react";


//1 contexti oluştur
const ProductContext = createContext();

// react hooklarını javascript fonksyionları içerisinde kullanamadığımız için custom hooklara ihtiyaç duyarız.
// custom hooklar use keywordü ile başlamak zorunda
// custom hooklar jsx return etmez.
// zorunlu değil tükteim yaparken sadece kolaylık sağlıyor

export const useProductContext = () => {
  return useContext(ProductContext);
};

// contexte ihtiyaç duymamızın sebebi detail sayfasına gittikten sonra geri geldiğimizde hem kullanıcının yazdığı query hem de api den gelen sonuçların kaybolmamasıni istememiz.
// Ayrıca products sayfasında yapsaydık veri çekme işlemini her sayfa render olduğunda arama olmadığı halde apiye istek atacaktı.

//2 sarmalayıcı componenti oluştur. Saklanan veriler,fonksiyonlar burada tanımlanır ve buradan paylaşılır
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  console.log(products);

  const getDate = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/search?q=${search}`
      );
      console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDate();
  }, [search]);

  const values = { products, loading, setSearch, search };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;
