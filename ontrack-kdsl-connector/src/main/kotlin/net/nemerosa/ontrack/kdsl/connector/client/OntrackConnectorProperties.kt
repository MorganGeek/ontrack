package net.nemerosa.ontrack.kdsl.connector.client

/**
 * Defines the connection properties to Ontrack.
 */
interface OntrackConnectorProperties {
    /**
     * URI to connect to
     */
    val uri: String
    /**
     * User name used for authentication
     */
    val username: String
    /**
     * Password used for authentication
     */
    val password: String
}
