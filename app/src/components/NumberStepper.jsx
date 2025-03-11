import { Button, InputGroup, FormControl } from "react-bootstrap";

const NumberStepper = ({ value, onChange }) => {
  const handleDecrease = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <InputGroup className="number-stepper">
      <Button variant="outline-secondary" onClick={handleDecrease}>
        −
      </Button>
      <FormControl
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min="0"
        className="text-center"
      />
      <Button variant="outline-secondary" onClick={handleIncrease}>
        +
      </Button>
    </InputGroup>
  );
};

export default NumberStepper;
