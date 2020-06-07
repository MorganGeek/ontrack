package net.nemerosa.ontrack.kdsl.http

import com.fasterxml.jackson.databind.JsonNode
import net.nemerosa.ontrack.kdsl.connector.client.OntrackConnector
import net.nemerosa.ontrack.kdsl.connector.support.parseInto
import net.nemerosa.ontrack.kdsl.http.support.signature
import net.nemerosa.ontrack.kdsl.spec.ProjectEntity
import net.nemerosa.ontrack.kdsl.spec.Signature
import kotlin.reflect.KClass

abstract class HttpProjectEntity(json: JsonNode, ontrackConnector: OntrackConnector) : HttpEntity(json, ontrackConnector), ProjectEntity {

    /**
     * Entity type
     */
    abstract val entityType: String

    override val signature: Signature by lazy { json.signature }

    override fun setProperty(type: String, value: Any) {
        ontrackConnector.put(
                "properties/$entityType/$id/$type/edit",
                value
        )
    }

    override fun <T : Any> getProperty(kClass: KClass<T>, type: String): T? =
            ontrackConnector.get(
                    "properties/$entityType/$id/$type/view"
            )?.get("value")?.parseInto(kClass)

}