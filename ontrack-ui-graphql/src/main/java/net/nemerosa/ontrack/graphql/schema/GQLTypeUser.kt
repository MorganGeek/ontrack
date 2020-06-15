package net.nemerosa.ontrack.graphql.schema

import graphql.schema.GraphQLObjectType
import net.nemerosa.ontrack.graphql.schema.actions.UIActionsGraphQLService
import net.nemerosa.ontrack.graphql.schema.actions.actions
import net.nemerosa.ontrack.graphql.support.listField
import net.nemerosa.ontrack.graphql.support.objectField
import net.nemerosa.ontrack.model.security.SecurityService
import net.nemerosa.ontrack.ui.menu.UIMenuActionContributor
import org.springframework.stereotype.Component

@Component
class GQLTypeUser(
        private val securityService: SecurityService,
        private val uiActionsGraphQLService: UIActionsGraphQLService,
        private val uiMenuActionContributors: List<UIMenuActionContributor>
) : GQLType {

    companion object {
        const val USER_TYPE = "User"
    }

    override fun getTypeName(): String = USER_TYPE

    override fun createType(cache: GQLTypeCache): GraphQLObjectType =
            GraphQLObjectType.newObject()
                    .name(USER_TYPE)
                    .description("Representation of the current user")
                    // Account representation
                    .field(
                            objectField("account", "Account associated to the user") {
                                securityService.currentAccount?.account
                            }
                    )
                    // Actions
                    .actions(uiActionsGraphQLService, RootUser::class)
                    // UI menu actions
                    .field(
                            listField(
                                    description = "List of actions in the user menu",
                                    name = "uiMenuActions"
                            ) {
                                uiMenuActionContributors.flatMap { contributor ->
                                    contributor.getMenuActions()
                                }.sortedBy { it.order }
                            }
                    )
                    // OK
                    .build()

}

/**
 * Pseudo item associated to the root user type
 */
class RootUser private constructor() {
    companion object {
        val INSTANCE = RootUser()
    }
}