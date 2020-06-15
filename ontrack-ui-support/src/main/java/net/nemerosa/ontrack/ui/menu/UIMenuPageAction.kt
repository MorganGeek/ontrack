package net.nemerosa.ontrack.ui.menu

import net.nemerosa.ontrack.model.annotations.APIDescription

@APIDescription("Action to move the user to another page")
class UIMenuPageAction(
        id: String,
        name: String,
        description: String,
        icon: String,
        @APIDescription("Page to display")
        val page: String,
        order: Int = UIMenuActionOrder.MIDDLE
) : UIMenuAction(
        id,
        name,
        description,
        icon,
        order
)
