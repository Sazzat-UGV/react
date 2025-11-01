import { Select } from 'antd';

const SelectBox = ({options, placeholder, onChange, style }) => {
  return (
    <Select
    showSearch
    style={style || {width: 100} }
    placeholder={placeholder || 'Select'}
    optionFilterProp="label"
    onChange={onChange}
    // filterSort={(optionA, optionB) =>
    //   (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    // }
    options={options}
  />
  )
}

export default SelectBox