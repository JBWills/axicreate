import React, { CSSProperties } from "react"

import "./IconButton.css"
import { PrimeIcons, PrimeIconsOptions } from "primereact/api"
import { Button } from "primereact/button"

import { axiMemo } from "../../hooks/genericMemo"

interface IconButtonProps {
  icon: keyof PrimeIconsOptions
  onClick: React.MouseEventHandler<HTMLButtonElement>
  tooltip?: string
  style?: CSSProperties
}

function IconButton({ icon, tooltip, onClick, style }: IconButtonProps) {
  return (
    <Button
      className="IconButton"
      tooltip={tooltip}
      tooltipOptions={{
        showDelay: 200,
      }}
      icon={PrimeIcons[icon]}
      onClick={onClick}
      size="small"
      style={style}
    />
  )
}

export default axiMemo(IconButton)
