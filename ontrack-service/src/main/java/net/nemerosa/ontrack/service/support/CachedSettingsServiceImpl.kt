package net.nemerosa.ontrack.service.support

import net.nemerosa.ontrack.common.Caches
import net.nemerosa.ontrack.model.settings.CachedSettingsService
import net.nemerosa.ontrack.model.settings.SettingsProvider
import net.nemerosa.ontrack.model.support.StartupService
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationInitializer
import org.springframework.cache.annotation.CacheEvict
import org.springframework.cache.annotation.Cacheable
import org.springframework.stereotype.Service
import java.util.concurrent.ConcurrentHashMap

@Service
class CachedSettingsServiceImpl(
        settingsProviders: Collection<SettingsProvider<*>>
) : CachedSettingsService, StartupService {

    private val settingsProviders: Map<Class<*>, SettingsProvider<*>> = settingsProviders.associateBy { it.settingsClass }

    private val settingsCache = ConcurrentHashMap<Class<*>, Any>()

    private var initialized = false

    override fun getName(): String = "Cached Settings"

    override fun startupOrder(): Int = StartupService.SYSTEM_REGISTRATION

    /**
     * Makes sure that the database has been initialized before we can use the settings.
     */
    override fun start() {
        initialized = true
    }

    override val isAvailable: Boolean = initialized

    @Cacheable(value = [Caches.SETTINGS], key = "#type")
    override fun <T> getCachedSettings(type: Class<T>): T {
        val value = settingsCache.getOrPut(type) {
            @Suppress("UNCHECKED_CAST") val settingsProvider = settingsProviders[type] as SettingsProvider<T>
            settingsProvider.settings
        }
        @Suppress("UNCHECKED_CAST")
        return value as T
    }

    @CacheEvict(value = [Caches.SETTINGS], key = "#type")
    override fun <T> invalidate(type: Class<T>) {
        settingsCache.remove(type)
    }

}