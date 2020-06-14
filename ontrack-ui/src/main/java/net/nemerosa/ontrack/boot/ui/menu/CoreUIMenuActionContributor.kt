package net.nemerosa.ontrack.boot.ui.menu

import net.nemerosa.ontrack.ui.menu.UIMenuAction
import net.nemerosa.ontrack.ui.menu.UIMenuActionContributor
import net.nemerosa.ontrack.ui.menu.UIMenuURIAction
import org.springframework.stereotype.Component

/**
 * Core menu actions.
 */
@Component
class CoreUIMenuActionContributor : UIMenuActionContributor {
    override fun getMenuActions(): List<UIMenuAction> = listOf(
            UIMenuURIAction(
                    id = "logout",
                    name = "Sign out",
                    description = "Closes your session in Ontrack",
                    icon = "sign-out-alt",
                    uri = "/login?logout"
            )
    )
}