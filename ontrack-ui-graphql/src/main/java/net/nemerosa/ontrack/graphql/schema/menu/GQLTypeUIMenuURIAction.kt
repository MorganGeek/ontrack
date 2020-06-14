package net.nemerosa.ontrack.graphql.schema.menu

import graphql.schema.GraphQLObjectType
import net.nemerosa.ontrack.graphql.schema.GQLType
import net.nemerosa.ontrack.graphql.schema.GQLTypeCache
import net.nemerosa.ontrack.graphql.support.getTypeDescription
import net.nemerosa.ontrack.graphql.support.stringField
import net.nemerosa.ontrack.ui.menu.UIMenuAction
import net.nemerosa.ontrack.ui.menu.UIMenuURIAction
import org.springframework.stereotype.Component

@Component
class GQLTypeUIMenuURIAction(
        private val uiMenuAction: GQLInterfaceUIMenuAction
): GQLType {

    override fun getTypeName(): String = UI_MENU_URI_ACTION

    override fun createType(cache: GQLTypeCache): GraphQLObjectType =
            GraphQLObjectType.newObject()
                    .name(typeName)
                    .description(getTypeDescription(UIMenuURIAction::class))
                    // Interface
                    .withInterface(uiMenuAction.typeRef)
                    .field(stringField(UIMenuAction::id))
                    .field(stringField(UIMenuAction::name))
                    .field(stringField(UIMenuAction::description))
                    .field(stringField(UIMenuAction::icon))
                    // URI
                    .field(stringField(UIMenuURIAction::uri))
                    // OK
                    .build()

    companion object {
        val UI_MENU_URI_ACTION: String = UIMenuURIAction::class.java.simpleName
    }

}