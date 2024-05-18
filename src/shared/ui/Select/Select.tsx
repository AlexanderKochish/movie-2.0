import { Dispatch, SetStateAction, useState } from 'react'
import Select, { ActionMeta, GroupBase, OptionsOrGroups, SingleValue } from 'react-select'

type Props = {
  defaultValue: string | undefined
  handleFilterChange: (label: string, value: string) => void
  onChange: (data: { label: string; name: string; value: string }) => void
  options: OptionsOrGroups<string, GroupBase<string>> | undefined
  placeholder: string | undefined
  styles?: any
  value: null | string | string[]
}
export const MySelect = ({
  defaultValue,
  handleFilterChange,
  onChange,
  options,
  placeholder,
  styles,
  value,
}: Props) => {
  const [open, setOpen] = useState(false)
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      '&:placeholder': {
        color: 'var(--light-100)',
      },
      backgroundColor: 'var(--dark-500)',
      border: 'none',
      color: 'var(--light-100)',
      cursor: 'pointer',
      minWidth: '150px',
    }),
    dropdownIndicator: (base: any, state: any) => ({
      ...base,
      ':hover': {
        color: 'var(--light-100)',
      },
      backgroundColor: 'inherit',
      color: 'var(--light-100)',
      transform: open ? 'rotate(-180deg)' : 'rotate(0deg)',
      transition: 'all .2s ease',
    }),
    indicatorSeparator: (base: any, state: any) => ({
      display: 'none',
    }),
    menu: (base: any) => ({
      ...base,
      border: 'none',
      borderRadius: 0,
      color: 'var(--light-100)',
      marginTop: 0,
    }),
    menuList: (base: any, state: any) => ({
      ...base,
      backgroundColor: 'var(--dark-500)',
      color: 'var(--light-100)',
      padding: 0,
    }),
    option: (base: any, state: any) => ({
      ...base,
      '&:hover': {
        backgroundColor: state.isFocused ? 'var(--dark-300)' : 'gray',
      },
      backgroundColor: 'var(--dark-500)',
      color: 'var(--light-100)',
      cursor: 'pointer',
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: 'white',
    }),
    singleValue: (styles: any) => ({
      ...styles,
      color: 'white',
    }),
  }

  const handler = (data: any) => {
    onChange(data)
    handleFilterChange(data.name, data.label)
  }

  return (
    <Select
      onChange={handler}
      onMenuClose={() => setOpen(false)}
      onMenuOpen={() => setOpen(true)}
      options={options}
      placeholder={placeholder}
      styles={styles || customStyles}
      // defaultValue={[options[0], options[1]] || ''}
      value={value}
    />
  )
}
