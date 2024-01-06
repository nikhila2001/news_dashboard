import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { InputGroup, FormControl, Button } from "react-bootstrap";

function NewsArticle({ selectedCategory, newsData, setNewsData}) {
  // Define and initialize state variables
  // const [newsData, setNewsData] = useState([]); // Store news data from the API
  const [searchQuery, setSearchQuery] = useState(""); // Store the user's search query
  const News_article_api = "https://newsapi.org/v2/top-headlines?country=in&apiKey=6963b43a16de41029c6610f27e9cbabc"; // API endpoint

  // Fetch news data from an external API when the component mounts
  useEffect(() => {
    axios
      .get(News_article_api)
      .then((response) => {
        setNewsData(response.data.articles); // Update newsData with the fetched data
      })
      .catch((error) => {
        console.log("There is a problem with axios request");
      });
  }, [News_article_api]);

  // Filter news articles based on selected category and search query
  const filteredNews = newsData.filter((article) => {
    console.log(selectedCategory);
    return (
      (selectedCategory === null ||
        article.source.name === selectedCategory) &&
      article.title
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
                key={article.source.id}
                className="border border-secondary shadow mb-3"
              >
                <Col className="p-2" xs={12} md={4}>
                  <Image
                    className="h-100"
                    src={article.urlToImage}
                    alt="News Icon"
                    fluid
                    rounded
                  />
                </Col>

                <Col className="p-2" xs={12} md={8}>
                  {/* Article headline and category */}
                  <h2>{article.title}</h2>
                  <p>{`Source - ${article.source.name}`}</p>

                  <div>
                    {/* Article hashtags */}
                   {article.description && (
                    <p className="text-muted">{article.description}</p>
                   )}
                  </div>
                  <p>
                    <b>{`Published At - ${article.publishedAt}`}</b>
                  </p>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
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
