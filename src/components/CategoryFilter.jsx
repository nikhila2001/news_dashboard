import { Button } from "react-bootstrap";

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  // List of categories
  const categories = [
    "Sports",
    "World",
    "Technology",
    "Health",
    "Politics",
    "Global",
    "Entertainment",
  ];
  // Convert category names to uppercase
  const upperCaseCategories = categories.map((category) =>
    category.toUpperCase()
  );

  return (
    <>
      {/* Render category filter buttons */}

      {
        <div className="container d-flex justify-content-center flex-wrap mt-3">
          {upperCaseCategories.map((category) => (
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
