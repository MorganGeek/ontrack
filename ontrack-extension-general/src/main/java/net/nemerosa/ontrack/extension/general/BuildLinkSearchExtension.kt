package net.nemerosa.ontrack.extension.general

import com.fasterxml.jackson.databind.JsonNode
import net.nemerosa.ontrack.common.asMap
import net.nemerosa.ontrack.extension.support.AbstractExtension
import net.nemerosa.ontrack.job.Schedule
import net.nemerosa.ontrack.json.parseOrNull
import net.nemerosa.ontrack.model.events.BuildLinkListener
import net.nemerosa.ontrack.model.structure.*
import net.nemerosa.ontrack.model.ui.UIPage
import net.nemerosa.ontrack.ui.controller.URIBuilder
import org.springframework.stereotype.Component

/**
 * Searching on the build links.
 */
@Component
class BuildLinkSearchExtension(
        extensionFeature: GeneralExtensionFeature,
        private val uriBuilder: URIBuilder,
        private val structureService: StructureService,
        private val buildDisplayNameService: BuildDisplayNameService,
        private val searchIndexService: SearchIndexService
) : AbstractExtension(extensionFeature), SearchIndexer<BuildLinkSearchItem>, BuildLinkListener {

    override val indexerName: String = "Build links"

    override val indexName: String = BUILD_LINK_SEARCH_INDEX

    override val indexerSchedule: Schedule = Schedule.EVERY_DAY

    override val searchResultType = SearchResultType(
            feature = extensionFeature.featureDescription,
            id = "build-link",
            name = "Linked Build",
            description = "Reference to a linked project and build, using format project:[build] where the target build is optional"
    )

    override val indexMapping: SearchIndexMapping? = indexMappings<BuildLinkSearchItem> {
        +BuildLinkSearchItem::fromBuildId to id { index = false }
        +BuildLinkSearchItem::targetBuildId to id { index = false }
        +BuildLinkSearchItem::targetProject to keyword()
        +BuildLinkSearchItem::targetBuild to keyword()
        +BuildLinkSearchItem::targetKey to text { scoreBoost = 3.0 }
    }

    override fun indexAll(processor: (BuildLinkSearchItem) -> Unit) {
        structureService.forEachBuildLink { from, to ->
            process(from, to, processor)
        }
    }

    override fun toSearchResult(id: String, score: Double, source: JsonNode): SearchResult? {
        // Parsing
        val item = source.parseOrNull<BuildLinkSearchItem>()
        // Loading
        return item?.run {
            // Loads the source build
            structureService.findBuildByID(ID.of(item.fromBuildId))
        }?.takeIf {
            // The target build must still exist
            structureService.findBuildByID(ID.of(item.targetBuildId)) != null
        }?.run {
            SearchResult(
                    entityDisplayName,
                    "Linked to ${item.targetProject}:${item.targetBuild}",
                    uriBuilder.getEntityURI(this),
                    uriBuilder.getEntityPage(this),
                    UIPage.projectEntityPage(this),
                    score,
                    searchResultType
            )
        }
    }

    override fun onBuildLinkAdded(from: Build, to: Build) {
        process(from, to) { item ->
            searchIndexService.createSearchIndex(this, item)
        }
    }

    override fun onBuildLinkDeleted(from: Build, to: Build) {
        process(from, to) { item ->
            searchIndexService.deleteSearchIndex(this, item.id)
        }
    }

    private fun process(from: Build, to: Build, processor: (BuildLinkSearchItem) -> Unit) {
        processor(BuildLinkSearchItem(from, to))
        // Alternative name
        val otherName = buildDisplayNameService.getBuildDisplayName(to)
        if (otherName != to.name) {
            processor(BuildLinkSearchItem(from, to, otherName))
        }
    }
}

/**
 * Index name for the build links
 */
const val BUILD_LINK_SEARCH_INDEX = "build-links"

class BuildLinkSearchItem(
        val fromBuildId: Int,
        val targetBuildId: Int,
        val targetProject: String,
        val targetBuild: String
) : SearchItem {

    constructor(from: Build, to: Build, targetBuildName: String = to.name) : this(
            fromBuildId = from.id(),
            targetBuildId = to.id(),
            targetProject = to.project.name,
            targetBuild = targetBuildName
    )

    override val id: String = "$fromBuildId::$targetBuildId"

    val targetKey = "$targetProject:$targetBuild"

    override val fields: Map<String, Any?> = asMap(
            this::fromBuildId,
            this::targetBuildId,
            this::targetProject,
            this::targetBuild,
            this::targetKey
    )

}