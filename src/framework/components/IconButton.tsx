import React, { CSSProperties } from "react"

import "./IconButton.css"
import { PrimeIcons, PrimeIconsOptions } from "primereact/api"
import { Button } from "primereact/button"

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

export default React.memo(IconButton)
