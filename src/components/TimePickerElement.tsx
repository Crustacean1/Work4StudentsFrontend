import { TimePicker } from "@mui/x-date-pickers";
import { TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

const TimePickerElement = ({ id, name, begin, end, labelSX, containerId, onBeginChange, onEndChange }: {
  id: number;
  name: string;
  begin: Dayjs | null;
  end: Dayjs | null;
  labelSX?: any;
  containerId?: string;
  onBeginChange: (newValue: Dayjs | null, id: number) => void;
  onEndChange: (newValue: Dayjs | null, id: number) => void;
}) => {
  const timeElement = (params: any) => <TextField sx={labelSX || { width: '48%', marginTop: '5px' }} {...params} />

  return (
    <div id={containerId || "dateContainer"} key={id}>
      <Typography>{name}</Typography>
      <TimePicker
        label={'Godzina rozpoczęcia pracy'}
        ampm={false}
        minutesStep={0}
        minTime={dayjs().hour(0).minute(0).second(0)}
        maxTime={end}
        value={begin}
        onChange={(newValue) => onBeginChange(newValue, id)}
        renderInput={timeElement}
      />
      <TimePicker
        label={'Godzina zakończenia pracy'}
        ampm={false}
        minutesStep={0}
        minTime={begin}
        maxTime={dayjs().hour(23).minute(59).second(59)}
        value={end}
        onChange={(newValue) => onEndChange(newValue, id)}
        renderInput={timeElement}
      />
    </div>
  )
};

export default TimePickerElement;