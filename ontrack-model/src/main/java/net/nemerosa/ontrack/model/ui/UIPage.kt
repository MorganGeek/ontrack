package net.nemerosa.ontrack.model.ui

import net.nemerosa.ontrack.model.extension.ExtensionFeatureDescription

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
        val params: List<String>
)
