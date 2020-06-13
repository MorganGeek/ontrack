package net.nemerosa.ontrack.boot.support

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component
import java.io.File

@Component
@ConfigurationProperties(prefix = "ontrack.dev")
class DevSettings {
    var web = File(System.getProperty("user.dir"), "ontrack-web")
    var dev = "build/web/dev"
    var prod = "build/web/prod"
    var src = "src"
    var vendor = "vendor"
    var ngWeb = File(System.getProperty("user.dir"), "ontrack-ui-web")
}