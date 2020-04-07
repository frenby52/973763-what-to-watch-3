import * as React from "react";

const tabs = [`Overview`, `Details`, `Reviews`];

type TabsProps = {
  onTabClick: (id: number | string) => void;
  activeTab: number;
};

const Tabs: React.FunctionComponent<TabsProps> = (props: TabsProps) => {
  const {onTabClick, activeTab} = props;

  return (
    <ul className="movie-nav__list">
      {tabs.map((tab, i) => {
        return (
          <li className={`movie-nav__item ${activeTab === i ? `movie-nav__item--active` : ``}`} key={tab}>
            <a href="#" className="movie-nav__link" onClick={(evt) => {
              evt.preventDefault();
              if (activeTab !== i) {
                onTabClick(i);
              }
            }}>{tab}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default Tabs;
