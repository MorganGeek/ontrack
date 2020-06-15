package net.nemerosa.ontrack.boot.ui.settings

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "ontrack.config.ui")
class UISettingsProperties {

    /**
     * UI mode
     */
    var mode: UIMode = UIMode.LEGACY_FIRST

}