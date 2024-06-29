import { ReactNode, useEffect, useMemo } from 'react';
import { Person, Gear, ChartMixed } from '@gravity-ui/icons';
import { Tab, Tabs } from '@nextui-org/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAtom } from '@reatom/npm-react';
import { userAtom } from '../store/user.atom.ts';


interface MenuItem {
  content: ReactNode;
  key: string;
}

export const MenuLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);

  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();

  useEffect(() => {
    if (tg.initDataUnsafe)
      setUser(tg.initDataUnsafe);
  }, [tg.initDataUnsafe]);


  const menuItems: MenuItem[] = useMemo(() => [{
    content: <Person className={'w-auto h-5 opacity-90'} />,
    key: 'profile',
  }, {
    content: <ChartMixed className={'w-auto h-5 opacity-90'} />,
    key: 'stats',
  }, {
    content: <Gear className={'w-auto h-5 opacity-90'} />,
    key: 'settings',
  }], []);

  const selectedKey = useMemo(() => {
    for (const item of menuItems) {
      if (location.pathname.endsWith(item.key))
        return item.key;
    }
  }, [location.pathname]);

  return <>
    <div className={"mb-20"}>
      <Outlet />
    </div>
    <div className={'fixed bottom-4 left-0 w-full px-3 z-50'}>
      <Tabs
        className={'w-full'}
        color={'primary'}
        aria-label="menu"
        fullWidth={true}
        onSelectionChange={(key) => {
          navigate(`${key}`);
        }}
        selectedKey={selectedKey}
        size={'lg'}
        classNames={{
          tab: 'h-10',
        }}
      >
        {menuItems.map((item) =>
          <Tab
            title={item.content}
            key={item.key}
          />,
        )}
      </Tabs>
    </div>
  </>;
};