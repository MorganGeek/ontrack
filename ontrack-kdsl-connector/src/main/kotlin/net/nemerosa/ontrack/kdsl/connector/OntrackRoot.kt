package net.nemerosa.ontrack.kdsl.connector

import net.nemerosa.ontrack.kdsl.connector.client.OntrackConnector

/**
 * Root object of the Ontrack model. Typically extended by the model and
 * extensions for the Kotlin DSL.
 */
abstract class OntrackRoot(ontrackConnector: OntrackConnector) : Connector(ontrackConnector)
