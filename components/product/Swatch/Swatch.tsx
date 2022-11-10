
import React, { FC } from 'react'
import style  from "./Swatch.module.css"
import cn from "classnames"
import { isDark } from '@lib/color'
import { Menu } from '@components/icon'

interface Props {
    color?: string
    label?: string
    variant?: "size" | "color" | string
    onClick: () => void
    active?: boolean
}

// ...変数名 : 残余引数/可変長引数 (rest parameter) => https://typescriptbook.jp/reference/functions/rest-parameters

const Swatch: FC<Props> = ({color, label, variant, active, ...rest}: Props) => {

    label = label?.toLowerCase()
    variant = variant?.toLocaleLowerCase()

    const rootClassName = cn(
        style.root, {
            [style.active]: active,
            [style.color]: color,
            [style.size]: variant === "size",
            [style.dark]: color && variant !== "size" && isDark(color)
        }
    )
    return (
        <button
            style={color ? { backgroundColor: color } : {}}
            className={rootClassName}
            { ...rest }
        >
            {
                variant !== "size" && active && <span><Menu/></span>
            }
            { variant === "size" ? label : null }
        </button>
    )
}

export default Swatch