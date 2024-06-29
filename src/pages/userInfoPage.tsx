import { Button, DatePicker, Input, Select, SelectItem, Switch, Textarea } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import countryList from 'react-select-country-list';
import { userAtom } from '../store/user.atom.ts';
import { useAtom } from '@reatom/npm-react';

interface UserInfoForm {
  isAdult: boolean;
  bio: string;
  preferredName: string;
  country: string;
  timezoneOffset: number;
  bDay?: {
    day: number,
    month: number,
    year: number,
  };
}

export const UserInfoPage = () => {
  const [userData] = useAtom(userAtom);
  const [formData, setFormData] = useState<UserInfoForm>({
    isAdult: false,
    bio: '',
    preferredName: userData?.user?.username ?? '',
    country: userData?.user?.language_code ?? 'RU',
    timezoneOffset: new Date().getTimezoneOffset(),
  });
  const options = useMemo(() => countryList().getData(), []);

  return <section className={'flex flex-col gap-4 justify-start'}>
    <p className={'text-xl'}>Tell me something about you</p>
    <Input
      fullWidth={true}
      value={formData.preferredName}
      onValueChange={(value) => setFormData(prev => ({ ...prev, preferredName: value }))}
      type="text"
      label="Preferred name"
      placeholder="Enter your preferred name" />
    <DatePicker
      fullWidth={true}
      className={'text-start'}
      onChange={(value) => setFormData(prev => ({ ...prev, bDay: value }))}
      label="Birth date" />
    <Textarea
      fullWidth={true}
      value={formData.bio}
      onValueChange={(value) => setFormData(prev => ({ ...prev, bio: value }))}
      label="Bio"
      placeholder="Enter your biography"
    />
    <Switch
      isSelected={formData.isAdult}
      onValueChange={(isSelected) => setFormData(prev => ({ ...prev, isAdult: isSelected }))}
    >Is adult</Switch>
    <Select
      label="Country"
      fullWidth={true}
      placeholder="Enter your country"
      selectedKeys={[formData.country]}
      onSelectionChange={(value) => {
        if (value instanceof Array)
          setFormData(prev => ({ ...prev, country: value[0].currentKey.toString() }));
      }}
    >
      {options.map((country) => (
        <SelectItem key={country.value}>
          {country.label}
        </SelectItem>
      ))}
    </Select>
    <Button
      fullWidth={true}
      color={'primary'}
      onClick={() => {
        console.log(formData);
      }}>Submit</Button>
  </section>;
};