import { Button, Slider } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { postEvent, useInitData, useLaunchParams } from '@tma.js/sdk-react';

const formatNumber = (value: number) => value.toLocaleString('ru', { minimumIntegerDigits: 2 });

const numberToTime = (value: number) => {
  const minutes = value % 60;
  const hours = Math.floor(value / 60);
  return `${formatNumber(hours)}:${formatNumber(minutes)}`;
};

const MAX_TIME = 1439;


export const SettingsPage = () => {
  const initDataRaw = useLaunchParams().initDataRaw;
  const initData = useInitData(true);

  const initDataRows = useMemo(() => {
    if (!initData || !initDataRaw) {
      return;
    }
    const {
      hash,
      queryId,
      chatType,
      chatInstance,
      authDate,
      startParam,
      canSendAfter,
      canSendAfterDate,
    } = initData;
    return [
      { title: 'raw', value: initDataRaw },
      { title: 'auth_date', value: authDate.toLocaleString() },
      { title: 'auth_date (raw)', value: authDate.getTime() / 1000 },
      { title: 'hash', value: hash },
      { title: 'can_send_after', value: canSendAfterDate?.toISOString() },
      { title: 'can_send_after (raw)', value: canSendAfter },
      { title: 'query_id', value: queryId },
      { title: 'start_param', value: startParam },
      { title: 'chat_type', value: chatType },
      { title: 'chat_instance', value: chatInstance },
    ];
  }, [initData, initDataRaw]);

  const [value, setValue] = useState([0, MAX_TIME]);
  return <section className={'flex flex-col gap-4 justify-start'}>
    <p className={'text-xl'}>Settings</p>
    <Slider
      size={'lg'}
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
      className="max-w-md"
    />
    {JSON.stringify(initDataRows)}
    <Button
      color={'primary'}
      size={'lg'}
      onClick={() => {
        postEvent('web_app_setup_back_button', { data: 13 });
      }}>Submit</Button>
  </section>;
};