package net.nemerosa.ontrack.ui.menu

import net.nemerosa.ontrack.model.annotations.APIDescription

abstract class UIMenuAction(
        @APIDescription("will be used as a HTML ID")
        val id: String,
        @APIDescription("will be used as a link name")
        val name: String,
        @APIDescription("will be used as a tooltip")
        val description: String,
        @APIDescription("ID of a FontAwesome icon to associate with this menu entry")
        val icon: String,
        /**
         * @see UIMenuActionOrder
         */
        @APIDescription("Order of UI action (relative to all other actions)")
        val order: Int = UIMenuActionOrder.MIDDLE
)
