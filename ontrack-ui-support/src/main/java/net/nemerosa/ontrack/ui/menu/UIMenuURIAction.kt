package net.nemerosa.ontrack.ui.menu

import net.nemerosa.ontrack.model.annotations.APIDescription

@APIDescription("Action to redirect the user to another URI")
class UIMenuURIAction(
        id: String,
        name: String,
        description: String,
        icon: String,
        @APIDescription("URI to redirect to")
        val uri: String,
        order: Int = UIMenuActionOrder.MIDDLE
) : UIMenuAction(
        id,
        name,
        description,
        icon,
        order
)
