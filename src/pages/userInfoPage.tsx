import { Button, DatePicker, Input, Select, SelectItem, Switch, Textarea } from '@nextui-org/react';
import { useMemo, useState } from 'react';
import countryList from 'react-select-country-list';

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
  const [formData, setFormData] = useState<UserInfoForm>({
    isAdult: false,
    bio: '',
    preferredName: '',
    country: 'RU',
    timezoneOffset: new Date().getTimezoneOffset(),
  });
  const options = useMemo(() => countryList().getData(), []);

  return <section className={'flex flex-col gap-4 justify-start'}>
    <p className={'text-xl'}>Tell me something about you</p>
    <Input
      fullWidth={true}
      value={formData.preferredName}
      onValueChange={(value) => setFormData(prev => ({ ...prev, preferredName: value }))}
      size={'lg'}
      type="text"
      label="Preferred name"
      placeholder="Enter your preferred name" />
    <DatePicker
      size={'lg'}
      fullWidth={true}
      className={'text-start'}
      onChange={(value) => setFormData(prev => ({ ...prev, bDay: value }))}
      label="Birth date" />
    <Textarea
      fullWidth={true}
      value={formData.bio}
      onValueChange={(value) => setFormData(prev => ({ ...prev, bio: value }))}
      size={'lg'}
      label="Bio"
      placeholder="Enter your biography"
    />
    <Switch
      isSelected={formData.isAdult}
      onValueChange={(isSelected) => setFormData(prev => ({ ...prev, isAdult: isSelected }))}
      size={'lg'}
    >Is adult</Switch>
    <Select
      label="Country"
      fullWidth={true}
      size={'lg'}
      placeholder="Enter your country"
      selectedKeys={[formData.country]}
      onSelectionChange={(value) => {
        setFormData(prev => ({ ...prev, country: value.currentKey }))
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
      size={'lg'}
      onClick={() => {
        console.log(formData);
      }}>Submit</Button>
  </section>;
};