package net.nemerosa.ontrack.boot.ui.settings

import net.nemerosa.ontrack.model.settings.SettingsProvider
import net.nemerosa.ontrack.model.support.SettingsRepository
import net.nemerosa.ontrack.model.support.getEnum
import org.springframework.stereotype.Component

@Component
class UISettingsProvider(
        private val settingsRepository: SettingsRepository,
        private val uiSettingsProperties: UISettingsProperties
) : SettingsProvider<UISettings> {

    override fun getSettingsClass(): Class<UISettings> = UISettings::class.java

    override fun getSettings(): UISettings = UISettings(
            mode = settingsRepository.getEnum(UISettings::mode, uiSettingsProperties.mode)
    )
}