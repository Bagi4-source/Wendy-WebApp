import { Button, Slider, Switch, Textarea } from '@nextui-org/react';
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
    <Textarea
      minRows={6}
      fullWidth={true}
      label="Custom prompt"
      placeholder="Enter your prompt"
    />
    <Slider
      label="Select the opening hours"
      step={1}
      maxValue={MAX_TIME}
      minValue={0}
      value={value}
      getValue={(v) => {
        const [a, b] = v as Array<number>;
        return `${numberToTime(a)} ${numberToTime(b)}`;
      }}
      onChange={(value) => {
        if (value instanceof Array)
          setValue(value);
      }}
    />
    <Switch>Enable notifications</Switch>
    <Button
      color={'primary'}
      onClick={() => {
        console.log(value);
      }}>Submit</Button>
  </section>;
};