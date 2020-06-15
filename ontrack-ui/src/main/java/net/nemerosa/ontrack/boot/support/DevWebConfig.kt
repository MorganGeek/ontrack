package net.nemerosa.ontrack.boot.support

import net.nemerosa.ontrack.common.RunProfile
import org.apache.commons.logging.LogFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer
import java.io.File

@Configuration
@Profile(RunProfile.DEV)
class DevWebConfig : WebMvcConfigurer {
    private val log = LogFactory.getLog(DevWebConfig::class.java)

    @Autowired
    private lateinit var devSettings: DevSettings

    /**
     * At development time, we want the static resources served directly
     * from the `ontrack-web` project, under the `build/web/dev` and `build/web/prod`
     * directories.
     */
    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {

        // Warning
        log.warn("[dev] Running in DEV mode")

        // Next Gen UI
        val ng = getNgPath()
        log.info("[dev] Compiled ng web resources from: $ng")
        registry.addResourceHandler("/ng/**").addResourceLocations("$ng/")

        // Compiled production resources
        val prod = getPath(devSettings.prod)
        log.info("[dev] Compiled prod web resources from: $prod")
        registry.addResourceHandler("/fonts/**").addResourceLocations("$prod/fonts/")

        // Compiler dev resources
        val dev = getPath(devSettings.dev)
        log.info("[dev] Compiled dev web resources from: $dev")
        registry.addResourceHandler("/css/**").addResourceLocations("$dev/css/")
        registry.addResourceHandler("/templates/**").addResourceLocations("$dev/templates/")
        registry.addResourceHandler("/converted/**").addResourceLocations("$dev/converted/")
        registry.addResourceHandler("index.html").addResourceLocations("$dev/")
        registry.addResourceHandler("graphiql.html").addResourceLocations("$dev/")

        // Direct access to the sources
        val source = getPath(devSettings.src)
        log.info("[dev] Web sources from: $source")
        registry.addResourceHandler("/app/**").addResourceLocations("$source/app/")
        registry.addResourceHandler("/graphiql/**").addResourceLocations("$source/graphiql/")
        registry.addResourceHandler("/assets/**").addResourceLocations("$source/assets/")

        // Vendor resources
        val vendor = getPath(devSettings.vendor)
        log.info("[dev] Vendor sources from: $vendor")
        registry.addResourceHandler("/vendor/**").addResourceLocations("$vendor/")
    }

    private fun getNgPath(): String =
            "file:" + File(devSettings.ngWeb, "dist/ontrack-ui-web").absolutePath

    private fun getPath(dirName: String): String {
        return "file:" + File(
                devSettings.web,
                dirName
        ).absolutePath
    }

}