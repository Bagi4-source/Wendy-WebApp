import { reatomAsync, withDataAtom } from '@reatom/framework';
import axios from 'axios';

interface IQuestionnaire {
  userId: number;
  preferredName: string;
  bio: string;
  bday: Date;
  isAdult: boolean;
  residenceCountry: string;
}

export const getQuestionnaire = reatomAsync((ctx, telegramId: number) => {
    return axios.get<IQuestionnaire>(`http://95.163.223.114:3000/user/questionnaire?userId=${telegramId}`)
      .then(({ data }) => ({ ...data, bday: new Date(data.bday) }))
      .catch(() => undefined);
  },
  'getQuestionnaire').pipe(withDataAtom(undefined));

export const updateQuestionnaire = reatomAsync(async (ctx, data: IQuestionnaire) => {
    console.log(data);
  await axios.post('http://95.163.223.114:3000/user/questionnaire', data)
  },
  'updateQuestionnaire');
