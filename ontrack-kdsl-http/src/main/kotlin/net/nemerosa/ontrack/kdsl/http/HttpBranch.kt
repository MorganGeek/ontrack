package net.nemerosa.ontrack.kdsl.http

import com.fasterxml.jackson.databind.JsonNode
import net.nemerosa.ontrack.kdsl.connector.client.OntrackConnector
import net.nemerosa.ontrack.kdsl.connector.support.description
import net.nemerosa.ontrack.kdsl.connector.support.id
import net.nemerosa.ontrack.kdsl.connector.support.name
import net.nemerosa.ontrack.kdsl.spec.Branch
import net.nemerosa.ontrack.kdsl.spec.Project

class HttpBranch(json: JsonNode, ontrackConnector: OntrackConnector) : HttpProjectEntity(json, ontrackConnector), Branch {

    override val entityType: String = "BRANCH"

    override val name: String = json.name
    override val description: String = json.description

    override val project: Project by lazy {
        ontrack.getProjectByID(json["project"].id)
    }
}