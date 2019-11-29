import { currentSettings } from "../models/settings.js"

/**
 * Replaces all the occurrences of no-break space (00A0 Unicode character) with
 * regular spaces (0020 Unicode character) if interface.fixNBSpaces setting is
 * set to true.  Otherwise, it returns given string unchanged.
 */
export function fixNBSpaces(string) {
  const shouldFix = currentSettings.data.interface.fixNBSpaces

  return shouldFix ? string.replace(/\u00A0/g, " ") : string
}
