import { atom } from '@reatom/core';


export const userAtom = atom<WebAppInitData | undefined>(undefined, 'userAtom');

