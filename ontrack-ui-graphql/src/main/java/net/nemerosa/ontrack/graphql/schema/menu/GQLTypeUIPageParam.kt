package net.nemerosa.ontrack.graphql.schema.menu

import graphql.schema.GraphQLObjectType
import net.nemerosa.ontrack.graphql.schema.GQLType
import net.nemerosa.ontrack.graphql.schema.GQLTypeCache
import net.nemerosa.ontrack.graphql.support.GraphQLBeanConverter
import net.nemerosa.ontrack.model.annotations.APIDescription
import net.nemerosa.ontrack.model.ui.UIPage
import org.springframework.stereotype.Component

/**
 * Representation of a [UI page parameter][UIPage.params].
 */
@Component
class GQLTypeUIPageParam : GQLType {

    override fun createType(cache: GQLTypeCache): GraphQLObjectType = GraphQLBeanConverter.asObjectType(UIPageParam::class, cache)

    override fun getTypeName(): String = UI_PAGE_PARAM

    companion object {
        val UI_PAGE_PARAM: String = UIPageParam::class.java.simpleName
    }
}

data class UIPageParam(
        @APIDescription("Parameter name")
        val name: String,
        @APIDescription("Parameter value")
        val value: String
) {
    companion object {
        fun toUIPageParams(uiPage: UIPage) = uiPage.params.map { (name, value) -> UIPageParam(name, value) }
    }
}
