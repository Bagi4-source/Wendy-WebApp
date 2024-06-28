import { Button, Input, Slider, Switch, Textarea } from '@nextui-org/react';
import { useState } from 'react';

const formatNumber = (value: number) => value.toLocaleString('ru', { minimumIntegerDigits: 2 });

const numberToTime = (value: number) => {
  const minutes = value % 60;
  const hours = Math.floor(value / 60);
  return `${formatNumber(hours)}:${formatNumber(minutes)}`;
};

const MAX_TIME = 1439;

export const SettingsPage = () => {
  const [value, setValue] = useState([0, MAX_TIME]);
  return <section className={'flex flex-col gap-4 justify-start'}>
    <p className={'text-xl'}>Settings</p>
    <Slider
      size={"lg"}
      label="Select the opening hours"
      step={1}
      maxValue={MAX_TIME}
      minValue={0}
      value={value}
      getValue={(v) => {
        const [a, b] = v;
        return `${numberToTime(a)} ${numberToTime(b)}`;
      }}
      onChange={setValue}
      className="max-w-md"
    />
    <Button
      color={'primary'}
      size={'lg'}
      onClick={() => {
        console.log(value);
      }}>Submit</Button>
  </section>;
};