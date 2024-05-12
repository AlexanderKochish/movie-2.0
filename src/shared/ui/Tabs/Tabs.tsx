import { ReactNode } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import clsx from 'clsx'

import 'react-tabs/style/react-tabs.css'

import s from './Tabs.module.scss'
type TabItem = {
  content: ReactNode
  label: string
}

type TabsProps = {
  className?: string
  tabs?: TabItem[]
}
export const CustomTabs = ({ className, tabs }: TabsProps) => {
  return (
    <Tabs className={clsx(s.tabs, className)} selectedTabClassName={s.selected}>
      <TabList className={s.list}>
        {tabs && tabs.map((tab: TabItem) => <Tab className={s.tab}>{tab.label}</Tab>)}
      </TabList>

      {tabs && tabs.map((tab: TabItem) => <TabPanel>{tab.content}</TabPanel>)}
    </Tabs>
  )
}
