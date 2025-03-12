import { useContext } from "react";
import { Button, Card, Tab, Nav } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import Logo from "../components/Logo";
import { snacksData } from "../components/Snacks";
import { useNavigate } from "react-router-dom";
import SnackItemCard from "../components/SnackItemCard";
import { UserSelectionContext } from "../context/UserSelectionContext";

const Snack = () => {
  const { snacks, setSnacks } = useContext(UserSelectionContext);
  const items = snacksData;
  const navigate = useNavigate();

  const handleAddItem = (category, item, size) => {
    setSnacks((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: {
          ...prev[category]?.[item],
          [size]: (prev[category]?.[item]?.[size] || 0) + 1,
        },
      },
    }));
  };

  const handleRemoveItem = (category, item, size) => {
    setSnacks((prev) => {
      const quantity = prev[category]?.[item]?.[size] || 0;
      if (quantity === 0) return prev;

      const updatedCategory = {
        ...prev[category],
        [item]: {
          ...prev[category]?.[item],
          [size]: Math.max(0, quantity - 1),
        },
      };

      if (updatedCategory[item][size] === 0) {
        delete updatedCategory[item][size];
      }

      if (Object.keys(updatedCategory[item]).length === 0) {
        delete updatedCategory[item];
      }

      return {
        ...prev,
        [category]: updatedCategory,
      };
    });
  };

  const calculateTotal = () => {
    let total = 0;
    for (const category in snacks) {
      for (const item in snacks[category]) {
        for (const size in snacks[category][item]) {
          const quantity = snacks[category][item][size];
          const price = items[category].find((i) => i.name === item).price[
            size
          ];
          total += price * quantity;
        }
      }
    }
    return total;
  };

  const isOrderEmpty = calculateTotal() === 0;

  const handlePlaceOrder = () => {
    if (!isOrderEmpty) {
      navigate("/select-payment", {
        state: { order: snacks, total: calculateTotal() },
      });
    }
  };

  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      <Button
        variant="primary"
        className="position-fixed top-0 start-0 m-3 d-flex align-items-center btn-lg"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft size={60} />
      </Button>
      <Logo className="logo" />
      <div className="d-flex justify-content-center align-items-start vh-100 p-4">
        <div
          className="content"
          style={{ flex: 2, marginRight: "20px", maxWidth: "40%" }}
        >
          <Tab.Container defaultActiveKey="snacks">
            <Nav variant="tabs">
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
            <Tab.Content
              className="d-flex"
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {["snacks", "drinks", "combos"].map((category) => (
                <Tab.Pane
                  key={category}
                  eventKey={category}
                  style={{ flex: 1 }}
                >
                  <Card
                    style={{ border: "1px solid #fff", borderRadius: "10px" }}
                  >
                    <Card.Body
                      style={{ backgroundColor: "#000", borderRadius: "10px" }}
                    >
                      {items[category].map((item) => (
                        <SnackItemCard
                          key={item.name}
                          category={category}
                          item={item}
                          order={snacks}
                          handleAddItem={handleAddItem}
                          handleRemoveItem={handleRemoveItem}
                        />
                      ))}
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Tab.Container>
        </div>

        {/* Order Summary */}
        <div
          className="order-summary"
          style={{
            flex: 1,
            margin: "40px",
            padding: "20px",
            maxWidth: "30%",
            borderRadius: "10px",
            border: "1px solid white",
          }}
        >
          <h4>Order Summary</h4>
          {isOrderEmpty ? (
            <p style={{ color: "#fff" }}>
              Your cart is empty. Please add items to your order.
            </p>
          ) : (
            Object.keys(snacks).map((category) => (
              <div key={category}>
                {Object.keys(snacks[category]).map((item) => (
                  <div key={item}>
                    {Object.keys(snacks[category][item]).map((size) => {
                      const quantity = snacks[category][item][size];
                      return (
                        <div
                          key={size}
                          className="d-flex justify-content-between"
                          style={{ marginBottom: "10px" }}
                        >
                          <span style={{ color: "#fff" }}>
                            {item} ({size}): {quantity}
                          </span>
                          <span style={{ color: "#fff" }}>
                            $
                            {(
                              items[category].find((i) => i.name === item)
                                .price[size] * quantity
                            ).toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ))
          )}
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
