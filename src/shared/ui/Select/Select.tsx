import { Dispatch, SetStateAction, useState } from 'react'
import Select, { GroupBase, OptionsOrGroups } from 'react-select'

type Props = {
  defaultValue: null | string | string[]
  onChange: Dispatch<SetStateAction<null | string | string[]>>
  options: { label: string; value: string }[]
  styles?: any
}
export const MySelect = ({ defaultValue, onChange, options, styles }: Props) => {
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
    singleValue: (styles: any) => ({
      ...styles,
      color: 'white',
    }),
  }

  return (
    <Select
      onChange={onChange}
      onMenuClose={() => setOpen(false)}
      onMenuOpen={() => setOpen(true)}
      options={options || optionsTest}
      // defaultValue={[options[0], options[1]] || ''}
      placeholder={options[0].label}
      styles={styles || customStyles}
    />
  )
}
