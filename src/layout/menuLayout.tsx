import { ReactNode, useMemo } from 'react';
import { Person, Gear, ChartMixed } from '@gravity-ui/icons';
import { Tab, Tabs } from '@nextui-org/react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';


interface MenuItem {
  content: ReactNode;
  key: string;
}

export const MenuLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    <Outlet />
    <div className={'fixed bottom-4 left-0 w-full px-3'}>
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