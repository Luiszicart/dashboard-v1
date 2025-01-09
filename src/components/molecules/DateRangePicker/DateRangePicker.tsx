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
  onError,
}: DateRangePickerProps) => {
  const today = new Date().toISOString().split("T")[0];

  const validateDateRange = (newStartDate: string, newEndDate: string) => {
    if (newStartDate && !newEndDate) {
      onError("Please select an end date");
      return;
    }

    if (newStartDate && newEndDate) {
      const start = new Date(newStartDate);
      const end = new Date(newEndDate);

      if (end < start) {
        onError("End date cannot be earlier than start date");
        return;
      }
    }

    onError(null);
  };

  const handleStartDateChange = (date: string) => {
    onStartDateChange(date);
    validateDateRange(date, endDate);
  };

  const handleEndDateChange = (date: string) => {
    onEndDateChange(date);
    validateDateRange(startDate, date);
  };

  return (
    <DateRangeContainer>
      <DateInputGroup>
        <Label htmlFor="start-date">Start Date</Label>
        <Input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
          max={today}
        />
      </DateInputGroup>
      <DateInputGroup>
        <Label htmlFor="end-date">End Date</Label>
        <Input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => handleEndDateChange(e.target.value)}
          max={today}
          min={startDate}
        />
      </DateInputGroup>
      <Button onClick={onClear} disabled={!startDate && !endDate}>
        Clear
      </Button>
    </DateRangeContainer>
  );
};

export default DateRangePicker;
