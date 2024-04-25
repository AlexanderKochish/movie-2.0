import { Dispatch, SetStateAction } from 'react'
import Select, { GroupBase, OptionsOrGroups } from 'react-select'

type Props = {
  defaultValue: null | string | string[]
  onChange: Dispatch<SetStateAction<null | string | string[]>>
  options: OptionsOrGroups<string, GroupBase<string>> | undefined
  styles?: any
}
export const MySelect = ({ defaultValue, onChange, options, styles }: Props) => {
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      '&:hover': {
        borderColor: state.isFocused ? 'var(--light-100)' : '',
      },
      '&:placeholder': {
        color: 'var(--light-100)',
      },
      backgroundColor: 'var(--dark-500)',
      borderColor: state.isFocused ? 'var(--info-300)' : 'var(--light-100)',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(0, 0, 255, .2)' : 'none',
      color: 'var(--light-100)',
    }),
    dropdownIndicator: (base: any, state: any) => ({
      ...base,
      ':hover': {
        color: 'lightgray',
      },
      color: 'white',

      transition: 'all .2s ease',
    }),
    menu: base => ({
      ...base,
      borderRadius: 0,
      color: 'var(--light-100)',
      marginTop: 0,
    }),
    menuList: (base: any, state: any) => ({
      ...base,
      '&:hover': {
        backgroundColor: 'var(--info-300)',
      },
      backgroundColor: 'var(--dark-500)',
      color: 'var(--light-100)',
      padding: 0,
    }),
    option: (base: any, state: any) => ({
      ...base,
      '&:hover': {
        backgroundColor: state.isFocused ? 'var(--info-300)' : 'gray',
      },
      ':active': {
        ...base[':active'],
        backgroundColor: 'var(--dark-500)',
        transition: 'all 0.3s',
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
      defaultValue={defaultValue}
      onChange={onChange}
      options={options || optionsTest}
      styles={styles || customStyles}
    />
  )
}
