package net.nemerosa.ontrack.boot.ui.menu

import net.nemerosa.ontrack.boot.ui.settings.UISettings
import net.nemerosa.ontrack.common.then
import net.nemerosa.ontrack.model.settings.CachedSettingsService
import net.nemerosa.ontrack.model.settings.getCachedSettings
import net.nemerosa.ontrack.ui.menu.UIMenuAction
import net.nemerosa.ontrack.ui.menu.UIMenuActionContributor
import net.nemerosa.ontrack.ui.menu.UIMenuActionOrder
import net.nemerosa.ontrack.ui.menu.UIMenuURIAction
import org.springframework.stereotype.Component

/**
 * Core menu actions.
 */
@Component
class CoreUIMenuActionContributor(
        private val cachedSettingsService: CachedSettingsService
) : UIMenuActionContributor {
    override fun getMenuActions(): List<UIMenuAction> {
        val uiSettings = cachedSettingsService.getCachedSettings<UISettings>()
        return listOfNotNull(
                // Switch to legacy UI
                uiSettings.mode.allowUILegacy then {
                    UIMenuURIAction(
                            id = "ui-legacy",
                            name = "Switch to legacy UI",
                            description = "Goes to the legacy UI (home page)",
                            icon = "door-open",
                            order = UIMenuActionOrder.BEFORE_END,
                            uri = "/"
                    )
                },
                // Logout
                UIMenuURIAction(
                        id = "logout",
                        name = "Sign out",
                        description = "Closes your session in Ontrack",
                        icon = "sign-out-alt",
                        order = UIMenuActionOrder.END,
                        uri = "/login?logout"
                )
        )
    }
}