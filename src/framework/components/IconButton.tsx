import React, { CSSProperties } from "react"

import "./IconButton.css"
import { PrimeIcons, PrimeIconsOptions } from "primereact/api"
import { Button } from "primereact/button"

import { axiMemo } from "../../hooks/genericMemo"

interface IconButtonProps {
  icon: keyof PrimeIconsOptions
  tooltip?: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
  style?: CSSProperties
}

function IconButton({ icon, tooltip, onClick, style }: IconButtonProps) {
  return (
    <Button
      className="IconButton"
      tooltip={tooltip}
      icon={PrimeIcons[icon]}
      onClick={onClick}
      size="small"
      style={style}
    />
  )
}

export default axiMemo(IconButton)
