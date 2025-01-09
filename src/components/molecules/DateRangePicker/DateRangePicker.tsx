import {
  DateRangeContainer,
  DateInputGroup,
  Label,
} from "./DateRangePicker.styled";
import { DateRangePickerProps } from "./DateRangePicker.types";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";

const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClear,
}: DateRangePickerProps) => {
  return (
    <DateRangeContainer>
      <DateInputGroup>
        <Label htmlFor="start-date">Start Date</Label>
        <Input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
      </DateInputGroup>
      <DateInputGroup>
        <Label htmlFor="end-date">End Date</Label>
        <Input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
      </DateInputGroup>
      <Button onClick={onClear} disabled={!startDate && !endDate}>
        Clear
      </Button>
    </DateRangeContainer>
  );
};

export default DateRangePicker;
