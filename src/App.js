import './App.css';
import NewsArticle from './components/NewsArticle';
import CategoryFilter from './components/CategoryFilter';
import { useState } from 'react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newsData, setNewsData] = useState([]);
  return (
    <div className="App">
      <>
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} newsData={newsData}/>
    <NewsArticle selectedCategory={selectedCategory} setNewsData={setNewsData} newsData={newsData}/> 
      </>
  
    </div>
  );
}

export default App;
