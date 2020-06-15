package net.nemerosa.ontrack.boot.ui.settings

/**
 * Defines the UI behaviour, between the legacy mode and the "next gen" mode.
 */
enum class UIMode {

    /**
     * Only the legacy mode is available.
     */
    LEGACY_ONLY,

    /**
     * Both legacy and next gen are available, with legacy being shown first.
     */
    LEGACY_FIRST,

    /**
     * Both legacy and new gen are available, with next gen being shown first.
     */
    NEXT_GEN_FIRST,

    /**
     * Only the next gen UI is available. This mode is the final target, at which time
     * this whole [UIMode] setup can be removed altogether.
     */
    NEXT_GEN_ONLY

}