import { ModifierKeys } from "./ModifierKeys"
import { SpecialKeys } from "./Special"

export default {
  ...SpecialKeys,
  ...ModifierKeys,
} as const
