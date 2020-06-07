package net.nemerosa.ontrack.kdsl.http

import com.fasterxml.jackson.databind.JsonNode
import net.nemerosa.ontrack.kdsl.connector.Connector
import net.nemerosa.ontrack.kdsl.connector.client.OntrackConnector
import net.nemerosa.ontrack.kdsl.spec.Ontrack
import net.nemerosa.ontrack.kdsl.spec.Resource

abstract class HttpResource(
        protected val json: JsonNode,
        ontrackConnector: OntrackConnector
) : Connector(ontrackConnector), Resource {

    override val ontrack: Ontrack by lazy {
        HttpOntrack(ontrackConnector)
    }

    protected fun link(name: String): String = optionalLink(name) ?: throw ResourceMissingLinkException(name)

    protected fun optionalLink(name: String): String? {
        val linkName = if (name.startsWith('_')) name else "_$name"
        return if (json.has(linkName)) {
            json[linkName].textValue().removePrefix("/")
        } else {
            null
        }
    }

}
