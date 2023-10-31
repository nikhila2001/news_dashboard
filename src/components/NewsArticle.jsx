import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Badge from "react-bootstrap/Badge";
import { InputGroup, FormControl, Button } from "react-bootstrap";

function NewsArticle({ selectedCategory }) {
  // Define and initialize state variables
  const [newsData, setNewsData] = useState([]); // Store news data from the API
  const [searchQuery, setSearchQuery] = useState(""); // Store the user's search query
  const News_article_api = "https://linesnews.onrender.com/api/news-datas"; // API endpoint

  // Fetch news data from an external API when the component mounts
  useEffect(() => {
    axios
      .get(News_article_api)
      .then((response) => {
        setNewsData(response.data.data); // Update newsData with the fetched data
      })
      .catch((error) => {
        console.log("There is a problem with axios request");
      });
  }, []);

  // Filter news articles based on selected category and search query
  const filteredNews = newsData.filter((article) => {
    console.log(selectedCategory);
    return (
      (selectedCategory === null ||
        article.attributes.category === selectedCategory) &&
      article.attributes.headline
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  // rendering the data from an api
  return (
    <>
      <Container>
        {/* Page title */}
        <h1 className="text-center mt-1 fw-bold">
          The <span className="text-danger">N</span>ews App{" "}
        </h1>
        {/* Search input and button */}
        <div className="d-flex justify-content-center mb-5">
          <InputGroup className="input-search">
            <FormControl
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="ms-1 bg-danger text-light">
              <i className="fa fa-search "></i> Search
            </Button>
          </InputGroup>
        </div>

        <div className="news-list">
          {filteredNews.length > 0 ? (
            // Render news articles
            filteredNews.map((article) => (
              <Row
                key={article.id}
                className="border border-secondary shadow mb-3"
              >
                <Col className="p-2" xs={12} md={4}>
                  <Image
                    src={article.attributes.newsIcon}
                    alt="News Icon"
                    fluid
                    rounded
                  />
                </Col>

                <Col className="p-2" xs={12} md={8}>
                  {/* Article headline and category */}
                  <h2>{article.attributes.headline}</h2>
                  <p>{`Category - ${article.attributes.category}`}</p>

                  <div>
                    {/* Article hashtags */}
                    {article.attributes.hashtags
                      .split(",")
                      .map((hashtag, index) => (
                        <h5
                          key={index}
                          className="badge bg-secondary p-2 me-1 border border-danger text-dark"
                        >
                          # {hashtag.trim()}{" "}
                          {/* Trim to remove leading/trailing spaces */}
                        </h5>
                      ))}
                  </div>
                  <p>
                    <b>{`Source - ${article.attributes.newsSource}`}</b>
                  </p>
                </Col>
              </Row>
            ))
          ) : (
            // Display a loading message if there are no articles
            <p className="text-center fs-3">Loading news data...</p>
          )}
        </div>
      </Container>
    </>
  );
}
export default NewsArticle;
