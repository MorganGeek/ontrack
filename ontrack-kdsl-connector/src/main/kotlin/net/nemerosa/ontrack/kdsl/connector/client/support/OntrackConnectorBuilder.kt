package net.nemerosa.ontrack.kdsl.connector.client.support

import net.nemerosa.ontrack.kdsl.connector.client.OntrackConnector
import net.nemerosa.ontrack.kdsl.connector.client.OntrackConnectorProperties
import net.nemerosa.ontrack.kdsl.connector.client.impl.HttpOntrackConnector

object OntrackConnectorBuilder {

    const val ONTRACK_CONNECTOR_URL = "ontrack.connector.url"
    const val ONTRACK_CONNECTOR_USERNAME = "ontrack.connector.username"
    const val ONTRACK_CONNECTOR_PASSWORD = "ontrack.connector.password"

    const val DEFAULT_ONTRACK_CONNECTOR_URL = "http://localhost:8080"
    const val DEFAULT_ONTRACK_CONNECTOR_USERNAME = "admin"
    const val DEFAULT_ONTRACK_CONNECTOR_PASSWORD = "admin"

    var ontrackConnector: OntrackConnector? = null

    fun getOrCreateFromEnv(ontrackConnectorProperties: OntrackConnectorProperties?): OntrackConnector =
            ontrackConnector ?: createFromEnv(ontrackConnectorProperties).apply { ontrackConnector = this }

    private fun createFromEnv(ontrackConnectorProperties: OntrackConnectorProperties?): OntrackConnector {
        val actualProperties: OntrackConnectorProperties = ontrackConnectorProperties ?: getOrCreatePropertiesFromEnv()
        return HttpOntrackConnector(
                url = actualProperties.uri,
                username = actualProperties.username,
                password = actualProperties.password
        )
    }

    private fun getOrCreatePropertiesFromEnv() = SystemOntrackConnectorProperties()

    private class SystemOntrackConnectorProperties : OntrackConnectorProperties {
        override val uri: String
            get() = getPropertyOrEnv(ONTRACK_CONNECTOR_URL, DEFAULT_ONTRACK_CONNECTOR_URL)
        override val username: String
            get() = getPropertyOrEnv(ONTRACK_CONNECTOR_USERNAME, DEFAULT_ONTRACK_CONNECTOR_USERNAME)
        override val password: String
            get() = getPropertyOrEnv(ONTRACK_CONNECTOR_PASSWORD, DEFAULT_ONTRACK_CONNECTOR_PASSWORD)

        private fun getPropertyOrEnv(key: String, defaultValue: String) =
                getProperty(key) ?: getEnv(key) ?: defaultValue

        private fun getEnv(key: String): String? = System.getenv(key.toUpperCase().replace(".", "_"))

        private fun getProperty(key: String): String? = System.getProperty(key, null)

    }


}