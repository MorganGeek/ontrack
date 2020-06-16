package net.nemerosa.ontrack.model.structure

import com.fasterxml.jackson.annotation.JsonIgnore
import net.nemerosa.ontrack.model.ui.UIPage
import java.net.URI

/**
 * Result for a research
 */
class SearchResult
@JvmOverloads
constructor(
        /**
         * Short title
         */
        val title: String,
        /**
         * Description linked to the item being found
         */
        val description: String,
        /**
         * API access point
         */
        val uri: URI,
        /**
         * Web access point (used for legacy UI)
         */
        @Deprecated("This field will be removed in V5 and [uiPage] must be used instead.")
        val page: URI,
        /**
         * Web access point (used for Next Gen UI)
         */
        val uiPage: UIPage,
        /**
         * Score for the search
         */
        val accuracy: Double,
        /**
         * Type of result
         */
        val type: SearchResultType,
        /**
         * Meta-data which can be used internally
         */
        @get:JsonIgnore
        val data: Map<String, *>? = null
) {
    companion object {
        const val SEARCH_RESULT_ITEM = "item"
    }
}
