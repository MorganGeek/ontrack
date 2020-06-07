package net.nemerosa.ontrack.kdsl.http

import com.fasterxml.jackson.databind.JsonNode
import net.nemerosa.ontrack.kdsl.connector.client.OntrackConnector
import net.nemerosa.ontrack.kdsl.connector.support.description
import net.nemerosa.ontrack.kdsl.connector.support.name
import net.nemerosa.ontrack.kdsl.connector.type
import net.nemerosa.ontrack.kdsl.connector.value
import net.nemerosa.ontrack.kdsl.spec.Branch
import net.nemerosa.ontrack.kdsl.spec.Project

class HttpProject(json: JsonNode, ontrackConnector: OntrackConnector) : HttpProjectEntity(json, ontrackConnector), Project {

    override val entityType: String = "PROJECT"

    override val name: String = json.name
    override val description: String = json.description

    override val branches: List<Branch>
        get() = getResources("structure/projects/$id/branches") {
            HttpBranch(it, ontrackConnector)
        }

    override fun branches(name: String): List<Branch> =
            graphQLQuery(
                    "Branches",
                    """branches(name: ${'$'}name, project: ${'$'}project) { json }""",
                    "name" type "String" value name, "project" type "String!" value this.name
            ).data["branches"].map {
                HttpBranch(it["json"], ontrackConnector)
            }

    override fun createBranch(name: String, description: String, disabled: Boolean): Branch =
            postAndConvert(
                    "structure/projects/$id/branches/create",
                    mapOf(
                            "name" to name,
                            "description" to description,
                            "disabled" to disabled
                    )
            ) { HttpBranch(it, ontrackConnector) }
}