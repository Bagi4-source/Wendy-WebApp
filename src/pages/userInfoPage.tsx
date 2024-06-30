import { Button, DatePicker, Input, Select, SelectItem, Switch, Textarea, Selection } from '@nextui-org/react';
import { useEffect, useMemo, useState } from 'react';
import countryList from 'react-select-country-list';
import { userAtom } from '../store/user.atom.ts';
import { useAction, useAtom } from '@reatom/npm-react';
import { parseDate } from '@internationalized/date';
import { getQuestionnaire, updateQuestionnaire } from '../store/questionnaire.atom.ts';
import { WebAppDataDto } from '../dto/WebAppData.dto.ts';

interface UserInfoForm {
  userId: number;
  isAdult: boolean;
  bio: string;
  preferredName: string;
  residenceCountry: string;
  bday: Date;
}

export const UserInfoPage = () => {
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  const [userData] = useAtom(userAtom);
  const getQuestionnaireAction = useAction(getQuestionnaire);
  const updateQuestionnaireAction = useAction(updateQuestionnaire);
  const [questionnaire] = useAtom(getQuestionnaire.dataAtom);
  const [dateInvalid, setDateInvalid] = useState(false);

  useEffect(() => {
    if (userData?.user?.id)
      getQuestionnaireAction(userData.user.id);
  }, [getQuestionnaireAction, userData?.user?.id]);

  const firstQuestionnaireCreate = useMemo(() => questionnaire === undefined, [questionnaire])

  const [formData, setFormData] = useState<UserInfoForm>({
    userId: userData?.user?.id ?? 0,
    isAdult: false,
    bio: '',
    preferredName: userData?.user?.first_name ?? '',
    residenceCountry: userData?.user?.language_code?.toUpperCase() ?? 'RU',
    bday: new Date(),
  });

  useEffect(() => {
    if (!questionnaire) return;
    setFormData(questionnaire);
  }, [questionnaire, userData]);

  const options = useMemo(() => countryList().getData(), []);
  const bday = useMemo(() => {
    const parts = formData.bday.toLocaleDateString().split(".").reverse();
    return parseDate(parts.join("-"));
  }, [formData.bday]);

  return <section className={'flex flex-col gap-4 justify-start'}>
    <p className={'text-xl'}>Tell me something about you</p>
    <Input
      isRequired={true}
      isInvalid={formData.preferredName.trim() === ''}
      errorMessage={"Preferred name is empty"}
      className={"text-start"}
      fullWidth={true}
      value={formData.preferredName}
      onValueChange={(value) => setFormData(prev => ({ ...prev, preferredName: value }))}
      type="text"
      label="Preferred name"
      placeholder="Enter your preferred name" />
    <DatePicker
      isRequired={true}
      isInvalid={dateInvalid}
      errorMessage={"Invalid date format"}
      fullWidth={true}
      className={'text-start'}
      defaultValue={bday}
      onChange={(value) => {
        try {
          setDateInvalid(false);
          const bday = new Date(value.year, value.month - 1, value.day);
          const parts = bday.toLocaleDateString().split(".").reverse();
          parseDate(parts.join("-"));
          setFormData(prev => ({ ...prev, bday }));
        } catch {
          setDateInvalid(true);
          console.error("Invalid date format!");
        }
      }}
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
      isRequired={true}
      unselectable={"off"}
      label="Country"
      fullWidth={true}
      placeholder="Enter your country"
      selectedKeys={[formData.residenceCountry]}
      onSelectionChange={(value: Selection) => {
        if (value instanceof Set) {
          const currentKey = Array.from(value);
          if (currentKey.length)
            setFormData(prev => ({ ...prev, residenceCountry: currentKey[0].toString() }));
        }
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
        updateQuestionnaireAction(formData);
        if (firstQuestionnaireCreate) {
          const data: WebAppDataDto = {
            event: "FIRST_QUESTIONNAIRE_CREATE",
            content: {}
          }
          console.log(data);
          tg.sendData(JSON.stringify(data));
        }
      }}>Submit</Button>
  </section>;
};