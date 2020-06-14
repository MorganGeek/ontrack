package net.nemerosa.ontrack.graphql.schema.menu

import graphql.schema.GraphQLInterfaceType
import graphql.schema.GraphQLTypeReference
import net.nemerosa.ontrack.graphql.schema.GQLInterface
import net.nemerosa.ontrack.graphql.support.getTypeDescription
import net.nemerosa.ontrack.graphql.support.stringField
import net.nemerosa.ontrack.ui.menu.UIMenuAction
import net.nemerosa.ontrack.ui.menu.UIMenuPageAction
import net.nemerosa.ontrack.ui.menu.UIMenuURIAction
import org.springframework.stereotype.Component

@Component
class GQLInterfaceUIMenuAction : GQLInterface {

    override fun getTypeRef() = GraphQLTypeReference(UI_MENU_ACTION)

    override fun createInterface(): GraphQLInterfaceType =
            GraphQLInterfaceType.newInterface()
                    .name(UI_MENU_ACTION)
                    .description(getTypeDescription(UIMenuAction::class))
                    .typeResolver { env ->
                        val o = env.getObject<UIMenuAction>()
                        when (o) {
                            is UIMenuURIAction -> env.schema.getObjectType(GQLTypeUIMenuURIAction.UI_MENU_URI_ACTION)
                            is UIMenuPageAction -> env.schema.getObjectType(GQLTypeUIMenuPageAction.UI_MENU_PAGE_ACTION)
                            else -> error("Cannot resolve type: ${o::class.qualifiedName}")
                        }
                    }
                    .field(stringField(UIMenuAction::id))
                    .field(stringField(UIMenuAction::name))
                    .field(stringField(UIMenuAction::description))
                    .field(stringField(UIMenuAction::icon))
                    .build()

    companion object {
        val UI_MENU_ACTION: String = UIMenuAction::class.java.simpleName
    }
}