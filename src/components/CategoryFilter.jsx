import { Button } from "react-bootstrap";

function CategoryFilter({ selectedCategory, setSelectedCategory, newsData}) {
  // List of categories
  // extract souce names from api
  const categories = newsData.map((article) => article.source.name);

  // Remove duplicates using Set
  const uniqueSourceNames = [...new Set(categories)]

 

  return (
    <>
      {/* Render category filter buttons */}

      {
        <div className="container d-flex justify-content-center flex-wrap mt-3">
          {uniqueSourceNames.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)} // Set the selected category when the button is clicked
              className="m-2 fw-bold border border-danger btn-secondary text-dark"
            >
              {category}
            </Button>
          ))}
        </div>
      }
    </>
  );
}
export default CategoryFilter;
