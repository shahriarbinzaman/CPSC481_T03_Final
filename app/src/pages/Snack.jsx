import { useState } from "react";
import { Button, Card, Tab, Nav } from "react-bootstrap";
import { FaArrowLeft } from 'react-icons/fa';
import Logo from "../components/Logo"; 
import { snacksData } from "../components/Snacks"; 
import { useNavigate } from "react-router-dom";
import SnackItemCard from "../components/SnackItemCard";

const Snack = () => {
  const [order, setOrder] = useState({
    snacks: {},
    drinks: {},
    combos: {},
  });

  const items = snacksData;

  const handleAddItem = (category, item, size) => {
    setOrder((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: {
          ...prev[category][item],
          [size]: (prev[category][item]?.[size] || 0) + 1,
        },
      },
    }));
  };

  const handleRemoveItem = (category, item, size) => {
    setOrder((prev) => {
      const quantity = prev[category][item]?.[size] || 0;
      if (quantity === 0) return prev;

      return {
        ...prev,
        [category]: {
          ...prev[category],
          [item]: {
            ...prev[category][item],
            [size]: Math.max(0, quantity - 1),
          },
        },
      };
    });
  };

  const calculateTotal = () => {
    let total = 0;
    for (const category in order) {
      for (const item in order[category]) {
        for (const size in order[category][item]) {
          const quantity = order[category][item][size];
          const price = items[category].find((i) => i.name === item).price[size];
          total += price * quantity;
        }
      }
    }
    return total;
  };

  const isOrderEmpty = calculateTotal() === 0;
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (!isOrderEmpty) {
      navigate('/payment', { state: { order, total: calculateTotal() } });
    }
  };

  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      {/* Back Button */}
      <Button
        variant="primary"
        className="position-fixed top-0 start-0 m-3 d-flex align-items-center btn-lg"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={60} />
      </Button>
      <Logo className="logo" />
      <div className="d-flex justify-content-center align-items-start vh-100 p-4">
        {/* Snack Options Section */}
        <div className="content" style={{ flex: 2, marginRight: "20px", maxWidth: "40%"}}>
          <Tab.Container defaultActiveKey="snacks">
            <Nav variant="tabs" style={{ border: "none" }}>
              <Nav.Item>
                <Nav.Link eventKey="snacks">Snacks</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="drinks">Drinks</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="combos">Combos</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="d-flex" style={{ flexDirection: "row", justifyContent: "space-between" }}>
              {/* Snacks Tab */}
              <Tab.Pane eventKey="snacks" style={{ flex: 1 }}>
                <Card style={{ border:"1px solid #fff", borderRadius: "10px" }}>
                  <Card.Body style={{ backgroundColor: "#000", borderRadius: "10px" }}>
                    {items.snacks.map((snack) => (
                      <SnackItemCard
                        key={snack.name}
                        category="snacks"
                        item={snack}
                        order={order}
                        handleAddItem={handleAddItem}
                        handleRemoveItem={handleRemoveItem}
                      />
                    ))}
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Drinks Tab */}
              <Tab.Pane eventKey="drinks" style={{ flex: 1 }}>
                <Card style={{ border:"1px solid #fff", borderRadius: "10px" }}>
                  <Card.Body style={{ backgroundColor: "#000", borderRadius: "10px" }}>
                    {items.drinks.map((drink) => (
                      <SnackItemCard
                        key={drink.name}
                        category="drinks"
                        item={drink}
                        order={order}
                        handleAddItem={handleAddItem}
                        handleRemoveItem={handleRemoveItem}
                      />
                    ))}
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Combos Tab */}
              <Tab.Pane eventKey="combos" style={{ flex: 1 }}>
                <Card style={{ border:"1px solid #fff", borderRadius: "10px" }}>
                  <Card.Body style={{ backgroundColor: "#000", borderRadius: "10px" }}>
                    {items.combos.map((combo) => (
                      <SnackItemCard
                        key={combo.name}
                        category="combos"
                        item={combo}
                        order={order}
                        handleAddItem={handleAddItem}
                        handleRemoveItem={handleRemoveItem}
                      />
                    ))}
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>

        {/* Order Summary Section */}
        <div className="order-summary" style={{ flex: 1, margin: "40px", padding: "20px", maxWidth:"30%", borderRadius: "10px", border: "1px solid white" }}>
          <h4>Order Summary</h4>
          {isOrderEmpty ? (
            <p style={{ color: "#fff" }}>Your cart is empty. Please add items to your order.</p>
          ) : (
            Object.keys(order).map((category) => (
              <div key={category} className="category">
                {Object.keys(order[category]).map((item) => (
                  <div key={item}>
                    {Object.keys(order[category][item]).map((size) => {
                      const quantity = order[category][item][size];
                      return (
                        <div key={size} className="d-flex justify-content-between" style={{ marginBottom: "10px" }}>
                          <span style={{ color: "#fff" }}>
                            {item} ({size}): {quantity}
                          </span>
                          <span style={{ color: "#fff" }}>
                            ${(items[category].find((i) => i.name === item).price[size] * quantity).toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))
          )}
          <div className="d-flex justify-content-between" style={{ marginTop: "20px", borderTop: "1px solid #fff", paddingTop: "10px" }}>
            <h5 style={{ color: "#fff" }}>Total</h5>
            <h5 style={{ color: "#fff" }}>${calculateTotal().toFixed(2)}</h5>
          </div>
          <Button
            variant="primary"
            style={{ marginTop: "20px" }}
            onClick={handlePlaceOrder}
            disabled={isOrderEmpty}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Snack;
