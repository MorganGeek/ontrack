package net.nemerosa.ontrack.boot.ui.settings

import net.nemerosa.ontrack.model.form.Form
import net.nemerosa.ontrack.model.form.Selection
import net.nemerosa.ontrack.model.security.SecurityService
import net.nemerosa.ontrack.model.settings.AbstractSettingsManager
import net.nemerosa.ontrack.model.settings.CachedSettingsService
import net.nemerosa.ontrack.model.structure.Description
import net.nemerosa.ontrack.model.support.SettingsRepository
import net.nemerosa.ontrack.model.support.setEnum
import org.springframework.stereotype.Component

@Component
class UISettingsManager(
        cachedSettingsService: CachedSettingsService,
        securityService: SecurityService,
        private val settingsRepository: SettingsRepository
) : AbstractSettingsManager<UISettings>(
        UISettings::class.java,
        cachedSettingsService,
        securityService
) {

    override fun getSettingsForm(settings: UISettings): Form =
            Form.create()
                    .with(
                            Selection.of(UISettings::mode.name)
                                    .label("Mode")
                                    .help("Changes are visible only upon next login.")
                                    .items(
                                            UIMode
                                                    .values()
                                                    .map { mode -> Description(mode.name, mode.name, mode.name) }
                                    )
                                    .value(settings.mode.name)
                    )

    override fun doSaveSettings(settings: UISettings) {
        settingsRepository.setEnum<UISettings, UIMode>(settings::mode)
    }

    override fun getId(): String = "ui-settings"

    override fun getTitle(): String = "UI Settings"
}