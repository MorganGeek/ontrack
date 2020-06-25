package net.nemerosa.ontrack.model.settings

interface CachedSettingsService {

    /**
     * Are the settings available for being used?
     */
    val isAvailable: Boolean

    fun <T> getCachedSettings(type: Class<T>): T

    fun <T> invalidate(type: Class<T>)

}