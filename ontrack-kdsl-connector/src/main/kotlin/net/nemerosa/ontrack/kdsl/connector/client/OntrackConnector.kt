package net.nemerosa.ontrack.kdsl.connector.client

import com.fasterxml.jackson.databind.JsonNode

interface OntrackConnector {

    /**
     * Base URL to Ontrack
     */
    val url: String

    fun download(path: String): ByteArray

    fun get(path: String): JsonNode?

    fun get(path: String, query: Map<String, Any>): JsonNode?

    fun post(path: String, payload: Any?): JsonNode?

    fun put(path: String, payload: Any)

    fun delete(path: String)

    fun graphQL(query: String, variables: Map<String, Any?>): GraphQLResponse

}