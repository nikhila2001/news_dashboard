import './App.css';
import NewsArticle from './components/NewsArticle';
import CategoryFilter from './components/CategoryFilter';
import { useState } from 'react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <div className="App">
      <>
      <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
    <NewsArticle selectedCategory={selectedCategory} /> 
      </>
  
    </div>
  );
}

export default App;
