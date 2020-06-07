package net.nemerosa.ontrack.kdsl.http

import com.fasterxml.jackson.databind.JsonNode
import net.nemerosa.ontrack.kdsl.connector.client.OntrackConnector
import net.nemerosa.ontrack.kdsl.connector.support.id
import net.nemerosa.ontrack.kdsl.spec.Entity

abstract class HttpEntity(json: JsonNode, ontrackConnector: OntrackConnector) : HttpResource(json, ontrackConnector), Entity {

    override val id: Int = json.id

}