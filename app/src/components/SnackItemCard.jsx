import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

const SnackItemCard = ({ category, item, order, handleAddItem, handleRemoveItem }) => {
  return (
    <div key={item.name} className="d-flex align-items-center" style={{ color: "#fff", padding: "10px", marginBottom: "10px" }}>
      <img src={item.image} alt={item.name} style={{ width: "100px", height: "100px", marginRight: "20px" }} />
      <div>
        <Card.Title>{item.name}</Card.Title>
        {item.sizes.map((size) => {
          const quantity = order[category][item.name]?.[size] || 0;
          return (
            <ListGroup key={size}>
              <ListGroup.Item style={{ backgroundColor: "#000", color: "#fff", border: "none" }}>
                {size} - ${item.price[size]}{" "}
                <Button
                  variant="light"
                  onClick={() => handleRemoveItem(category, item.name, size)}
                  style={{
                    color: "#fff",
                    backgroundColor: "transparent",
                    border: "none",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <IoRemoveCircleOutline />
                </Button>{" "}
                <span style={{ margin: "0 10px" }}>{quantity}</span>
                <Button
                  variant="light"
                  onClick={() => handleAddItem(category, item.name, size)}
                  style={{
                    color: "#fff",
                    backgroundColor: "transparent",
                    border: "none",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <IoAddCircleOutline />
                </Button>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </div>
    </div>
  );
};

export default SnackItemCard;
