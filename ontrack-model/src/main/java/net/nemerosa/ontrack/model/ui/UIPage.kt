package net.nemerosa.ontrack.model.ui

import net.nemerosa.ontrack.model.extension.ExtensionFeature
import net.nemerosa.ontrack.model.extension.ExtensionFeatureDescription
import net.nemerosa.ontrack.model.structure.ProjectEntity

/**
 * A `UIPage` defines a "page" at the front-end. Given a [type] and a [list of parameters][params], it is deemed
 * to be enough to identify a unique page inside a given [feature].
 *
 * @property feature Associated feature, or `null` if defined at the code
 * @property type Page type (ie. "project")
 * @property params List of parameters to identify the unique page (ie. the project ID)
 */
class UIPage(
        val feature: ExtensionFeatureDescription?,
        val type: String,
        val params: Map<String, String>
) {

    /**
     * DSL for creating UI pages
     */
    companion object {

        /**
         * ID parameter key
         */
        const val PARAM_ID = "id"

        /**
         * Project entity page
         */
        fun projectEntityPage(entity: ProjectEntity) = entityPage(entity.projectEntityType.name, entity.id())

        /**
         * Simple entity page
         */
        fun entityPage(type: String, id: Int) = corePage(type, mapOf(PARAM_ID to id.toString()))

        /**
         * Page in the core
         */
        fun corePage(type: String, params: Map<String, String>) = UIPage(
                feature = null,
                type = type,
                params = params
        )

        /**
         * Extension page
         */
        fun extensionPage(extensionFeature: ExtensionFeature, type: String, vararg params: Pair<String, String>) =
                UIPage(
                        feature = extensionFeature.featureDescription,
                        type = type,
                        params = mapOf(*params)
                )

    }

}