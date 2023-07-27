import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./categorizeElement.css";

const CategorizeElement = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryAdd = () => {
    setCategories([...categories, ""]);
  };

  const handleCategoryDelete = (idx) => {
    const ctg = [...categories];
    ctg.splice(idx, 1);
    setCategories([...ctg]);
  };

  const handleChangeCategory = (e) => {
    const dataIdValue = e.target.getAttribute("data-id");
    const ctg = categories;
    categories[parseInt(dataIdValue)] = e.target.value;
    setCategories([...ctg]);
  };

  const handleItemAdd = () => {
    setItems([...items, { name: "", category: "" }]);
  };

  const handleItemDelete = (idx) => {
    const newItems = [...items];
    newItems.splice(idx, 1);
    setItems([...newItems]);
  };

  const handleItemCategoryChange = (idx, e) => {
    const newItems = [...items];
    newItems[idx].category = e.target.value;
    setItems([...newItems]);
  };
  const getCategories = () => {
    return categories.filter((item) => item.length > 0);
  };

  return (
    <Container className="categorizeElement">
      <Row>
        <Col className="categorizeElement__description">
          <input
            name="description"
            type="text"
            placeholder="Description Text"
            onChange={handleDescriptionChange}
            value={description}
          />

          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "+" : "-"}
          </Button>
        </Col>
      </Row>
      {!isCollapsed && (
        <>
          <Row>
            <Col
              className="categorizeElement__categories"
              style={{ display: "flex", flexDirection: "column" }}
              xs={4}
            >
              <span>
                Categories{" "}
                <Button size="sm" variant="success" onClick={handleCategoryAdd}>
                  +
                </Button>
              </span>
              {categories.map((item, idx) => (
                <div className="categorizeElement__category">
                  <input
                    key={idx}
                    data-id={idx}
                    value={item}
                    onChange={handleChangeCategory}
                    type="text"
                    placeholder={`Category ${idx + 1}`}
                  />
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleCategoryDelete(idx)}
                  >
                    x
                  </Button>
                </div>
              ))}
            </Col>
          </Row>
          <Row>
            <Col className="categorizeElement__items">
              <span>
                Items{" "}
                <Button size="sm" variant="success" onClick={handleItemAdd}>
                  +
                </Button>
              </span>
              {items.map((item, idx) => (
                <div className="categorizeElement__item">
                  <input
                    key={idx}
                    data-id={idx}
                    type="text"
                    placeholder={`Item ${idx + 1}`}
                  />
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleItemDelete(idx)}
                  >
                    x
                  </Button>
                  <select
                    value={item.category}
                    onChange={(e) => handleItemCategoryChange(idx, e)}
                  >
                    <option>Choose Category</option>
                    {getCategories().map((item, idx) => (
                      <option key={idx} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default CategorizeElement;
