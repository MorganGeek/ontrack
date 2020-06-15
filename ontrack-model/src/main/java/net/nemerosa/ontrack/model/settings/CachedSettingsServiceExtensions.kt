package net.nemerosa.ontrack.model.settings

/**
 * Reified version of [CachedSettingsService.getCachedSettings].
 */
inline fun <reified T : Any> CachedSettingsService.getCachedSettings(): T =
        getCachedSettings(T::class.java)
