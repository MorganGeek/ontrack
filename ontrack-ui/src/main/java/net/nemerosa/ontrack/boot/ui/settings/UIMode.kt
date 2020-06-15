package net.nemerosa.ontrack.boot.ui.settings

/**
 * Defines the UI behaviour, between the legacy mode and the "next gen" mode.
 */
enum class UIMode(
        val allowUILegacy: Boolean,
        val allowUINextGen: Boolean
) {

    /**
     * Only the legacy mode is available.
     */
    LEGACY_ONLY(allowUILegacy = true, allowUINextGen = false),

    /**
     * Both legacy and next gen are available, with legacy being shown first.
     */
    LEGACY_FIRST(allowUILegacy = true, allowUINextGen = true),

    /**
     * Both legacy and new gen are available, with next gen being shown first.
     */
    NEXT_GEN_FIRST(allowUILegacy = true, allowUINextGen = true),

    /**
     * Only the next gen UI is available. This mode is the final target, at which time
     * this whole [UIMode] setup can be removed altogether.
     */
    NEXT_GEN_ONLY(allowUILegacy = false, allowUINextGen = true)

}