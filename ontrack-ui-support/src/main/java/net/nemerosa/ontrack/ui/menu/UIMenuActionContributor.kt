package net.nemerosa.ontrack.ui.menu

/**
 * Adds menu actions.
 */
interface UIMenuActionContributor {

    /**
     * List of menu actions for the current user
     */
    fun getMenuActions(): List<UIMenuAction>

}