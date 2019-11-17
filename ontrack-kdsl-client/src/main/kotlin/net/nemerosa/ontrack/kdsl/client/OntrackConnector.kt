package net.nemerosa.ontrack.kdsl.client

import com.fasterxml.jackson.databind.JsonNode

interface OntrackConnector {

    fun download(path: String): ByteArray

    fun get(path: String): JsonNode?

    fun post(path: String, payload: Any?): JsonNode?

    fun put(path: String, payload: Any)

    fun delete(path: String)

    fun graphQL(query: String, variables: Map<String, Any?>): GraphQLResponse

    /**
     * Creates an anonymous connection
     */
    fun asAnonymous(): OntrackConnector

}