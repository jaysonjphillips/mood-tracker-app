import React from 'react'
import {Select, MenuItem} from '@material-ui/core'

export default function SelectMenu({options, variant, name, value, label}) {
    return (
        <Select label={label} variant={variant || 'outlined'} name={name} value={value}>
            {options.length && options.map((option, index) => {
                if(option) {
                    return (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                    )
                }
            })}
        </Select>
    )
}