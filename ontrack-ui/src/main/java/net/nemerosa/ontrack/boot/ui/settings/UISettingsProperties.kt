package net.nemerosa.ontrack.boot.ui.settings

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties(prefix = "ontrack.config.ui")
class UISettingsProperties {

    /**
     * UI mode
     */
    var mode: UIMode = DEFAULT_UI_MODE

    companion object {
        /**
         * Default hard coded mode
         */
        val DEFAULT_UI_MODE = UIMode.LEGACY_FIRST
    }

}